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

## 部署

### Gitee Pages（推荐）

1. 在 Gitee 仓库页面进入「服务 > Gitee Pages」
2. 部署分支选择 `gh-pages`，部署目录选择 `/`（根目录）
3. 点击「启动」完成部署

> 每次更新文档后，运行 `./deploy.sh` 即可自动构建并更新部署。

### CI/CD 自动部署

仓库已配置 Gitee Go 工作流（`.gitee/workflows/build.yml`），当推送 `master` 分支时自动执行：

1. 安装依赖并构建
2. 将构建产物推送到 `gh-pages` 分支
3. Gitee Pages 自动更新

**启用方式：**
1. 在 Gitee 仓库「管理 > Gitee Go」中激活 CI
2. 在「设置 > 密钥管理」中添加 `GITEE_TOKEN` 密钥（Personal Access Token）
3. 推送 `master` 分支即可触发自动构建部署

### 自定义域名

如果使用自定义域名：

```bash
VUEPRESS_BASE=/ ./deploy.sh
```

并在 Gitee Pages 设置中配置自定义域名。

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
