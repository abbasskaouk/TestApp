import React, {useMemo, useState, useCallback} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import {RootState} from '@/store';
import {Skeleton} from '@/components';
import {colors} from '@/assets/themes/colors';
import {TOrderStatus, TOrder, TOrderItems} from '@/common/common.types';
import {orders as allOrders} from '@/constants/mockData';
import {RootStackParamList} from '@/store/navigator/mainNavigator.types';
import {Order} from '@/screens/scanner/ScannerScreen.types';
import {MyOrdersHeader, OrderCard, OrdersItemsNumber, Tabs} from '@/organisms';

type ReduxProps = ConnectedProps<typeof connector>;
type Props = ReduxProps;

const MyOrders = ({id}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<TOrderStatus>(
    'Ready for Fulfillment',
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const tabs: TOrderStatus[] = [
    'Ready for Fulfillment',
    'Fulfilled',
    'Cancelled',
    'In Progress',
  ];

  const myOrders = useMemo(
    () => allOrders.filter(order => order.assignedToUserId === id),
    [id],
  );

  const searchedOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return myOrders;

    return myOrders.filter(
      order =>
        order.id.toLowerCase().includes(query) ||
        order.clientName.toLowerCase().includes(query),
    );
  }, [myOrders, searchQuery]);

  const orders = useMemo(
    () => searchedOrders.filter(order => order.status === selectedTab),
    [searchedOrders, selectedTab],
  );

  const totals = useMemo(() => {
    const totalOrders = orders.length;
    const totalItems = orders.reduce(
      (sum, order) => sum + (order.itemsCount ?? order.items.length ?? 0),
      0,
    );
    return {totalOrders, totalItems};
  }, [orders]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setRefreshing(false);
      // In a real app, you would fetch fresh data here
      // For now, we'll just reset the search query to show all orders
      setSearchQuery('');
    }, 1000);
  }, []);

  const convertTOrderToOrder = useCallback((tOrder: TOrder): Order => {
    return {
      id: tOrder.id,
      title: tOrder.clientName,
      items: tOrder.items.map((item: TOrderItems) => ({
        id: item.id,
        name: item.name,
        size: item.size || undefined,
        color: item.color,
        expectedSerial: item.expectedSerial,
      })),
    };
  }, []);

  return (
    <Skeleton>
      <MyOrdersHeader onPressBack={() => navigation.goBack()} />
      <View style={styles.headerBlock}>
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <OrdersItemsNumber
          totalOrders={totals.totalOrders}
          totalItems={totals.totalItems}
        />
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by order # or client name"
            placeholderTextColor={colors.lightGrey}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.blue]}
            tintColor={colors.blue}
          />
        }
        renderItem={({item}) => (
          <OrderCard
            id={item.id}
            notes={item.notes}
            status={item.status}
            itemsCount={item.itemsCount}
            clientName={item.clientName}
            locationEn={item.locationEn}
            locationAr={item.locationAr}
            recipientName={item.recipientName}
            onPress={() => {
              if (item.status === 'Ready for Fulfillment') {
                navigation.navigate('ProductScanner', {
                  order: convertTOrderToOrder(item),
                });
              }
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  headerBlock: {gap: 14, marginVertical: 14},
  listContent: {paddingBottom: 24},
  separator: {height: 12},
  emptyWrap: {paddingVertical: 40, alignItems: 'center'},
  emptyText: {color: colors.lightGrey},
  searchInput: {
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    color: colors.black,
    marginHorizontal: 14,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
  },
});

const mapStateToProps = (state: RootState) => ({
  id: state.app.id,
});

const connector = connect(mapStateToProps);
export const MyOrdersRedux = connector(MyOrders);
export {MyOrdersRedux as MyOrders};
