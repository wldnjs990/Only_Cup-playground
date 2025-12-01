export default function RequiredIcon({ required = false }: { required: boolean }) {
  return required && <span className="text-red-600">*</span>;
}
