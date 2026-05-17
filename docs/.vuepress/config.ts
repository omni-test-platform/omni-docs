import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  base: '/',
  locales: {
    '/': {
      title: 'Omni 测试平台',
      description: '一站式测试平台在线文档',
    },
    '/v1.0/': {
      title: 'Omni 测试平台',
      description: 'v1.0 文档',
    },
  },
  theme: defaultTheme({
    logo: null,
    locales: {
      '/': {
        navbar: [],
        sidebar: {},
      },
      '/v1.0/': {
        navbar: [],
        sidebar: {},
      },
    },
  }),
  plugins: [
    searchPlugin({}),
    shikiPlugin({
      theme: 'one-dark-pro',
    }),
  ],
})
