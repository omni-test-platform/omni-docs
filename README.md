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

## 部署

### Cloudflare Pages

#### 方式一：Git 集成（推荐）

1. 将代码推送到 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Pages**
3. 点击 **Create a project** → **Connect to Git**
4. 选择 GitHub 仓库，配置构建设置：
   - **Build command**: `pnpm build && pnpm build`
   - **Build output directory**: `docs/.vuepress/dist`
5. 点击 **Save and Deploy**

每次推送 `master` 分支，Cloudflare Pages 会自动构建部署。

#### 方式二：Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy docs/.vuepress/dist --project-name=omni-docs
```

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
