/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 修改项目名称
    config.plugin('html').tap((args) => {
      args[0].title = 'vue2初始模板'; // 项目名称
      return args;
    });
    // 配置别名后需要重启项目
    config.resolve.alias.set('@', path.resolve('src'));
  },
});
