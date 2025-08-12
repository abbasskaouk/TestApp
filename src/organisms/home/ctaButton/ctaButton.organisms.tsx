import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {TCtaButton} from './ctaButton.types';
import {colors} from '@/assets/themes/colors';

const CtaButton = ({icon, title, boxSize, onPress, disabled}: TCtaButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disabled}
      style={[styles.ctaButton, {width: boxSize, height: boxSize}]}
    >
      <View style={styles.iconCircle}>{icon}</View>
      <Text style={styles.ctaText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ctaButton: {
    gap: 16,
    padding: 20,
    elevation: 8,
    shadowRadius: 6,
    borderRadius: 20,
    shadowOpacity: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {width: 0, height: 0},
  },
  iconCircle: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: colors.lightGray,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.black,
  },
});

export {CtaButton};
