---
title: 安装部署
---

# 安装部署

本文档介绍 Omni 测试平台的安装和部署方式。

## 环境要求

- **操作系统**：Linux / macOS / Windows
- **运行时**：Node.js 18+
- **数据库**：PostgreSQL 14+
- **内存**：最低 4GB，推荐 8GB+

## 快速安装

### 使用 Docker（推荐）

```bash
# 拉取最新镜像
docker pull omni-platform/omni-server:latest

# 启动服务
docker run -d \
  --name omni-server \
  -p 8080:8080 \
  -e DB_HOST=your-postgres-host \
  -e DB_PORT=5432 \
  -e DB_NAME=omni \
  -e DB_USER=omni \
  -e DB_PASSWORD=your-password \
  omni-platform/omni-server:latest
```

### 使用 Docker Compose

```yaml
version: '3.8'
services:
  omni-server:
    image: omni-platform/omni-server:latest
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=omni
      - DB_USER=omni
      - DB_PASSWORD=changeme
    depends_on:
      - postgres

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: omni
      POSTGRES_USER: omni
      POSTGRES_PASSWORD: changeme
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### 手动安装

```bash
# 克隆仓库
git clone https://github.com/omni-test-platform/omni-server.git
cd omni-server

# 安装依赖
npm install

# 构建项目
npm run build

# 初始化数据库
npm run db:migrate

# 启动服务
npm run start
```

## 配置说明

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `PORT` | 服务端口 | `8080` |
| `DB_HOST` | 数据库地址 | `localhost` |
| `DB_PORT` | 数据库端口 | `5432` |
| `DB_NAME` | 数据库名称 | `omni` |
| `DB_USER` | 数据库用户 | `omni` |
| `LOG_LEVEL` | 日志级别 | `info` |

## 验证部署

启动后访问 `http://localhost:8080`，看到 Omni 测试平台登录页面即表示部署成功。

```bash
curl http://localhost:8080/api/health
# 预期返回: {"status":"ok"}
```
