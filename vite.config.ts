import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '#': resolve(__dirname, 'types'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // mixin和variable里面是函数和变量等供scss使用的非实体css, scss-loader需要
        additionalData: `
          @import "@/assets/styles/mixin.scss";
          @import "@/assets/styles/variable.scss";
        `,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/svgs')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
})
