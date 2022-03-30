/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 配置别名后需要重启项目
    config.resolve.alias.set('@', path.resolve('src'));
  },
  publicPath: './',
});
