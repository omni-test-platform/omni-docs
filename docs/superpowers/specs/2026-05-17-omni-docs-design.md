---
title: Omni Docs 文档站点设计
date: 2026-05-17
status: approved
---

## 1. 概述

为 Omni 测试平台构建在线帮助文档站点，基于 VuePress 2.x（最新稳定版），使用默认主题，提供项目简介、快速上手、使用指南、插件、二次开发等文档内容，并支持多版本切换。

## 2. 技术栈

| 组件 | 选择 | 原因 |
|------|------|------|
| 框架 | VuePress 2.x | 基于 Vue 3 + Vite，社区标准文档方案 |
| 主题 | 默认主题 | 功能满足需求，避免额外依赖 |
| 包管理器 | pnpm | VuePress 官方推荐 |
| 语言 | TypeScript | 类型安全配置 |

## 3. 配色方案

匹配 Omni 平台主色调：

| 用途 | 颜色 |
|------|------|
| 主题色 | `#646cff` |
| 主题色暗色 | `#535bf2` |
| 成功色 | `#52c41a` |
| 警告色 | `#faad14` |
| 错误色 | `#f5222d` |
| 暗色模式背景 | `rgb(18, 18, 18)` |

## 4. 目录结构

```
omni-docs/
├── docs/
│   ├── .vuepress/
│   │   ├── config.ts              # VuePress 主配置
│   │   ├── theme.ts               # 主题配置（导航栏、侧边栏）
│   │   ├── styles/
│   │   │   ├── index.scss         # 全局样式覆盖
│   │   │   └── vars.scss          # CSS 变量（主题色等）
│   │   └── public/
│   │       └── favicon.ico
│   ├── v1.0/
│   │   ├── README.md              # 版本首页（重定向到 quickstart/）
│   │   ├── quickstart/            # 快速上手
│   │   │   ├── README.md          # 安装与启动
│   │   │   ├── create-test.md     # 创建第一个测试
│   │   │   └── configuration.md   # 配置说明
│   │   ├── guide/                 # 使用指南
│   │   │   ├── README.md          # 概述
│   │   │   ├── test-case.md       # 测试用例管理
│   │   │   ├── test-suite.md      # 测试套件
│   │   │   ├── test-execution.md  # 测试执行
│   │   │   └── report.md          # 测试报告
│   │   ├── plugins/               # 插件
│   │   │   ├── README.md          # 插件概述
│   │   │   ├── official.md        # 官方插件
│   │   │   └── custom.md          # 自定义插件开发
│   │   └── development/           # 二次开发
│   │       ├── README.md          # 概述
│   │       ├── architecture.md    # 架构说明
│   │       ├── api.md             # API 文档
│   │       └── contribution.md    # 贡献指南
│   └── README.md                  # 站点首页（Hero + 特性 + 版本选择引导）
├── package.json
├── .gitignore
└── README.md
```

## 5. 版本管理方案

采用**单站点多版本目录**方案：

- 每个大版本在 `docs/` 下独立目录（如 `v1.0/`, `v2.0/`）
- 通过 VuePress 的 `locale` 功能实现版本切换，每个版本视为一个 locale
- 版本切换通过自定义 Navbar 下拉组件实现
- 站点首页展示项目概况，引导用户选择版本进入

## 6. 导航结构

### 顶部导航栏

```
Omni Docs | 快速上手 | 使用指南 | 插件 | 二次开发 | 🔍 | v1.0 ▼ | 🌙
```

### 侧边栏（按版本 + 栏目独立配置）

以 v1.0 为例：
- 快速上手：安装启动 / 创建第一个测试 / 配置说明
- 使用指南：概述 / 测试用例管理 / 测试套件 / 测试执行 / 测试报告
- 插件：概述 / 官方插件 / 自定义插件开发
- 二次开发：概述 / 架构说明 / API 文档 / 贡献指南

## 7. 首页设计

VuePress 默认主题风格：
- Hero 区域：Omni 平台 Logo + 标题 "Omni 测试平台" + 副标题
- CTA 按钮："快速上手"、"使用指南"
- 特性区：3 列卡片（快速开始、插件生态、二次开发）
- 页脚：版权信息

## 8. 功能清单

- [x] 多版本文档切换（下拉选择器）
- [x 全文搜索（VuePress 内置）
- [x] 暗色模式（VuePress 内置）
- [x] 响应式布局（移动端适配）
- [x] 代码高亮（VuePress 内置）
- [x] 自定义主题色匹配 Omni 平台

## 9. 部署

- 构建输出到 `dist/` 目录
- 支持静态站点部署（Nginx / GitHub Pages 等）
- 支持 CI/CD 自动构建
