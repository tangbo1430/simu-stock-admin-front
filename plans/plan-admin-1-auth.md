# Plan Admin-1：登录与权限布局

## 页面

- `/login` — 登录表单
- ProLayout 主布局（侧边栏 + 顶栏）

## 功能

- 登录：`username` / `password` → 存 `accessToken`、`permissions[]`、`roleName`
- 启动时 `GET /profile` 恢复会话；401 / `40010` → 跳登录
- RBAC 菜单：按 `permissions` 过滤；直链无权限 → `/403`
- 顶栏：管理员名、角色、退出

## 权限 → 菜单

| 菜单 | 权限 |
|------|------|
| 看板 | `dashboard.view` |
| 用户管理 | `user.manage` |
| KYC 审核 | `kyc.review` |
| 充值/提现审核 | `fund.review` |
| IP 白名单 / 交易熔断 / 审计日志 | `sys.config` |
| 流水导出 | `export.data` |

## 错误 UX

- `50001` 密码错误、`50002` IP 白名单、`50006` 账号锁定
