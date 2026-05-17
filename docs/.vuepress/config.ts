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
        navbar: [
          { text: '首页', link: '/' },
        ],
        sidebar: {},
      },
      '/v1.0/': {
        navbar: [
          { text: '首页', link: '/' },
        ],
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
