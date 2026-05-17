# Omni Docs

Omni 测试平台在线文档站点，基于 VuePress 2.x 构建。

## 快速开始

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

构建产物输出到 `dist/` 目录。

## 目录结构

```
docs/
├── .vuepress/          # VuePress 配置
│   ├── config.ts       # 主配置
│   ├── styles/         # 自定义样式
│   └── public/         # 静态资源
├── v1.0/               # v1.0 版本文档
│   ├── quickstart/     # 快速上手
│   ├── guide/          # 使用指南
│   ├── plugins/        # 插件
│   └── development/    # 二次开发
└── README.md           # 站点首页
```
