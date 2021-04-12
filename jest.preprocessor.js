const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};

// in order to have a single babel config shared between all packages
module.exports = require('babel-jest').createTransformer(babelOptions);
