# 运营后台前端 — 分模块计划索引

> 对应后端 Plan 7A + 7B（[`plans/plan-7a-admin-auth.md`](../../plans/plan-7a-admin-auth.md)、[`plan-7b-admin-ops.md`](../../plans/plan-7b-admin-ops.md)）

## 实施顺序

| 模块 | 文档 | 状态 | 说明 |
|------|------|------|------|
| Admin-0 | [plan-admin-0-scaffold.md](plan-admin-0-scaffold.md) | 完成 | Vite + Ant Design Pro + axios + proxy |
| Admin-1 | [plan-admin-1-auth.md](plan-admin-1-auth.md) | 完成 | 登录、RBAC 菜单、路由守卫 |
| Admin-2 | [plan-admin-2-dashboard.md](plan-admin-2-dashboard.md) | 完成 | 运营看板 |
| Admin-3 | [plan-admin-3-users.md](plan-admin-3-users.md) | 完成 | 用户管理 |
| Admin-4 | [plan-admin-4-kyc.md](plan-admin-4-kyc.md) | 完成 | KYC 审核 |
| Admin-5 | [plan-admin-5-fund.md](plan-admin-5-fund.md) | 完成 | 充提审核 |
| Admin-6 | [plan-admin-6-system.md](plan-admin-6-system.md) | 完成 | IP 白名单、交易熔断 |
| Admin-7 | [plan-admin-7-audit-export.md](plan-admin-7-audit-export.md) | 完成 | 审计日志、流水导出 |
| Admin-8 | [plan-admin-8-acceptance.md](plan-admin-8-acceptance.md) | 完成 | 联调验收清单 |

## 源码目录

```
src/
  api/          # 按模块封装 /admin/api/v1
  access/       # 权限、路由、AuthGuard
  components/   # MoneyText、ImagePreview
  layouts/      # ProLayout
  pages/        # 各业务页面
  stores/       # auth token / profile
  utils/        # request、format
```

## 后端 API 基址

- 开发：`/admin/api/v1`（Vite proxy → `:8080`）
- 统一响应：`{ code: 1, data, msg }`（CSV 导出除外）

## 首版不做

- 管理员账号/角色 CRUD（仅 seed 超管）
- 交易订单 CSV 导出（后端未实现）
