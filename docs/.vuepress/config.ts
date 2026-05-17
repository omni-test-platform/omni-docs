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
      title: 'Omni 测试平台 - v1.0',
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
          { text: '快速上手', link: '/v1.0/quickstart/' },
          { text: '使用指南', link: '/v1.0/guide/' },
          { text: '插件', link: '/v1.0/plugins/' },
          { text: '二次开发', link: '/v1.0/development/' },
          {
            text: 'v1.0',
            children: [
              { text: 'v1.0 (当前)', link: '/v1.0/' },
            ],
          },
        ],
        sidebar: {
          '/v1.0/quickstart/': [
            {
              text: '快速上手',
              collapsible: false,
              children: [
                '/v1.0/quickstart/README.md',
                '/v1.0/quickstart/create-test.md',
                '/v1.0/quickstart/configuration.md',
              ],
            },
          ],
          '/v1.0/guide/': [
            {
              text: '使用指南',
              collapsible: false,
              children: [
                '/v1.0/guide/README.md',
                '/v1.0/guide/test-case.md',
                '/v1.0/guide/test-suite.md',
                '/v1.0/guide/test-execution.md',
                '/v1.0/guide/report.md',
              ],
            },
          ],
          '/v1.0/plugins/': [
            {
              text: '插件',
              collapsible: false,
              children: [
                '/v1.0/plugins/README.md',
                '/v1.0/plugins/official.md',
                '/v1.0/plugins/custom.md',
              ],
            },
          ],
          '/v1.0/development/': [
            {
              text: '二次开发',
              collapsible: false,
              children: [
                '/v1.0/development/README.md',
                '/v1.0/development/architecture.md',
                '/v1.0/development/api.md',
                '/v1.0/development/contribution.md',
              ],
            },
          ],
        },
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
