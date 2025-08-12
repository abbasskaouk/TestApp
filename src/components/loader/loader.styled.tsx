import React from 'react';
import {View, Dimensions, ActivityIndicator, StyleSheet} from 'react-native';

import {colors} from '@/assets/themes/colors';

export const {width, height} = Dimensions.get('window');

const CircularLoader = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator size="large" color={colors.crimsonRed} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width,
    height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semiTransparentWhite,
  },
});

export {CircularLoader};
