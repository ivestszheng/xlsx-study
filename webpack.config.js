// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  resolve: {
    // 支持缩写
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 别名
    alias: {
      '@': path.join(__dirname, 'src'), // "@表示src目录，即\src"
    },
  },
};
