---
title: 方案设计
---

# Omni 测试平台整体方案设计

## 一、项目概览

Omni 测试平台由以下子项目组成：

| 项目 | 技术栈 | 职责 | 版本 |
|------|--------|------|------|
| **omni-server** | Go + Gin + GORM | 后端 API 服务，核心业务逻辑 | v1.1.2.14 |
| **omni-web** | Vue 3 + Vite 7 + TypeScript + Naive UI | 前端管理控制台 | v1.1.2.14 |
| **omni-engine** | Python >= 3.9 + pytest | 分布式测试执行引擎 | v1.0.5 |
| **omni-license** | Go + RSA 2048 | License 签发与验证工具 | 独立二进制 |
| **omni-docs** | VuePress + Vite | 在线用户文档 | v1.1.2 |
| **design** | Markdown | 架构与设计文档仓库 | — |

---

## 二、测试平台（omni-server + omni-web）

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        omni-web (Vue 3 SPA)                     │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────────┐  │
│  │ Vue Router│ │ Pinia    │ │ Naive UI │ │ 业务视图 (17模块)  │  │
│  │ 动态路由 │ │ 状态管理  │ │ 组件库   │ │                    │  │
│  └─────────┘ └──────────┘ └──────────┘ └───────────────────┘  │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP REST (JSON)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                       omni-server (Go Gin)                      │
│                                                                 │
│  ┌──────────┐ ┌───────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Middleware│ │Controllers│ │ Services │ │   Repository     │  │
│  │ JWT/Casbin│ │ (API处理) │ │(业务逻辑) │ │   (数据访问)     │  │
│  │ License   │ │           │ │          │ │                  │  │
│  └──────────┘ └───────────┘ └──────────┘ └──────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                       数据层                              │   │
│  │  MySQL (主库) │ Redis (缓存) │ MongoDB (可选) │ 定时任务  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 业务模块

平台提供 17 个功能模块，涵盖测试全生命周期：

| 模块 | 路由前缀 | 功能描述 |
|------|----------|----------|
| 自动化测试 | `/at` | 用例管理、执行、任务调度、流水线、报表 |
| 性能测试 | `/perf` | 压测场景、结果分析、趋势对比 |
| 资产管理 | `/cmdb` | 机房、机柜、服务器、网络、IPAM、拓扑 |
| QA 质量分析 | `/qa/quality` | 质量趋势、缺陷分析 |
| QA 效率分析 | `/qa/efficiency` | 自动化覆盖率、执行效率 |
| QA 风险分析 | `/qa/risk` | 风险评估、预警 |
| 项目管理 | `/project` | IPD 流程管理 |
| 人工智能 | `/ai` | AI 助手、模型管理、Agent 编排 |
| 混沌工程 | `/chaos` | 故障注入、弹性测试 |
| 效率工具 | `/toolkit` | 常用工具集 |
| 数据工厂 | `/datafactory` | 测试数据构造 |
| 定时任务 | `/crontab` | 周期任务调度 |
| 第三方集成 | `/thirdparty` | 禅道等外部系统对接 |
| 通知管理 | `/notification` | 消息推送、告警 |
| 日志审计 | `/log` | 操作日志、审计 |
| 系统设置 | `/system` | 用户、角色、菜单、字典、参数 |
| 授权管理 | `/system/license` | License 导入与查看 |

### 2.3 路由架构

`internal/router/` 按模块组织，每个模块有独立的路由文件：

```
router/enter.go          ← 聚合所有路由组
  ├── system/            (17 文件: 用户/角色/菜单/字典/参数/License 等)
  ├── at/                (14 文件: 用例/执行/流水线/任务/报表 等)
  ├── cmdb/              (13 文件: 资产管理完整 CRUD)
  ├── perf/              (5 文件: 性能测试各类结果)
  ├── ai/                (1 文件: AI 需求分析)
  ├── pm/                (2 文件: IPD 阶段管理)
  ├── thirdparty/zentao/ (9 文件: 禅道 Bug/用例/需求 同步)
  ├── crontab/           (2 文件: 定时任务管理)
  ├── example/           (3 文件: CRUD 示例)
  └── settings/          (3 文件: 全局设置)
```

### 2.4 API 设计原则

- 统一 JSON 请求/响应格式
- RESTful 风格，模块化路由组
- JWT + Casbin 双层鉴权
- 全局中间件：鉴权、License 门禁、操作日志、异常恢复
- 响应格式统一通过 `response.FailWithDetailed()` / `response.OkWithData()` 封装

### 2.5 前端架构

- **路由**：动态路由，菜单从后端 API 获取，支持 License 禁用状态
- **状态管理**：Pinia，按模块拆分 Store
- **组件库**：Naive UI 按需引入
- **样式**：UnoCSS（原子化 CSS）
- **布局**：支持多种布局模式（垂直混合、水平混合、经典）

---

## 三、测试引擎（omni-engine）

### 3.1 架构定位

```
omni-web / omni-server          测试任务编排
         │
         ▼
    ┌─────────┐
    │ omni-engine (Python)  │     分布式测试执行
    │ pytest + 插件体系     │
    └────┬────────┬────────┘
         │        │
    ┌────▼──┐ ┌───▼──────┐
    │ Agent  │ │ Agent    │     多节点并行
    │ (节点1)│ │ (节点2)  │
    └───────┘ └──────────┘
```

### 3.2 核心能力

| 能力 | 实现 |
|------|------|
| 用例解析 | 支持 pytest 标准用例、自定义标签 |
| 分布式执行 | 多 Agent 并行，任务分片 |
| 报告生成 | Allure 报告、自定义 HTML 报告 |
| 环境管理 | 测试环境动态绑定 |
| 第三方集成 | 平台 API 对接、禅道联动 |
| CLI 工具 | 命令行执行、参数化配置 |

### 3.3 模块组成

```
omni/
  ├── cli/         命令行入口
  ├── config/      配置管理（含版本号）
  ├── context/     测试上下文
  ├── database/    数据库交互
  ├── engine/      执行引擎（API / 命令行 / kubectl 等驱动）
  ├── integrations/ 外部集成（Allure、平台 API）
  ├── models/      数据模型
  ├── notification/ 通知推送
  ├── parser/      用例解析
  ├── plugin/      pytest 插件
  ├── reporter/    报告生成
  └── utils/       工具函数
```

### 3.4 版本管理

引擎版本独立演进，当前 v1.0.5，采用与 omni-server 一致的 4 段语义化版本（major.minor.patch.build）。

---

## 四、License 管控系统

### 4.1 设计目标

- **双门禁**：前端菜单禁用 + 后端 API 中间件返回 HTTP 403
- **防篡改**：RSA-SHA256 数字签名覆盖所有业务字段
- **离线授权**：License 文件线下签发，线上导入验证
- **自愈**：不信任数据库状态字段，每次加载重新验签

### 4.2 系统架构

```
┌──────────────────────┐         ┌─────────────────────────────┐
│    omni-license       │         │       omni-server            │
│  （厂商端，持有私钥）  │         │   （客户服务器，内置公钥）    │
│                       │         │                             │
│  Web UI 签发 License  │──────→  │  License 文件导入            │
│  RSA 2048 签名        │  .json  │  RSA 验签 → 到期检查         │
│                       │         │  → 机器码绑定 → 功能解析     │
│  /api/keygen          │         │  → 写入 DB + 内存缓存        │
│  /api/license/generate│         │                             │
│  /api/license/info    │         │  License 中间件              │
│  /api/license/verify  │         │  Router.Use(LicenseRequired) │
└──────────────────────┘         │  → 未授权返回 403            │
                                 │                             │
                                 │  定时校验（每24h）           │
                                 │  loadFromDB 重新验签         │
                                 └─────────────────────────────┘
```

### 4.3 安全设计

- **算法**：RSA 2048，PKCS#1 v1.5 签名
- **哈希**：SHA-256，签名前将 `signature` 字段置空
- **密钥分离**：私钥仅在 omni-license 端，公钥编译内置 omni-server
- **覆盖范围**：签名涵盖 licenseId、edition、expiresAt、features、machineCode 等所有字段
- **不可绕过**：不提供配置文件开关，`-tags licensefree` 仅用于本地开发

### 4.4 版本分级

| 版本 | 包含功能 | 用户数限制 |
|------|----------|-----------|
| 无 License | 仅首页 + 授权管理 | — |
| 基础版（Basic） | 基础功能、测试平台 | ≤ 3 |
| 标准版（Standard） | 基础版 + QA质效分析、混沌工程、效率工具 | ≤ 20 |
| 企业版（Enterprise） | 标准版 + AI 智能助手、高级特性 | 不限 |
| 自定义（Custom） | 手工选择功能组合 | 按配置 |

### 4.5 功能特征矩阵

| 特征 Key | 中文名 | Basic | Standard | Enterprise |
|----------|--------|-------|----------|------------|
| `basic-modules` | 基础功能 | ✓ | ✓ | ✓ |
| `test-platform` | 测试平台 | ✓ | ✓ | ✓ |
| `qa-analysis` | QA 质效分析 | | ✓ | ✓ |
| `chaos-engine` | 混沌工程 | | ✓ | ✓ |
| `toolkit` | 效率工具 | | ✓ | ✓ |
| `ai-assistant` | AI 智能助手 | | | ✓ |
| `advanced` | 高级特性 | | | ✓ |

### 4.6 验证闭环

```
启动时
  └→ loadFromDB()
      ├→ 解析 License JSON
      ├→ RSA 验签（防篡改）
      ├→ 到期检查
      ├→ 机器码匹配
      └→ 加载特征列表到缓存

每 24 小时
  └→ periodicValidation()
      └→ 重新执行 loadFromDB()

API 调用
  └→ LicenseRequired("feature") 中间件
      └→ CheckFeature("feature")
          ├→ 缓存中存在 → 放行
          └→ 不存在 → 返回 403 + LICENSE_RESTRICTED
```

### 4.7 迁移说明（旧特征 Key → 新）

| 旧 Key | 新 Key | 说明 |
|--------|--------|------|
| `at-automation` | `test-platform` | 合并到测试平台 |
| `dfx-perf` | `test-platform` | 合并到测试平台 |
| `cmdb` | `test-platform` | 合并到测试平台 |
| `project-management` | `qa-analysis` | 归入质量分析 |
| `advanced-report` | `advanced` | 重命名 |
| `test-environment` | — | 移除独立特征 |

---

## 五、在线文档（omni-docs）

### 5.1 技术选型

- **框架**：VuePress 2.x + Vite 打包器
- **主题**：默认主题（defaultTheme）
- **插件**：搜索（@vuepress/plugin-search）、代码高亮（@vuepress/plugin-shiki）
- **构建**：`docs/.vuepress/dist/` 输出静态站点

### 5.2 内容架构

```
docs/
  ├── .vuepress/config.ts      ← 导航栏 + 侧边栏配置
  ├── README.md                ← 首页
  ├── superpowers/             ← 技术预研/设计文档
  └── v1.1.2/                  ← 当前版本文档
      ├── README.md             ← 版本首页
      ├── deployment/           ← 安装部署
      ├── quickstart/           ← 快速上手（含创建测试、配置）
      ├── guide/                ← 使用指南（用例、套件、执行、报表）
      ├── plugins/              ← 插件开发（官方 + 自定义）
      └── development/          ← 二次开发（架构、API、贡献、方案设计）
```

### 5.3 版本策略

- `v1.1.2` — 当前稳定版
- `v1.1.3` — 下一个版本（敬请期待）
- 通过 VuePress 多语言/多版本侧边栏切换

---

## 六、项目规范

### 6.1 版本规范

统一使用 4 段语义化版本：`major.minor.patch.build`

```
v1.1.2.14
 │ │ │ │
 │ │ │ └── 构建号（每次功能发布递增）
 │ │ └──── 修订号（Bug 修复）
 │ └────── 次版本号（功能迭代）
 └──────── 主版本号（重大重构）
```

### 6.2 分支策略

- `main` / `master` — 稳定发布分支
- `dev/v{major}.{minor}.{patch}` — 开发分支
- 功能开发基于 `dev/` 分支

### 6.3 代码规范

- **Go**：遵循 Go 标准项目布局，Go fmt 格式化
- **Vue/TypeScript**：ESLint + Prettier，Naive UI 组件库规范
- **Python**：PEP 8，pytest 测试框架
- **提交信息**：`type: description` 格式（feat/fix/docs/chore 等）

---

## 七、部署架构

```
                     ┌─────────────┐
                     │   Nginx      │ 反向代理 / 负载均衡
                     │  (SSL 终止)  │
                     └──────┬──────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
         omni-web                  omni-docs
         (静态资源)                (静态站点)
              │                           │
              └─────────────┬─────────────┘
                            │
                    ┌───────┴───────┐
                    │  omni-server  │ Go 二进制
                    │  (API 服务)   │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
         MySQL         Redis        MongoDB
         (主库)        (缓存)       (可选)
              │
              │
        ┌─────┴─────┐
        │ omni-engine│ Python 分布式执行节点
        │  (Agent)   │
        └───────────┘
```
