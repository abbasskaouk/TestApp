import './ReactotronConfig';
import {AppRegistry, Text, TextInput} from 'react-native';
import AppRedux from './App';
import {name as appName} from './app.json';

// Disabling Font Scaling in React Native:
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => AppRedux);
