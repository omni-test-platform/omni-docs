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

构建产物输出到 `docs/.vuepress/dist/` 目录。

## 部署（GitHub Pages）

仓库已配置 GitHub Actions 工作流，推送 `master` 分支后自动构建并部署。

1. 在 GitHub 仓库 **Settings → Pages** 中设置：
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` / `/ (root)`
2. 推送 `master` 分支即可触发自动部署

部署地址：`https://<你的组织>.github.io/omni-docs/`

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
