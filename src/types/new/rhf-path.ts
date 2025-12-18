import type { FieldPath, FieldValues } from 'react-hook-form';
import type {
  RadioInputConfig,
  SelectInputConfig,
  SliderInputConfig,
} from './server_config_schema';

// RHF input용 props
export type RHFPathProps<TFieldValues extends FieldValues> = {
  path: FieldPath<TFieldValues>;
  config: RadioInputConfig | SelectInputConfig | SliderInputConfig;
  className?: string;
};

// value와 label을 별도로 저장하는 Select용 props
export type RHFSelectPathProps<TFieldValues extends FieldValues> = {
  valuePath: FieldPath<TFieldValues>;
  labelPath: FieldPath<TFieldValues>;
  config: SelectInputConfig;
  className?: string;
};

// value와 label을 별도로 저장하는 Radio용 props
export type RHFRadioPathProps<TFieldValues extends FieldValues> = {
  valuePath: FieldPath<TFieldValues>;
  labelPath: FieldPath<TFieldValues>;
  config: RadioInputConfig;
  className?: string;
};
