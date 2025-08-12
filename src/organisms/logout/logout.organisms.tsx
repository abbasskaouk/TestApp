import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {appActions} from '@/store/slices/app/app.slice';

const LogoutButton = (props: TouchableOpacityProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      {...props}
      onPress={() => {
        dispatch(appActions.reset());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      }}
    />
  );
};

export {LogoutButton};
