import type { FieldPath, FieldValues } from 'react-hook-form';

// 동적 path 경로
export type RHFPathProps<TFieldValues extends FieldValues> = {
  path: FieldPath<TFieldValues>;
};

// RadioInput 추가 경로 포함
export type RHFRadioPathProps<TFieldValues extends FieldValues> = {
  path: FieldPath<TFieldValues>;
  valuePath: FieldPath<TFieldValues>;
};
