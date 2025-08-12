import {Order} from '@/screens/scanner/ScannerScreen.types';

export type BottomTabsParamList = {
  Home: undefined;
  Logout: undefined;
  Settings: undefined;
  MyOrders: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  ProductScanner: {order: Order};
};
