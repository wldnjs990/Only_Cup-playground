import InputFrames from '../../../components/InputFrames';
import type { SchemaSingleSelectionItem } from '../../../hooks/useFormResult';

export default function SingleSelectionTest({
  single_selection,
}: {
  single_selection: SchemaSingleSelectionItem;
}) {
  const { id, label, max, min, range, selected, type } = single_selection;
  
  return <InputFrames />;
}
