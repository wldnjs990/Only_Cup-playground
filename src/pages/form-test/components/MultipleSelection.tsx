import type { EvaluationRootSchema, MultipleSelectionSchema } from '@/types/form_schema_mock';
import { useFormContext, useWatch, type FieldPath } from 'react-hook-form';
import { useMakeTreeListSchema } from '@/hooks/useMakeTreeSchema';
import TreeCheckBox from './TreeCheckBox';

export default function MultipleSelection({
  parentPath,
  idx,
}: {
  selectionRootPath: FieldPath<EvaluationRootSchema>;
  parentPath: FieldPath<EvaluationRootSchema>;
  idx: number;
}) {
  const { getValues, control } = useFormContext<EvaluationRootSchema>();
  // multipleSelection 단일 경로
  const nowPath = `${parentPath}.${idx}` as FieldPath<EvaluationRootSchema>;

  const { title, items, limit } = getValues(nowPath) as MultipleSelectionSchema;
  const now_checked = useWatch({
    control: control,
    name: `${nowPath}.now_checked` as FieldPath<EvaluationRootSchema>,
  }) as number;

  // 아이템 부모 - 자식 트리형태로 변환 훅 사용
  // RHF 경로 저장용 idx도 추가로 붙임 => idx 속성으로 경로 추가하면 됨
  const multipleSelectionTrees = useMakeTreeListSchema(items);

  // TODO : type에 맞는 input을 선택해 렌더링 해주는 재사용 컴포넌트 만들기
  // const typePath = `${nowPath}.type` as FieldPath<EvaluationRootSchema>;
  // const type = getValues(typePath) as string;

  return (
    <article>
      <article className="flex items-center gap-1">
        <h3 className={'h3-style md:h3-md-style text-[16px]'}>{title}</h3>
        {limit && (
          <>
            <span className="text-xs md:text-sm">{limit ? `${now_checked} / ${limit}` : ''}</span>
            <span className="text-xs text-red-600 md:text-sm">*</span>
          </>
        )}
      </article>
      <article className="mt-3 flex flex-col gap-2">
        {/* 체크박스 아이템들 인덱스 하나하나 연결시켜야 해서 itemsPath 연결 + Tree변환 객체에 idx값 저장해둬서 그걸로 연결지으면 됨 */}
        {multipleSelectionTrees.map((multipleSelectionTree) => {
          return (
            <TreeCheckBox
              key={multipleSelectionTree.id}
              multipleSelectionTree={multipleSelectionTree}
              parentPath={nowPath}
            />
          );
        })}
      </article>
    </article>
  );
}
