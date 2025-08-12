module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/no-unstable-nested-components': ['warn', {allowAsProps: true}],
    'prettier/prettier': 'error',
  },
};
