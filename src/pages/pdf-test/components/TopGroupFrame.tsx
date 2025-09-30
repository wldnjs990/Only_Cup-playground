import { View } from '@react-pdf/renderer';

export default function TopGroupFrame({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 2 }}>
      <View
        style={{
          flexDirection: 'column',
          gap: 2,
          marginVertical: 2,
          borderBottom: '0.5pt solid gray',
        }}
      >
        {children}
      </View>
    </View>
  );
}
