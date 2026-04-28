const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix DevLoadingView issue
config.resolver.unstable_enablePackageExports = false;

module.exports = config;