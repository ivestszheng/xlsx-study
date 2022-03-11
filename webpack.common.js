// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');


module.exports = {
    resolve: {
        // 支持缩写
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 别名
        alias: {
            '@': path.join(__dirname, 'src'), // "@表示src目录，即\src"
            '@source': path.join(__dirname, 'src', 'source'), // 静态资源
            '@com': path.join(__dirname, 'src', 'components'), // 组件目录
            'react-dom': '@hot-loader/react-dom',
        }
    }
}