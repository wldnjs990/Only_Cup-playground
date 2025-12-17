import { type FieldError } from 'react-hook-form';

export default function ErrorMessage({ error }: { error: FieldError | undefined }) {
  return <>{error && <p className="text-sm text-red-400">{error.message}</p>}</>;
}
