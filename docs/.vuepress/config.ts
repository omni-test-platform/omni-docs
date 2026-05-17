import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'

const base = (process.env.VUEPRESS_BASE as string) || '/'

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  base,
  locales: {
    '/': {
      title: '测试平台',
      description: '一站式测试平台在线文档',
    },
    '/v1.1.2/': {
      title: '测试平台 - v1.1.2',
      description: 'v1.1.2 文档',
    },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
  ],
  theme: defaultTheme({
    logo: '/omni-logo.svg',
    logoDark: '/omni-logo-dark.svg',
    selectLanguageText: '选择语言',
    locales: {
      '/': {
        navbar: [
          { text: '首页', link: '/' },
          { text: '快速上手', link: '/v1.1.2/quickstart/' },
          { text: '使用指南', link: '/v1.1.2/guide/' },
          { text: '插件', link: '/v1.1.2/plugins/' },
          { text: '二次开发', link: '/v1.1.2/development/' },
          {
            text: 'v1.1.2',
            children: [
              { text: 'v1.1.2 (当前)', link: '/v1.1.2/' },
              { text: 'v1.1.3', link: '/v1.1.2/' },
            ],
          },
        ],
        sidebar: {},
      },
      '/v1.1.2/': {
        navbar: [
          { text: '首页', link: '/' },
          { text: '快速上手', link: '/v1.1.2/quickstart/' },
          { text: '使用指南', link: '/v1.1.2/guide/' },
          { text: '插件', link: '/v1.1.2/plugins/' },
          { text: '二次开发', link: '/v1.1.2/development/' },
          {
            text: 'v1.1.2',
            children: [
              { text: 'v1.1.2 (当前)', link: '/v1.1.2/' },
              { text: 'v1.1.3', link: '/v1.1.2/' },
            ],
          },
        ],
        sidebar: {
          '/v1.1.2/': [
            {
              text: 'v1.1.2',
              collapsible: false,
              children: [
                '/v1.1.2/README.md',
              ],
            },
          ],
          '/v1.1.2/quickstart/': [
            {
              text: '快速上手',
              collapsible: false,
              children: [
                '/v1.1.2/quickstart/README.md',
                '/v1.1.2/quickstart/create-test.md',
                '/v1.1.2/quickstart/configuration.md',
              ],
            },
          ],
          '/v1.1.2/guide/': [
            {
              text: '使用指南',
              collapsible: false,
              children: [
                '/v1.1.2/guide/README.md',
                '/v1.1.2/guide/test-case.md',
                '/v1.1.2/guide/test-suite.md',
                '/v1.1.2/guide/test-execution.md',
                '/v1.1.2/guide/report.md',
              ],
            },
          ],
          '/v1.1.2/plugins/': [
            {
              text: '插件',
              collapsible: false,
              children: [
                '/v1.1.2/plugins/README.md',
                '/v1.1.2/plugins/official.md',
                '/v1.1.2/plugins/custom.md',
              ],
            },
          ],
          '/v1.1.2/development/': [
            {
              text: '二次开发',
              collapsible: false,
              children: [
                '/v1.1.2/development/README.md',
                '/v1.1.2/development/architecture.md',
                '/v1.1.2/development/api.md',
                '/v1.1.2/development/contribution.md',
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
