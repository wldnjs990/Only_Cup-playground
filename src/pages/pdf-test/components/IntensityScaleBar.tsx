import { Text, View } from '@react-pdf/renderer';

const IntensityScaleBar = ({
  label,
  range,
  selected,
}: Pick<SingleSelection, 'label' | 'range' | 'selected'>) => {
  const rangeArr = new Array(range).fill(0).map((_, idx) => idx + 1);
  // 낮음, 보통, 높음 이것도 DB로 만들어야겠네 하드코딩 해야하는구나
  const SCALE_BAR_TEXT = ['낮음', '보통', '높음'];

  return (
    <>
      {/* 1, 2, 3 평가하는 그거 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* 프레그런스, 아로마 같은애들 텍스트 박스 */}
        <View>
          <View style={{ flexDirection: 'column', gap: 2, minWidth: 80 }}>
            <Text style={{ fontSize: 8, fontWeight: 700, lineHeight: 1 }}>{label}</Text>
            <Text style={{ fontSize: 5 }}>강도</Text>
          </View>
        </View>
        {/* 1, 2, 3단계 바 */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          {rangeArr.map((now, idx) => (
            <View key={now} style={{ width: '33%', flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{ fontSize: 4, color: 'black' }}>{SCALE_BAR_TEXT[idx]}</Text>
              <View
                style={{
                  width: '100%',
                  height: 4,
                  backgroundColor: selected === now ? 'center' : '#D9D9D9',
                }}
              ></View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};
export default IntensityScaleBar;
