import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {THomeHeader} from './header.types';
import {colors} from '@/assets/themes/colors';

import BellIcon from '@/assets/icons/bell.svg';

const HomeHeader = ({name}: THomeHeader) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeBackText}>Welcome back,</Text>
        <Text style={styles.nameText}> {name || 'User'}!</Text>
      </View>
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
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeBackText: {fontSize: 18, fontWeight: '500'},
  nameText: {fontSize: 18, fontWeight: '800'},
});

export {HomeHeader};
