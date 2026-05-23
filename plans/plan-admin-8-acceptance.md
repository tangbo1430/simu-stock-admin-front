# Plan Admin-8：联调验收

## 前置

1. 后端 `simu-stock-server` 运行在 `:8080`
2. 执行 `scripts/seed_admin`（含 `127.0.0.1` 白名单、admin 账号）
3. 前端 `npm install && npm run dev`（`:5174`）

## 全链路用例

| # | 用例 | 预期 |
|---|------|------|
| 1 | `admin` / `Admin@123` 登录 | profile 含 6 个权限，菜单完整 |
| 2 | 看板待办数 | 与 DB pending 一致 |
| 3 | 用户封禁 / 解封 | C 端登录失败 / 恢复 |
| 4 | KYC 提交 → 后台通过 | `user.kycStatus=2` |
| 5 | 充值 pending → approve | 钱包余额增加 |
| 6 | 提现 pending → reject | 冻结释放 |
| 7 | `auditor` 无 `fund.review` | 充提菜单不可见；API `50003` |
| 8 | 导出 CSV | 文件下载成功；产生 audit 记录 |
| 9 | 开启 `trading_halt` | C 端下单返回 `43001` |

## 文档

- [`plans/README.md`](README.md) — 模块索引
- [`simu-stock-server/docs/delivery-status.md`](../../simu-stock-server/docs/delivery-status.md) — 运营后台前端进度

## 首版不做

- 管理员账号/角色 CRUD
- `GET /export/trade-orders`
