import type { FieldPath, FieldValues } from "react-hook-form";

// 동적 path 경로
export type RHFPathProps<TFieldValues extends FieldValues> = {
  path: FieldPath<TFieldValues>;
};