import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {View, StyleSheet, Dimensions} from 'react-native';

import {RootState} from '@/store';
import {Skeleton} from '@/components';
import {CtaButton, HomeHeader} from '@/organisms';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TCtaButton} from '@/organisms/home/ctaButton/ctaButton.types';
import {BottomTabsParamList} from '@/store/navigator/mainNavigator.types';

import PadIcon from '@/assets/icons/pad.svg';
import QRIcon from '@/assets/icons/qrcode.svg';
import ProductsIcon from '@/assets/icons/products.svg';
import MoveItemsIcon from '@/assets/icons/moveItems.svg';

const {width} = Dimensions.get('window');

const gap = 16;
const screenPadding = 28;
const availableWidth = width - screenPadding - gap;
const boxSize = availableWidth / 2;

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

const HomeScreen = ({name}: Props) => {
  const navigation = useNavigation<StackNavigationProp<BottomTabsParamList>>();

  const ctaButtons: TCtaButton[] = [
    {
      icon: <QRIcon height={50} width={50} fill="blue" />,
      title: 'Associate RFIDs',
      onPress: () => {},
      disabled: true,
    },
    {
      icon: <ProductsIcon height={50} width={50} fill="blue" />,
      title: 'Store Products',
      onPress: () => {},
      disabled: true,
    },
    {
      icon: <PadIcon height={50} width={50} fill="blue" />,
      title: 'My Orders',
      onPress: () => navigation.navigate('MyOrders'),
      disabled: false,
    },
    {
      icon: <MoveItemsIcon height={50} width={50} fill="blue" />,
      title: 'Move Items',
      onPress: () => {},
      disabled: true,
    },
  ];

  return (
    <Skeleton>
      <HomeHeader name={name || 'user'} />
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          {ctaButtons.map((cta: TCtaButton, index: number) => (
            <CtaButton key={index} {...cta} boxSize={boxSize} />
          ))}
        </View>
      </View>
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  gridContainer: {
    gap,
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state: RootState) => ({
  name: state.app.name,
});

const connector = connect(mapStateToProps);
const HomeScreenRedux = connector(HomeScreen);

export {HomeScreenRedux as HomeScreen};
