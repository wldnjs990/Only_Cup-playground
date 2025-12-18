import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCuppingById, updateCupping, type SavedCuppingData } from '@/utils/localStorage';
import CuppingWordCloud from './components/CuppingWordCloud';
import CuppingSpiderChart from './components/CuppingSpiderChart';
import AffectiveNoteEditor from './components/AffectiveNoteEditor';
import { ButtonCn } from '@/components/ui/button_cn';
import type { CategoryDetailValue } from '@/types/new/form_values_schema';

export default function CuppingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cuppingData, setCuppingData] = useState<SavedCuppingData | null>(null);
  const [currentCuppingIndex] = useState(0); // 페이지네이션 추가 전에는 0번째만 표시

  useEffect(() => {
    if (!id) {
      alert('잘못된 접근입니다.');
      navigate('/new');
      return;
    }

    const data = getCuppingById(id);
    if (!data) {
      alert('커핑 데이터를 찾을 수 없습니다.');
      navigate('/new');
      return;
    }

    setCuppingData(data);
  }, [id, navigate]);

  if (!cuppingData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  const currentCupping = cuppingData.cuppings[currentCuppingIndex];

  if (!currentCupping) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">커핑 데이터가 없습니다.</p>
      </div>
    );
  }

  // 모든 evaluation의 details를 합쳐서 WordCloud에 전달
  const allDetails = currentCupping.evaluations.flatMap((evaluation) => evaluation.details);

  const handleNoteSave = (categoryName: string, updatedDetails: CategoryDetailValue[]) => {
    if (!id || !cuppingData) return;

    // 업데이트된 details를 해당 evaluation에 반영
    const updatedCuppings = cuppingData.cuppings.map((cupping, idx) => {
      if (idx !== currentCuppingIndex) return cupping;

      return {
        ...cupping,
        evaluations: cupping.evaluations.map((evaluation) => {
          if (evaluation.categoryName !== categoryName) return evaluation;

          return {
            ...evaluation,
            details: updatedDetails,
          };
        }),
      };
    });

    const updated = updateCupping(id, { cuppings: updatedCuppings });
    if (updated) {
      setCuppingData(updated);
      alert('저장되었습니다!');
    } else {
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">커핑 평가 상세</h1>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(cuppingData.createdAt).toLocaleString('ko-KR')}
            </p>
          </div>
          <ButtonCn onClick={() => navigate('/')} variant="outline">
            목록으로
          </ButtonCn>
        </div>

        {/* 커피 정보 */}
        <div className="mb-6 rounded-lg border bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold">커피 정보</h2>
          <p className="text-gray-700">
            <span className="font-medium">커피:</span>{' '}
            {currentCupping.coffeeLabel || currentCupping.coffeeId}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">평가 목적:</span>{' '}
            {cuppingData.purposeLabel || cuppingData.purposeValue}
          </p>
        </div>

        {/* 차트 영역 */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 스파이더 차트 */}
          <CuppingSpiderChart cupping={currentCupping} />

          {/* 워드 클라우드 */}
          <div className="rounded-lg border bg-white p-4">
            <h3 className="mb-4 text-center text-lg font-semibold">커핑 워드클라우드</h3>
            <CuppingWordCloud details={allDetails} />
          </div>
        </div>

        {/* 카테고리별 상세 평가 */}
        <div className="space-y-6 pb-6">
          {currentCupping.evaluations.map((evaluation) => (
            <AffectiveNoteEditor
              key={evaluation.categoryName}
              details={evaluation.details}
              onSave={(updatedDetails) => handleNoteSave(evaluation.categoryName, updatedDetails)}
            />
          ))}
        </div>

        {/* TODO: 페이지네이션 추가 */}
        {cuppingData.cuppings.length > 1 && (
          <div className="mt-6 rounded-lg border bg-white p-4 text-center text-gray-500">
            페이지네이션 추가 예정 (현재 {currentCuppingIndex + 1}/{cuppingData.cuppings.length})
          </div>
        )}
      </div>
    </div>
  );
}
