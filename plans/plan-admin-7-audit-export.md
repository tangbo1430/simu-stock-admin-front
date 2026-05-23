# Plan Admin-7：审计与导出

## 页面

- `/audit-logs` — 审计日志只读表
- `/export/ledger` — 流水 CSV 导出

## API

- `GET /audit-logs` — 分页
- `GET /export/fund-ledger` — 原始 CSV（非 JSON）

## UI

- 审计：adminId、action、targetType、targetId、content(JSON)、ip、createdAt
- 导出：dateFrom、dateTo、userId（可选）→ blob 下载 `fund_ledger.csv`

## 权限

- 审计：`sys.config`
- 导出：`export.data`
