import ContentTitle from '@/pages/new-form-test/components/ContentTitle';
import type { RHFPathProps } from '@/types/new/rhf-path';
import { useFormContext, useWatch, type FieldValues, type PathValue } from 'react-hook-form';
import { SliderCn } from './ui/slider_cn';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import {
  AFFECTIVE_SCORE_EXPLAINS,
  AFFECTIVE_SCORE_STYLES,
} from '@/constants/new/server_config_mock';

export default function SliderInput<TFieldValues extends FieldValues>({
  path,
  config,
}: RHFPathProps<TFieldValues>) {
  const { control, setValue } = useFormContext<TFieldValues>();

  // Config 타입 안전성 확보
  if (config.inputType !== 'slider') {
    throw new Error('SliderInput expects config.inputType to be "slider"');
  }

  const { label, required, min, max, step = 1, tooltip } = config;

  // 현재 값 감시 (기본값: min) - useWatch로 최적화
  const watchedValue = useWatch({ name: path, control });
  const currentValue = (watchedValue as number) ?? min;
  const value = typeof currentValue === 'number' ? currentValue : min;

  const handleValueChange = (value: number) => {
    setValue(path, value as PathValue<TFieldValues, typeof path>);
  };

  // 현재 값에 해당하는 스타일과 설명 가져오기
  const currentStyle = AFFECTIVE_SCORE_STYLES[value as keyof typeof AFFECTIVE_SCORE_STYLES] || {
    color: 'text-gray-600',
    bg: 'bg-gray-100',
  };
  const currentExplain = AFFECTIVE_SCORE_EXPLAINS.find((item) => item.level === value);

  return (
    <section>
      <ContentTitle title={label} required={required} tooltip={tooltip} as="h3" />

      <article className="space-y-2">
        <SliderCn
          max={max}
          min={min}
          step={step}
          value={[value]}
          onValueChange={(nowValue) => handleValueChange(nowValue[0])}
          canChangeTrackColor={true}
          trackColorIndex={value}
        />

        <p
          className={twMerge(
            'text-xs transition duration-300',
            clsx(currentStyle.color, 'rounded px-2 py-1'),
          )}
        >
          {currentExplain?.explain || `점수: ${value}`}
        </p>
      </article>
    </section>
  );
}
