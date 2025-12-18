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
