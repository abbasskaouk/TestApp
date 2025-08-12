import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '@/assets/themes/colors';
import {TScannerHeader} from './header.types';

import BellIcon from '@/assets/icons/bell.svg';
import BackIcon from '@/assets/icons/backIcon.svg';

const ScannerHeader = ({onPressBack, title}: TScannerHeader) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPressBack}
        style={styles.backContainer}
      >
        <BackIcon fill={colors.blue} height={20} width={20} />
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <BellIcon fill={colors.blue} height={20} width={20} />
      </TouchableOpacity>
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
  titleText: {fontSize: 18, fontWeight: '500'},
});

export {ScannerHeader};
