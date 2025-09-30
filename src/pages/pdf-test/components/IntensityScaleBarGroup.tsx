import IntensityScaleBar from './IntensityScaleBar';
import TopGroupFrame from './TopGroupFrame';

export default function IntensityScaleBarGroup({
  single_selections,
}: {
  single_selections: SingleSelection[];
}) {
  return (
    <TopGroupFrame>
      {single_selections.map((single_selection) => {
        const { label, range, selected } = single_selection;
        return <IntensityScaleBar key={label} label={label} range={range} selected={selected} />;
      })}
    </TopGroupFrame>
  );
}
