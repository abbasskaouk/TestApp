import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

import {TOrderCard} from './orderCard.types';
import {colors} from '@/assets/themes/colors';

const OrderCard = ({
  id,
  notes,
  status,
  itemsCount,
  clientName,
  locationEn,
  locationAr,
  recipientName,
  onPress,
}: TOrderCard) => {
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.card}
        disabled={status !== 'Ready for Fulfillment'}
        onPress={onPress}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.orderId}>#{id}</Text>
          <View style={styles.itemsRight}>
            <Text style={styles.itemsCount}>{itemsCount} </Text>
            <Text style={styles.itemsLabel}>Items</Text>
          </View>
        </View>
        <View style={styles.metaBlock}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Client: </Text>
            <Text numberOfLines={1} style={styles.metaValue}>
              {clientName}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Recipient: </Text>
            <Text numberOfLines={1} style={styles.metaValue}>
              {recipientName}
            </Text>
          </View>
          <View style={styles.locationRow}>
            <View style={styles.locationOuterDot}>
              <View style={styles.locationInnerDot} />
            </View>
            <Text numberOfLines={1} style={styles.locationText}>
              {`${locationEn} - ${locationAr}`}
            </Text>
          </View>
        </View>
        <View style={styles.noteRow}>
          {notes && (
            <>
              <View style={styles.noteDot} />
              <Text style={styles.noteText}>{notes}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 14,
  },
  card: {
    padding: 14,
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 8,
    shadowRadius: 6,
    shadowOpacity: 0.15,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
  itemsRight: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  itemsCount: {
    fontSize: 18,
    color: colors.blue,
    fontWeight: '700',
  },
  itemsLabel: {
    color: colors.black,
    fontWeight: '300',
  },
  metaBlock: {
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metaLabel: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '400',
  },
  metaValue: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationOuterDot: {
    height: 6,
    width: 6,
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  locationInnerDot: {
    height: 7,
    width: 7,
    borderWidth: 2,
    borderColor: colors.blue,
    borderRadius: 10,
  },
  locationText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  noteDot: {
    height: 16,
    width: 16,
    backgroundColor: colors.crimsonRed,
    borderRadius: 10,
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    color: colors.black,
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '600',
  },
});

export {OrderCard};
