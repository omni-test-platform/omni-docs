---
title: API 文档
---

# API 文档

## 认证

所有 API 请求需要在 Header 中携带认证 Token。

## 测试用例 API

- `GET /api/cases` — 获取测试用例列表
- `POST /api/cases` — 创建测试用例
- `PUT /api/cases/:id` — 更新测试用例
- `DELETE /api/cases/:id` — 删除测试用例

## 执行 API

- `POST /api/executions` — 触发测试执行
- `GET /api/executions/:id` — 查询执行状态

> 完整的 API 文档请参考平台 Swagger 文档。
