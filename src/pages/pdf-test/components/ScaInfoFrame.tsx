import { View } from '@react-pdf/renderer';

export default function ScaInfoFrame({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* 왼쪽 상자 */}
      <View
        style={{
          width: '64.5%',
        }}
      >
        {leftContent}
      </View>
      {/* 오른쪽 상자 */}
      <View
        style={{
          width: '34.5%',
          height: '100%',
          border: '0.5pt solid black',
          borderBottom: 'none',
        }}
      >
        {rightContent}
      </View>
    </View>
  );
}
