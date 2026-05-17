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

## 部署（NGINX）

构建后将产物部署到本地 NGINX 服务器：

```bash
# 构建
pnpm build

# 复制到 NGINX 目录
sudo cp -r docs/.vuepress/dist/* /usr/share/nginx/html/omni-docs/

# 或指定自定义路径
sudo cp -r docs/.vuepress/dist/* /var/www/omni-docs/
```

NGINX 配置示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /omni-docs/ {
        alias /usr/share/nginx/html/omni-docs/;
        index index.html;
        try_files $uri $uri/ /omni-docs/index.html;
    }
}
```

> 如果部署在非根路径，构建时需设置 `VUEPRESS_BASE` 环境变量：
> ```bash
> VUEPRESS_BASE=/omni-docs/ pnpm build
> ```

## 目录结构

```
docs/
├── .vuepress/            # VuePress 配置
│   ├── config.ts         # 主配置
│   ├── client.ts         # 客户端增强
│   ├── styles/           # 自定义样式
│   └── public/           # 静态资源
├── v1.1.2/               # v1.1.2 版本文档
│   ├── deployment/       # 安装部署
│   ├── quickstart/       # 快速上手
│   ├── guide/            # 使用指南
│   ├── plugins/          # 插件
│   └── development/      # 二次开发
├── v1.1.3/               # v1.1.3 版本文档（敬请期待）
│   ├── deployment/
│   ├── quickstart/
│   ├── guide/
│   ├── plugins/
│   └── development/
└── README.md             # 站点首页
```
