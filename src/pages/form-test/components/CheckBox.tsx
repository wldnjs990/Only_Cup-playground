import { CheckboxCn } from '@/components/ui/checkbox_cn';
import type { EvaluationRootSchema } from '@/types/new_naming';
import type { CheckedState } from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { useFormContext, useWatch, type FieldPath } from 'react-hook-form';

export default function CheckBox({
  nowPath,
  label,
  parentId,
  onChange,
}: {
  nowPath: FieldPath<EvaluationRootSchema>;
  label: string;
  parentId: number | null;
  onChange: (
    val: CheckedState,
    checked: boolean,
    targetPath: FieldPath<EvaluationRootSchema>,
  ) => void;
}) {
  const { control } = useFormContext<EvaluationRootSchema>();

  // 체크박스 상태
  const checked = useWatch({ control: control, name: nowPath }) as boolean;

  return (
    <article className="flex items-center gap-2">
      <CheckboxCn
        id={label}
        className={'h-5 w-5'}
        checked={checked}
        onCheckedChange={(val) => onChange(val, checked, nowPath)}
      />
      <label htmlFor={label} className={clsx(parentId ? 'text-sm' : 'text-lg font-medium')}>
        {label}
      </label>
    </article>
  );
}
