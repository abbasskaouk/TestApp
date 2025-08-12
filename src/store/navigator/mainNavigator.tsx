import React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  MyOrders,
  HomeScreen,
  LoginScreen,
  LogoutScreen,
  SettingsScreen,
  ProductScanner,
} from '@/screens';
import {RootState} from '@/store';
import {LogoutButton} from '@/organisms';
import {colors} from '@/assets/themes/colors';
import {BottomTabsParamList, RootStackParamList} from './mainNavigator.types';

import AdsIcon from '@/assets/icons/ads.svg';
import HomeIcon from '@/assets/icons/home.svg';
import SettingsIcon from '@/assets/icons/settings.svg';

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

const {Navigator: TabNavigator, Screen: TabScreen} =
  createBottomTabNavigator<BottomTabsParamList>();

type ReduxProps = ConnectedProps<typeof connector>;

const MainNavigator = ({token}: ReduxProps) => {
  const initialScreen = token === '' ? 'Login' : 'MainTabs';

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={initialScreen}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Login" component={LoginScreen} />
        <Screen name="MainTabs" component={BottomTabs} />
        <Screen name="ProductScanner" component={ProductScanner} />
      </Navigator>
    </NavigationContainer>
  );
};

function BottomTabs(): React.JSX.Element {
  return (
    <TabNavigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.lightGrey,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: colors.black,
          shadowOpacity: 0.2,
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 12,
          elevation: 12,
          borderTopWidth: 0,
        },
      }}
    >
      <>
        <TabScreen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <HomeIcon width={24} height={24} fill={color} />
            ),
          }}
        />
        <TabScreen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <SettingsIcon width={24} height={24} fill={color} />
            ),
            tabBarButton: props => (
              <TouchableOpacity {...props} disabled={true} />
            ),
          }}
        />
        <TabScreen
          name="Logout"
          component={LogoutScreen}
          options={{
            tabBarLabel: 'Logout',
            tabBarIcon: ({color}) => (
              <AdsIcon width={24} height={24} fill={color} />
            ),
            tabBarButton: props => <LogoutButton {...props} />,
          }}
        />
        <TabScreen
          name="MyOrders"
          component={MyOrders}
          options={{
            tabBarButton: () => null,
          }}
        />
      </>
    </TabNavigator>
  );
}

const mapStateToProps = (state: RootState) => ({
  token: state.app.token,
});

const connector = connect(mapStateToProps);
const MainNavigatorRedux = connector(MainNavigator);

export {MainNavigatorRedux as MainNavigator};
