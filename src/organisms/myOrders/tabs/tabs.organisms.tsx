import React from 'react';
import {ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {TabsProps} from './tabs.types';
import {colors} from '@/assets/themes/colors';
import {TOrderStatus} from '@/common/common.types';

const Tabs = ({tabs, setSelectedTab, selectedTab}: TabsProps) => {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {tabs.map((tab: TOrderStatus, index: number) => (
        <TouchableOpacity
          onPress={() => setSelectedTab(tab)}
          key={index}
          style={[
            styles.tabButton,
            selectedTab === tab && styles.tabButtonSelected,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab && styles.tabTextSelected,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
  },
  contentContainer: {
    columnGap: 12,
    paddingRight: 28,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 30,
  },
  tabButtonSelected: {
    backgroundColor: colors.blue,
  },
  tabText: {
    color: colors.blue,
  },
  tabTextSelected: {
    color: colors.white,
  },
});

export {Tabs};
