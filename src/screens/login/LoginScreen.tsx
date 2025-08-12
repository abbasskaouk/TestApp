import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  Keyboard,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {ConnectedProps, connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {TextField} from '@/components';
import {colors} from '@/assets/themes/colors';
import {TStyleSheet} from './LoginScreen.types';
import {appActions} from '@/store/slices/app/app.slice';
import {RootStackParamList} from '@/store/navigator/mainNavigator.types';

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

const LoginScreen = ({signIn, setIsLoading}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [showError, setIsShowError] = useState<boolean>(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email',
      )
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    validationSchema,
    onSubmit: () => {
      handleLogIn();
    },
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: false,
  });

  const handleOutsidePress = () => {
    Keyboard.dismiss();
  };

  const hasUserTyped = (fieldName: string) => {
    setIsShowError(false);
    return formik.values[fieldName as keyof typeof formik.values] !== '';
  };

  const handleLogIn = async () => {
    try {
      setIsLoading(true);

      // show loader for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));

      const result: any = await signIn({
        email: formik.values.email.toLowerCase(),
        password: formik.values.password,
      });

      if (result?.payload?.success) {
        setIsShowError(false);
        navigation.navigate('MainTabs');
      } else {
        setIsShowError(true);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles({}).container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <SafeAreaView style={styles({}).safeAreaView}>
          <ScrollView
            contentContainerStyle={styles({}).scrollContent}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <Image
              style={styles({}).wakilniImage}
              source={require('@/assets/icons/wakilniLogo.png')}
            />
            <Text style={styles({}).title}>Login in with Email</Text>
            <View style={styles({}).formContainer}>
              <TextField
                label="Enter Email"
                value={formik.values.email}
                onChangeText={text => {
                  formik.handleChange('email')(text);
                  if (!formik.touched.email) {
                    formik.setFieldTouched('email', true);
                  }
                }}
                onBlur={() => {
                  if (hasUserTyped('email')) {
                    formik.setFieldTouched('email', true);
                  }
                }}
                hasError={formik.touched.email && !!formik.errors.email}
                textDescription={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
                keyboardType="email-address"
              />
              <TextField
                label="Enter Password"
                value={formik.values.password}
                onChangeText={text => {
                  formik.handleChange('password')(text);
                  if (!formik.touched.password) {
                    formik.setFieldTouched('password', true);
                  }
                }}
                onBlur={() => {
                  if (hasUserTyped('password')) {
                    formik.setFieldTouched('password', true);
                  }
                }}
                hasError={formik.touched.password && !!formik.errors.password}
                textDescription={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
                isPassword={true}
              />
              {showError && (
                <Text style={styles({}).wrongCredentialsText}>
                  Wrong Credentials !
                </Text>
              )}
              <TouchableOpacity
                activeOpacity={0.5}
                style={
                  styles({
                    disabled: !(formik.isValid && formik.dirty),
                  }).logInButton
                }
                disabled={!(formik.isValid && formik.dirty)}
                onPress={() => formik.handleSubmit()}
              >
                <Text style={styles({}).logInText}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = ({disabled}: TStyleSheet) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    safeAreaView: {
      flex: 1,
      padding: 0,
      alignItems: 'center',
    },
    scrollContent: {
      width: '100%',
      flexGrow: 1,
      padding: 20,
      alignItems: 'center',
    },
    wakilniImage: {
      width: 250,
      height: 250,
      marginTop: 50,
      borderRadius: 32,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      marginTop: 20,
      marginBottom: 30,
      fontWeight: 'bold',
    },
    formContainer: {
      gap: 16,
      width: '100%',
      paddingHorizontal: 20,
    },
    logInButton: {
      padding: 14,
      backgroundColor: disabled ? colors.lightGrey : colors.black,
      alignItems: 'center',
      borderRadius: 8,
    },
    logInText: {
      fontSize: 16,
      color: colors.white,
      fontWeight: '700',
    },
    wrongCredentialsText: {
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
      color: colors.crimsonRed,
    },
  });

const mapDispatchToProps = {
  signIn: appActions.signIn,
  setIsLoading: appActions.setIsLoading,
};

const connector = connect(undefined, mapDispatchToProps);
const LoginScreenRedux = connector(LoginScreen);

export {LoginScreenRedux as LoginScreen};
