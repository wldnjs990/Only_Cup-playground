import { Text, View } from '@react-pdf/renderer';

export default function SelectionItems({
  selectionItems,
}: {
  selectionItems: TreeSelectionParentItem;
}) {
  const styles = {
    text: { fontSize: 6 },
  };
  const { checked, label, childrens } = selectionItems;
  return (
    <>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 5,
              height: 5,
              border: '0.5pt solid black',
              backgroundColor: checked ? 'black' : 'transparent',
            }}
          ></View>
          <Text style={styles.text}>{label}</Text>
        </View>
        {childrens &&
          childrens.map((children, idx) => {
            const { id, checked, label } = children;
            return (
              <View
                key={id}
                style={{
                  flexDirection: 'row',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                {idx === 0 && <Text style={styles.text}>(</Text>}
                <View
                  style={{
                    width: 5,
                    height: 5,
                    border: '0.5pt solid black',
                    backgroundColor: checked ? 'black' : 'transparent',
                  }}
                ></View>
                <Text style={styles.text}>{label}</Text>
                {idx === childrens.length - 1 && <Text style={styles.text}>)</Text>}
              </View>
            );
          })}
      </View>
    </>
  );
}
