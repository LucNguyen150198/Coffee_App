import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '@components';
import { Icons, Colors, SPACING, FontStyle, Layout } from '@constants';
export const CustomQty = ({ qty = 0, onUpdate }) => {
  const [quantity, setQuantity] = React.useState(qty);

  React.useEffect(() => {
    setQuantity(qty);
  }, [qty]);

  const onHandleUpdateQty = (type) => () => {
    if (type === '-' && quantity - 1 > 0) {
      setQuantity(quantity - 1);
    }
    if (type === '+') {
      setQuantity(quantity + 1);
    }
    // onUpdate();
  };

  return (
    <View style={[Layout.rowVCenter, Layout.fill]}>
      <IconButton
        iconName={Icons.minus}
        backgroundColor={Colors.wisp_pink}
        tintColor={Colors.orange}
        onPress={onHandleUpdateQty('-')}
        disabled={quantity - 1 < 1}
      />
      <View style={styles.qtyContainer}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.qty}>
          {quantity}
        </Text>
      </View>
      <IconButton iconName={Icons.add} onPress={onHandleUpdateQty('+')} />
    </View>
  );
};

const styles = StyleSheet.create({
  qtyContainer: {
    width: SPACING * 3,
    ...Layout.center,
    marginHorizontal: SPACING / 2,
  },
  qtyAddContainer: {
    ...Layout.rowVCenter,
    ...Layout.justifyContentBetween,
    paddingHorizontal: SPACING * 2,
  },
  qty: {
    ...FontStyle.h2,
    color: Colors.Text,
  },
});
