// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];
config.resolver.extraNodeModules = {
  'react-native-gesture-handler': __dirname + '/node_modules/react-native-gesture-handler',
};

module.exports = config;
