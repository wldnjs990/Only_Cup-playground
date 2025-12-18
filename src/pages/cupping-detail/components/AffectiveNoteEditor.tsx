import { useState } from 'react';
import type { CategoryDetailValue } from '@/types/new/form_values_schema';
import { ButtonCn } from '@/components/ui/button_cn';

interface AffectiveNoteEditorProps {
  details: CategoryDetailValue[];
  onSave: (updatedDetails: CategoryDetailValue[]) => void;
}

export default function AffectiveNoteEditor({ details, onSave }: AffectiveNoteEditorProps) {
  const [editingDetails, setEditingDetails] = useState(details);
  const [isEditing, setIsEditing] = useState(false);

  const handleNoteChange = (index: number, note: string) => {
    const updated = [...editingDetails];
    updated[index] = { ...updated[index], affectiveNote: note };
    setEditingDetails(updated);
  };

  const handleSave = () => {
    onSave(editingDetails);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingDetails(details);
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">감정 노트</h3>
        {!isEditing && (
          <ButtonCn onClick={() => setIsEditing(true)} variant="outline" size="sm">
            편집
          </ButtonCn>
        )}
      </div>

      <div className="space-y-4">
        {editingDetails.map((detail, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">{detail.categoryLabel || detail.categoryValue}</span>
              <span className="text-sm text-gray-500">
                (강도: {detail.intensityLabel || detail.intensity} / 점수: {detail.affectiveScore})
              </span>
            </div>
            {isEditing ? (
              <textarea
                value={detail.affectiveNote || ''}
                onChange={(e) => handleNoteChange(index, e.target.value)}
                placeholder="감정 노트를 입력하세요..."
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={2}
              />
            ) : (
              <p className="text-sm text-gray-600">{detail.affectiveNote || '노트 없음'}</p>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-4 flex justify-end gap-2">
          <ButtonCn onClick={handleCancel} variant="outline" size="sm">
            취소
          </ButtonCn>
          <ButtonCn onClick={handleSave} size="sm">
            저장
          </ButtonCn>
        </div>
      )}
    </div>
  );
}
