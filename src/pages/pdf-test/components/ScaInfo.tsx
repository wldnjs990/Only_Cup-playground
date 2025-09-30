import { Text, View } from '@react-pdf/renderer';

export default function ScaInfo({ sca_info }: { sca_info: ScaInfo }) {
  const { name, purpose, created_at, sample_no } = sca_info;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      {/* 왼쪽 상자 */}
      <View
        style={{
          width: '64.5%',
        }}
      >
        <View style={{ flexDirection: 'column', gap: 4 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 10, fontWeight: 700 }}>이름 :</Text>
            <Text style={{ fontSize: 10 }}>{name}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 10, fontWeight: 700 }}>목적 :</Text>
            <Text style={{ fontSize: 10 }}>{purpose}</Text>
          </View>
        </View>
      </View>
      {/* 오른쪽 상자 */}
      <View style={{ width: '34.5%', height: '100%' }}>
        <View style={{ flexDirection: 'column', gap: 4 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 10, fontWeight: 700 }}>날짜 :</Text>
            <Text style={{ fontSize: 10 }}>{created_at}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontSize: 10, fontWeight: 700 }}>샘플 번호 :</Text>
            <Text style={{ fontSize: 10 }}>{sample_no}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
