import type { ReactNode } from 'react';
import {
  FormProvider,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type RHFContextProps<TFieldValues extends FieldValues = FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<TFieldValues>;
  className?: string;
  onSubmit: SubmitHandler<TFieldValues>;
  // onError는 이미 RHF에서 validation에 걸릴 시 error state를 에러 영역에 뿌려줌
  // 이걸 쓰는 경우는 추가적으로 어디에서 에러가 발생했는지 토스트UI 처리, 에러 로그 정보를 백오피스 서버에 전송 등의 목적으로 사용함
  // 그래서 옵셔널로 사용합니다.
  onError?: SubmitErrorHandler<TFieldValues>;
};

export default function RHFContext<TFieldValues extends FieldValues = FieldValues>({
  children,
  methods,
  className,
  onSubmit,
  onError,
}: RHFContextProps<TFieldValues>) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className={twMerge('w-full', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
