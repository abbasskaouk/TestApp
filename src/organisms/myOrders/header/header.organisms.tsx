import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '@/assets/themes/colors';
import {TMyOrdersHeader} from './header.types';

import BellIcon from '@/assets/icons/bell.svg';
import BackIcon from '@/assets/icons/backIcon.svg';
import UpDownIcon from '@/assets/icons/upDownArrows.svg';

const MyOrdersHeader = ({onPressBack}: TMyOrdersHeader) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPressBack}
        style={styles.backContainer}
      >
        <BackIcon fill={colors.blue} height={20} width={20} />
        <Text style={styles.myOrders}>My Orders</Text>
      </TouchableOpacity>
      <View style={styles.backContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <UpDownIcon fill={colors.blue} height={20} width={20} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <BellIcon fill={colors.blue} height={20} width={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 14,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  backContainer: {
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  myOrders: {fontSize: 18, fontWeight: '500'},
});

export {MyOrdersHeader};
