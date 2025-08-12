import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {colors} from '@/assets/themes/colors';
import {TOrdersItemsNumber} from './ordersItemsNumber.types';

const OrdersItemsNumber = ({totalOrders, totalItems}: TOrdersItemsNumber) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.number}>{totalOrders}</Text>
          <Text style={styles.label}>Total Orders</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.number}>{totalItems}</Text>
          <Text style={styles.label}>Total Items</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
  },
  container: {
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderColor: colors.lighterGray,
  },
  card: {
    gap: 4,
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.paleGray,
    backgroundColor: colors.lightLavenderGray,
  },
  number: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.blue,
  },
  label: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.black,
  },
});

export {OrdersItemsNumber};
