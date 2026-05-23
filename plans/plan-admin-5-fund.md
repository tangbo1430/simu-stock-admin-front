# Plan Admin-5：充提审核

## 页面

- `/fund/deposits` — 充值审核
- `/fund/withdraws` — 提现审核

## API

- `GET /fund/deposits/pending`、`/fund/withdraws/pending`
- `POST /fund/deposit|withdraw/:orderId/approve|reject`

## UI

- 充值：orderId、userId、email、amountUsdt、amountCents、凭证缩略图
- 提现：orderId、userId、email、amountCents、凭证
- 通过：`{ remark? }`；驳回：`{ reason }` 必填

## 权限

`fund.review`
