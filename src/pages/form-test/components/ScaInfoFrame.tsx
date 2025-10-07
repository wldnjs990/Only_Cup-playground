import { useController, useFormContext } from 'react-hook-form';
import TestFrame from './TestFrame';
import type { EvaluationRootSchema } from '@/types/new_naming';
import { InputCn } from '@/components/ui/input_cn';
import SequenceButton from './SequenceButton';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { motion } from 'motion/react';
import logo from '@/assets/images/onlycup_logo_200.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu_cn';
import { useNavigate } from 'react-router';

export default function ScaInfoFrame({
  setSequence,
}: {
  setSequence: React.Dispatch<React.SetStateAction<3 | 1 | 2>>;
}) {
  const navigation = useNavigate();

  const { getValues, control, trigger } = useFormContext<EvaluationRootSchema>();
  const nowPath = 'basic_info';

  const explain = getValues(`${nowPath}.title`);
  const nameLabel = getValues(`${nowPath}.name.label`);
  const purposeLabel = getValues(`${nowPath}.purpose.label`);
  const sampleNoLabel = getValues(`${nowPath}.sample_no.label`);

  const { field: nameField, fieldState: nameState } = useController({
    name: `${nowPath}.name.value`,
    control: control,
    rules: {
      validate: (val) => (val.trim().length > 0 ? true : '이름을 입력해주세요!'),
    },
  });
  const { field: purposeField, fieldState: purposeState } = useController({
    name: `${nowPath}.purpose.value`,
    control: control,
    rules: {
      validate: (val) => (val.trim().length > 0 ? true : '커핑 목적을 입력해주세요!'),
    },
  });
  const { field: sampleNoField, fieldState: sampleNoState } = useController({
    name: `${nowPath}.sample_no.value`,
    control: control,
    rules: {
      validate: (val) => (val.trim().length > 0 ? true : '샘플 번호를 입력해주세요!'),
    },
  });

  const validateAndStartTest = async () => {
    const nameOk = await trigger(`${nowPath}.name.value`);
    const purposeOk = await trigger(`${nowPath}.purpose.value`);
    const sampleNoOk = await trigger(`${nowPath}.sample_no.value`);

    if (nameOk !== true) return alert(`${nameState.error?.message}`);
    if (purposeOk !== true) return alert(`${purposeState.error?.message}`);
    if (sampleNoOk !== true) return alert(`${sampleNoState.error?.message}`);
    setSequence(2);
  };

  const ScaListJson = localStorage.getItem('docList');
  const ScaList: EvaluationRoot[] = ScaListJson ? JSON.parse(ScaListJson) : [];

  return (
    <TestFrame className="relative">
      <motion.section
        key={nowPath}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex h-full min-h-0 w-full max-w-100 flex-1 flex-col justify-between gap-5 overflow-y-auto"
      >
        {/* pdf 드롭다운 */}
        <article className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-15 w-15 rounded-full p-1 shadow-2xl">
              <img src="/onlycup_logo.svg" alt="SCA 평가 확인 버튼" className="object-cover" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="p-2 font-bold">
                SCA 평가 결과는 이곳에서 확인할 수 있습니다.
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="flex min-h-15 flex-col items-center justify-center gap-1">
                {ScaList.map((sca, idx) => (
                  <>
                    <DropdownMenuItem
                      key={`${sca.version}${idx}`}
                      onClick={() => navigation(`/pdf/${idx}`)}
                      className="flex w-full flex-1 justify-center border-b py-2 text-sm"
                    >
                      {sca.sca_info.purpose}
                    </DropdownMenuItem>
                  </>
                ))}
                {!ScaList.length && (
                  <DropdownMenuItem className="text-sm">SCA 평가 기록이 없습니다.</DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </article>

        {/* SCA 섹션 */}
        <section className="flex flex-col gap-3">
          <article className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-black md:text-4xl">SCA 커피 가치 평가</h1>
            <p className="text-[16px] md:text-xl">Prod by. OnlyCup</p>
            <img src={logo} alt="온리컵 로고" />
          </article>
          <p className="text-center text-sm font-medium md:text-lg">{explain}</p>
          <article className="flex items-center gap-2">
            <label htmlFor="nameLabel" className="w-[20%] text-xs md:text-sm">
              {nameLabel}
            </label>
            <InputCn
              id="nameLabel"
              value={nameField.value}
              onChange={(val) => nameField.onChange(val)}
              className={twMerge(
                'flex-1 text-sm md:text-[16px]',
                clsx(nameState.error && 'border-red-600'),
              )}
            />
            {/* {nameState && <p className="text-sm text-red-600">{nameState.error?.message}</p>} */}
          </article>
          <article className="flex items-center gap-2">
            <label htmlFor="purposeLabel" className="w-[20%] text-xs md:text-sm">
              {purposeLabel}
            </label>
            <InputCn
              id="purposeLabel"
              value={purposeField.value}
              onChange={(val) => purposeField.onChange(val)}
              className={twMerge(
                'flex-1 text-sm md:text-[16px]',
                clsx(purposeState.error && 'border-red-600'),
              )}
            />
            {/* {purposeState && <p className="text-sm text-red-600">{purposeState.error?.message}</p>} */}
          </article>
          <article className="flex items-center gap-2">
            <label htmlFor="sampleNoLabel" className="w-[20%] text-xs md:text-sm">
              {sampleNoLabel}
            </label>
            <InputCn
              id="sampleNoLabel"
              value={sampleNoField.value}
              onChange={(val) => sampleNoField.onChange(val)}
              className={twMerge(
                'flex-1 text-sm md:text-[16px]',
                clsx(sampleNoState.error && 'border-red-600'),
              )}
            />
            {/* {sampleNoState && <p className="text-sm text-red-600">{sampleNoState.error?.message}</p>} */}
          </article>
        </section>
        <SequenceButton text="평가 시작" onClick={validateAndStartTest} />
      </motion.section>
    </TestFrame>
  );
}
