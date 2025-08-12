import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import {TSkeleton} from './skeleton.type';
import {colors} from '@/assets/themes/colors';

const Skeleton: React.FC<TSkeleton> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.childrenContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  childrenContainer: {
    flex: 1,
    backgroundColor: colors.lightLavenderGray,
  },
});

export {Skeleton};
