export function getOptionLabel(
  optionList: Array<{ id: number; label: string; value: string }>,
  value: string,
): string {
  return optionList.find((option) => option.value === value)?.label || value;
}
