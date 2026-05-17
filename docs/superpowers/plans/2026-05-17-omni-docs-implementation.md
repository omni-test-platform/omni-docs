# Omni Docs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a VuePress 2.x documentation site for Omni testing platform with multi-version support

**Architecture:** Single VuePress site with locale-based version directories (`v1.0/`, `v2.0/`). Each version has independent sidebar/navbar config. Version switching via navbar dropdown group (VuePress default theme native support). Theme color matches Omni platform's `#646cff`.

**Tech Stack:** VuePress 2.x (default theme), Vue 3, TypeScript, SCSS, pnpm

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `docs/.vuepress/config.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Initialize package.json and install dependencies**

```bash
cd D:\workspace\omni-platform\omni-docs
pnpm init
pnpm add -D vuepress@latest @vuepress/plugin-search@latest @vuepress/plugin-shiki@latest
```

- [ ] **Step 2: Create docs/.vuepress directory structure**

```bash
mkdir -p docs/.vuepress/styles docs/.vuepress/public
```

- [ ] **Step 3: Write base config.ts**

```ts
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'

export default defineUserConfig({
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
```

- [ ] **Step 4: Fix .gitignore**

Replace the current TYPO3 `.gitignore` with a proper one:

```
# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/

# IDE
.idea/
*.iml

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.local
```

- [ ] **Step 5: Add scripts to package.json**

Edit `package.json` to add:
```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "clean": "vuepress dev docs --clean-cache"
  }
}
```

- [ ] **Step 6: Verify dev server starts**

Run: `pnpm dev`
Expected: Dev server starts at `http://localhost:8080` (may show empty page — expected at this stage)

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml docs/.vuepress/config.ts .gitignore
git commit -m "feat: scaffold VuePress 2.x project"
```

---

### Task 2: Styles Setup (Theme Color Matching Omni Platform)

**Files:**
- Create: `docs/.vuepress/styles/vars.scss`
- Create: `docs/.vuepress/styles/index.scss`

- [ ] **Step 1: Create CSS variables file**

`docs/.vuepress/styles/vars.scss`:
```scss
:root {
  --omni-color-primary: #646cff;
  --omni-color-primary-dark: #535bf2;
  --omni-color-primary-light: #8b92ff;
  --omni-color-success: #52c41a;
  --omni-color-warning: #faad14;
  --omni-color-error: #f5222d;
}
```

- [ ] **Step 2: Create global styles with VuePress theme variable overrides**

`docs/.vuepress/styles/index.scss`:
```scss
@use 'vars';

:root {
  // Override VuePress default theme colors with Omni palette
  --c-brand: #646cff;
  --c-brand-light: #8b92ff;
  --c-brand-dark: #535bf2;

  // Badge colors
  --c-badge-tip: #646cff;
  --c-badge-warning: #faad14;
  --c-badge-danger: #f5222d;

  // Custom omni colors
  --omni-color-primary: #646cff;
  --omni-color-primary-dark: #535bf2;
  --omni-color-primary-light: #8b92ff;
}

// Custom block styling
.custom-block.tip {
  border-color: var(--c-brand);
}

// Version badge
.version-badge {
  display: inline-block;
  padding: 0.1em 0.5em;
  font-size: 0.75em;
  font-weight: 600;
  border-radius: 4px;
  background: var(--c-brand);
  color: #fff;
}
```

- [ ] **Step 3: Verify styles load**

Run: `pnpm dev`
Expected: Dev server starts without style-related errors

- [ ] **Step 4: Commit**

```bash
git add docs/.vuepress/styles/
git commit -m "feat: add Omni platform theme colors"
```

---

### Task 3: Version Switching via Navbar Dropdown

**Files:** None (all config goes into `config.ts`)

VuePress 2 默认主题原生支持 NavbarGroup（下拉菜单），用于版本切换。无需自定义 Vue 组件。

- [ ] **Step 1: Version switching is handled entirely in Task 5's navbar config**

No separate files needed. The version dropdown will be configured directly in `config.ts` using VuePress's built-in navbar dropdown:

```ts
{ 
  text: 'v1.0', 
  children: [
    { text: 'v1.0 (当前)', link: '/v1.0/' },
  ] 
}
```

This approach:
- Works natively with VuePress 2 default theme
- Renders as a dropdown in the navbar (matching VuePress official site style)
- Zero custom code needed
- Easy to add new versions

- [ ] **Step 2: Commit**

```bash
git commit --allow-empty -m "feat: version switching via navbar dropdown"
```

---

### Task 4: Site Homepage

**Files:**
- Create: `docs/README.md`

- [ ] **Step 1: Create homepage with Hero + Features**

`docs/README.md`:
```markdown
---
home: true
title: Omni 测试平台
heroText: Omni 测试平台
tagline: 一站式测试平台在线文档
actions:
  - text: 🚀 快速上手
    link: /v1.0/quickstart/
    type: primary
  - text: 📖 使用指南
    link: /v1.0/guide/
    type: secondary
features:
  - title: ⚡ 快速开始
    details: 从零开始创建你的第一个测试用例，了解平台核心概念和基本操作流程。
  - title: 🔌 插件生态
    details: 官方插件与自定义插件开发指南，扩展平台能力满足各种测试场景。
  - title: 🔧 二次开发
    details: 平台架构说明、API 文档和贡献指南，助力开发者深度集成与定制。
footer: Copyright © 2026 Omni Platform
---
```

Wait, VuePress 2's default theme homepage uses the `home: true` layout but the frontmatter fields differ slightly. Let me use the correct frontmatter:

Actually in VuePress 2 default theme, the homepage uses these frontmatter fields:
- `home: true`
- `heroText` (or `heroText`)
- `tagline`
- `actions[]` 
- `features[]`
- `footer`

But there's `heroImage` and `heroAlt` too. Let me use the standard ones.

Actually, looking at VuePress 2 docs, the homepage layout fields are:
- `home: true` - enables homepage layout
- `heroText: string` - main title
- `tagline: string` - subtitle
- `actions: Array<{text, link, type}>` - CTA buttons
- `features: Array<{title, details}>` - feature cards
- `footer: string` - footer text
- `heroImage: string` - hero image path
- `heroAlt: string` - hero image alt text

Let me keep it clean without an image since we don't have a logo file yet.

- [ ] **Step 2: Update theme.ts to add navbar link to homepage**

In `docs/.vuepress/config.ts`, update the `'/'` locale's navbar to include the link back:

```ts
locales: {
  '/': {
    navbar: [
      { text: '首页', link: '/' },
    ],
  },
  '/v1.0/': {
    navbar: [
      { text: '首页', link: '/' },
    ],
  },
},
```

- [ ] **Step 3: Verify homepage renders**

Run: `pnpm dev` → open `http://localhost:8080`
Expected: Homepage with hero, CTA buttons, and 3 feature cards

- [ ] **Step 4: Commit**

```bash
git add docs/README.md
git commit -m "feat: add site homepage with hero and features"
```

---

### Task 5: Full Navigation Setup (Navbar + Sidebar)

**Files:**
- Modify: `docs/.vuepress/config.ts`

- [ ] **Step 1: Complete config.ts with full navigation**

```ts
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'

export default defineUserConfig({
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
```

- [ ] **Step 2: Verify navigation renders**

Run: `pnpm dev`
Expected: Navbar shows home link + 4 section links, version selector appears in navbar

- [ ] **Step 3: Commit**

```bash
git add docs/.vuepress/config.ts
git commit -m "feat: add full navbar and sidebar navigation"
```

---

### Task 6: v1.0 Quickstart Section

**Files:**
- Create: `docs/v1.0/README.md`
- Create: `docs/v1.0/quickstart/README.md`
- Create: `docs/v1.0/quickstart/create-test.md`
- Create: `docs/v1.0/quickstart/configuration.md`

- [ ] **Step 1: Create v1.0 landing page with redirect**

`docs/v1.0/README.md`:
```markdown
---
title: v1.0 文档
---

# Omni 测试平台 v1.0

欢迎使用 Omni 测试平台 v1.0 文档。

## 快速入口

- [快速上手](./quickstart/) — 从零开始使用平台
- [使用指南](./guide/) — 详细了解平台功能
- [插件](./plugins/) — 插件使用与开发
- [二次开发](./development/) — API 与架构说明
```

- [ ] **Step 2: Create quickstart overview**

`docs/v1.0/quickstart/README.md`:
```markdown
---
title: 快速上手
---

# 快速上手

本章节将帮助你快速开始使用 Omni 测试平台。

## 环境要求

- 支持的主流浏览器（Chrome 90+、Firefox 90+、Edge 90+）
- 稳定的网络连接

## 快速导航

- [创建第一个测试](./create-test.md) — 5 分钟创建并运行你的第一个测试用例
- [配置说明](./configuration.md) — 了解平台各项配置含义
```

- [ ] **Step 3: Create "create first test" page**

`docs/v1.0/quickstart/create-test.md`:
```markdown
---
title: 创建第一个测试
---

# 创建第一个测试

本文将引导你在 Omni 平台创建并执行第一个测试用例。

## 步骤一：登录平台

访问 Omni 平台地址，使用账号密码登录。

## 步骤二：创建项目

在项目管理页面，点击「新建项目」，填写项目名称和描述。

## 步骤三：创建测试用例

进入项目后，在测试用例模块点击「新建用例」，填写用例基本信息。

## 步骤四：执行测试

选择测试用例，点击「执行」按钮，选择执行环境和配置。

## 步骤五：查看报告

执行完成后，点击「查看报告」查看详细的测试结果。
```

- [ ] **Step 4: Create configuration page**

`docs/v1.0/quickstart/configuration.md`:
```markdown
---
title: 配置说明
---

# 配置说明

了解 Omni 测试平台的核心配置项。

## 系统配置

- **项目设置**：管理项目基本信息、成员权限
- **环境配置**：配置测试执行环境、参数变量
- **通知设置**：配置执行结果通知方式

## 用户配置

- **个人资料**：修改个人信息和密码
- **偏好设置**：自定义界面语言、主题等
```

- [ ] **Step 5: Verify quickstart pages render**

Run: `pnpm dev` → navigate to quickstart section
Expected: All pages render with correct sidebar

- [ ] **Step 6: Commit**

```bash
git add docs/v1.0/
git commit -m "feat: add v1.0 quickstart documentation section"
```

---

### Task 7: v1.0 Guide Section

**Files:**
- Create: `docs/v1.0/guide/README.md`
- Create: `docs/v1.0/guide/test-case.md`
- Create: `docs/v1.0/guide/test-suite.md`
- Create: `docs/v1.0/guide/test-execution.md`
- Create: `docs/v1.0/guide/report.md`

- [ ] **Step 1: Create guide overview**

`docs/v1.0/guide/README.md`:
```markdown
---
title: 使用指南
---

# 使用指南

本节详细介绍 Omni 测试平台的核心功能和使用方法。

- [测试用例管理](./test-case.md) — 创建、编辑和管理测试用例
- [测试套件](./test-suite.md) — 组织和管理测试套件
- [测试执行](./test-execution.md) — 执行测试并查看进度
- [测试报告](./report.md) — 分析测试结果和报告
```

- [ ] **Step 2: Create guide sub-pages**

`docs/v1.0/guide/test-case.md`:
```markdown
---
title: 测试用例管理
---

# 测试用例管理

## 创建测试用例

支持多种方式创建测试用例...

## 编辑测试用例

支持在线编辑和批量编辑...

## 管理测试用例

包括搜索、筛选、标签、分类等功能...

```

`docs/v1.0/guide/test-suite.md`:
```markdown
---
title: 测试套件
---

# 测试套件

## 创建测试套件

将相关测试用例组织成测试套件...

## 执行策略

配置测试套件的执行顺序和策略...

```

`docs/v1.0/guide/test-execution.md`:
```markdown
---
title: 测试执行
---

# 测试执行

## 执行方式

支持手动触发和自动触发两种方式...

## 执行环境

选择或配置测试执行环境...

## 执行日志

实时查看执行日志和进度...

```

`docs/v1.0/guide/report.md`:
```markdown
---
title: 测试报告
---

# 测试报告

## 报告概览

查看测试执行结果汇总...

## 报告详情

分析每个测试用例的执行结果...

## 报告导出

支持多种格式的报告导出...
```

- [ ] **Step 3: Verify guide pages render**

Run: `pnpm dev`
Expected: Guide section renders with correct sidebar navigation

- [ ] **Step 4: Commit**

```bash
git add docs/v1.0/guide/
git commit -m "feat: add v1.0 usage guide section"
```

---

### Task 8: v1.0 Plugins Section

**Files:**
- Create: `docs/v1.0/plugins/README.md`
- Create: `docs/v1.0/plugins/official.md`
- Create: `docs/v1.0/plugins/custom.md`

- [ ] **Step 1: Create plugins overview**

`docs/v1.0/plugins/README.md`:
```markdown
---
title: 插件
---

# 插件

Omni 测试平台支持插件化扩展，满足不同测试场景的需求。

- [官方插件](./official.md) — 了解平台提供的官方插件
- [自定义插件开发](./custom.md) — 开发自己的插件
```

- [ ] **Step 2-3: Create plugin sub-pages**

`docs/v1.0/plugins/official.md` — list with table of official plugins
`docs/v1.0/plugins/custom.md` — step-by-step on creating a custom plugin

- [ ] **Step 4: Commit**

```bash
git add docs/v1.0/plugins/
git commit -m "feat: add v1.0 plugins section"
```

---

### Task 9: v1.0 Development Section

**Files:**
- Create: `docs/v1.0/development/README.md`
- Create: `docs/v1.0/development/architecture.md`
- Create: `docs/v1.0/development/api.md`
- Create: `docs/v1.0/development/contribution.md`

- [ ] **Step 1: Create development overview**

`docs/v1.0/development/README.md`:
- Overview of development section

- [ ] **Step 2-4: Create sub-pages**

Architecture overview, API documentation skeleton, contribution guide

- [ ] **Step 5: Build verification**

Run: `pnpm build`
Expected: Build succeeds without errors

- [ ] **Step 6: Commit**

```bash
git add docs/v1.0/development/
git commit -m "feat: add v1.0 development section"
```

---

### Task 10: Build Verification and Final Polish

**Files:**
- Modify: `README.md` (project root)

- [ ] **Step 1: Run full production build**

Run: `pnpm build`
Expected: Build succeeds, output in `dist/`

- [ ] **Step 2: Update root README.md**

Replace the Gitee template README with a brief project-level readme pointing to the docs.

- [ ] **Step 3: Final commit**

```bash
git add README.md
git commit -m "docs: update project root README"
```
