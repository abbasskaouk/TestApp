import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {colors} from '@/assets/themes/colors';

const EmptyState = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.screen, styles.center]}>
      <Text style={styles.errorText}>No order provided.</Text>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.black},
  center: {justifyContent: 'center', alignItems: 'center'},
  errorText: {color: colors.crimsonRed, fontSize: 16, marginBottom: 12},
  backButtonContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.lightGray,
  },
  backText: {color: colors.charcoalGrey, fontWeight: '600'},
});

export {EmptyState};
