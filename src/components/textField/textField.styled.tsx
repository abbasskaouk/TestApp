import {
  View,
  Text,
  Animated,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';

import {colors} from '@/assets/themes/colors';
import {TStyleSheet, TTextField} from './textField.type';

import ShowPassword from '@/assets/icons/show-password.svg';
import HidePassword from '@/assets/icons/hide-password.svg';

const TextField = ({
  label,
  disabled,
  hasError,
  isPassword,
  keyboardType = 'default',
  onFocusChange,
  textDescription,
  ...props
}: TTextField) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const textInputRef = useRef<TextInput>(null);
  const labelPosition = useRef(new Animated.Value(0)).current;
  const innerContainerPosition = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(innerContainerPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (props?.onFocus) {
      props?.onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!props?.value) {
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(innerContainerPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    if (props?.onBlur) {
      props?.onBlur();
    }
  };

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [props?.value ? 6 : 16, 6],
    }),
    left: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 12],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [props?.value ? 11 : 15, 11],
    }),
  };

  const innerContainerStyle = {
    top: innerContainerPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [props?.value ? 8 : 0, 8],
    }),
  };

  return (
    <View style={styles({}).mainContainer}>
      <View style={styles({}).textFieldAndRightIconContainer}>
        <TouchableOpacity
          activeOpacity={1}
          disabled={disabled}
          onPress={() => textInputRef.current?.focus()}
          style={
            styles({
              hasError,
              isFocused,
            }).textFieldContainer
          }
        >
          <Animated.Text style={[styles({}).label, labelStyle]}>
            {label}
          </Animated.Text>
          <Animated.View
            style={[styles({}).innerContainer, innerContainerStyle]}
          >
            <View style={styles({}).inputContainer}>
              <TextInput
                ref={textInputRef}
                onBlur={handleBlur}
                editable={!disabled}
                value={props?.value}
                onFocus={() => {
                  handleFocus();
                  if (onFocusChange) {
                    onFocusChange();
                  }
                }}
                keyboardType={keyboardType}
                secureTextEntry={isPassword && isPasswordHidden}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={props?.onChangeText}
                style={[styles({hasError}).textInput]}
              />
            </View>
            {isPassword && (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles({}).iconContainer}
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? <HidePassword /> : <ShowPassword />}
              </TouchableOpacity>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
      {textDescription && (
        <View style={styles({}).descriptionContainer}>
          {textDescription && (
            <Text style={styles({hasError}).descriptionText}>
              {textDescription}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = ({hasError, isFocused}: TStyleSheet) =>
  StyleSheet.create({
    mainContainer: {
      width: '100%',
      gap: 4,
    },
    textFieldContainer: {
      height: 52,
      borderRadius: 8,
      paddingHorizontal: 12,
      justifyContent: 'center',
      flexGrow: 1,
      borderWidth: 1,
      borderColor: hasError
        ? colors.crimsonRed
        : isFocused
          ? colors.slateGrey
          : 'transparent',
      backgroundColor: colors.white,
      shadowRadius: 8,
      shadowOpacity: 0.025,
      shadowOffset: {width: 0, height: 0},
      elevation: 1,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      position: 'relative',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    textInput: {
      fontSize: 15,
      color: hasError ? colors.crimsonRed : colors.charcoalGrey,
      fontWeight: '400',
      textAlign: 'left',
    },
    label: {
      position: 'absolute',
      color: colors.lightGrey,
      fontWeight: '400',
    },
    textFieldAndRightIconContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
    },
    descriptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    descriptionText: {
      fontSize: 12.5,
      color: hasError ? colors.crimsonRed : colors.lightGrey,
      fontWeight: '400',
    },
  });

export {TextField};
