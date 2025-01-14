module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@app': './src'
        }
      }
    ],
    // ["transform-remove-console", { "exclude": [ "error", "warn", "log"] }],
    ["transform-remove-console", { "exclude": [ "error", "warn"] }],
    'jest-hoist'
  ],
};
