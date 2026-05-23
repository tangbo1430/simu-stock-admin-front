# 模拟盘运营后台（simu-stock-admin-front）

React + Ant Design Pro 运营后台，对接 `simu-stock-server` 的 `/admin/api/v1/*` 接口。

## 环境要求

- Node.js 18+（推荐安装到 **D:\dev\nodejs**，避免写入 C 盘）
- 后端 API 运行在 `http://127.0.0.1:8080`
- 本地 IP 需在后台白名单（seed 默认含 `127.0.0.1`）

## 启动

### Windows（推荐）

PowerShell 默认可能拦截 `npm.ps1`，请用 **cmd 脚本**（走 D 盘 Node）：

```cmd
cd simu-stock-admin-front
install.cmd
dev.cmd
```

或手动指定 D 盘 Node：

```cmd
set PATH=D:\dev\nodejs;%PATH%
npm.cmd install
npm.cmd run dev
```

### 通用

```bash
cd simu-stock-admin-front
npm install
npm run dev
```

浏览器访问 http://localhost:5174

默认登录：`admin` / `Admin@123`（**区分大小写**）

### 登录失败排查

| 错误码 | 含义 | 处理 |
|--------|------|------|
| `50001` | 用户名或密码错误 | 确认已执行 `seed_admin`；密码为 `Admin@123` |
| `50006` | 连续输错 5 次被锁 30 分钟 | 见下方解锁命令 |

在后端 `app` 目录执行：

```powershell
$env:Path = "C:\Program Files\Go\bin;" + $env:Path
go run ../scripts/seed_admin/main.go      # 重置 admin 密码
go run ../scripts/clear_admin_lock/main.go # 清除登录锁定
```

## 开发代理

Vite 将 `/admin` 代理到 `http://127.0.0.1:8080`，无需额外 CORS 配置。

## 模块

| 页面 | 路径 | 权限 |
|------|------|------|
| 运营看板 | `/dashboard` | dashboard.view |
| 用户管理 | `/users` | user.manage |
| KYC 审核 | `/kyc/pending` | kyc.review |
| 充值审核 | `/fund/deposits` | fund.review |
| 提现审核 | `/fund/withdraws` | fund.review |
| IP 白名单 | `/system/ip-whitelist` | sys.config |
| 交易熔断 | `/system/trading-halt` | sys.config |
| 审计日志 | `/audit-logs` | sys.config |
| 流水导出 | `/export/ledger` | export.data |

详细分模块计划见 [`plans/README.md`](plans/README.md)。

## 构建

```bash
npm run build
```

产物在 `dist/`，可部署到 Nginx 静态目录；生产环境需配置反向代理到后端 `/admin/api/v1`。
