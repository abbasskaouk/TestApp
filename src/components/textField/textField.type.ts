import {TextInputProps} from 'react-native';

export type TTextField = {
  value: string;
  label: string;
  disabled?: boolean;
  hasError?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  isPassword?: boolean;
  textDescription?: string;
  onFocusChange?: () => void;
  onChangeText?: (text: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
  placeholder?: string;
} & Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'onFocus' | 'keyboardType'
>;

export type TStyleSheet = {hasError?: boolean; isFocused?: boolean};
