# Plan Admin-2：运营看板

## 页面

`/dashboard`

## API

`GET /admin/api/v1/dashboard`

## UI

- StatisticCard：用户总数、平台总余额（`totalBalanceCents` × 0.01）
- 待办：待审 KYC / 充值 / 提现（点击跳转对应页）
- 交易状态：`tradingHalt` Tag（已熔断 / 正常）

## 权限

`dashboard.view`
