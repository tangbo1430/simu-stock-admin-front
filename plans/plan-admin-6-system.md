# Plan Admin-6：系统设置

## 页面

- `/system/ip-whitelist` — IP 白名单 CRUD
- `/system/trading-halt` — 交易熔断 Switch

## API

- `GET/POST/PUT /sys/ip-whitelist`
- `GET /sys/config`、`PUT /sys/trading-halt`

## UI

- IP 白名单：ProTable + 新增 Modal（ipCidr、remark）；行内 Switch 切换 enabled
- 交易熔断：Switch + 二次确认 → `{ halt: boolean }`

## 权限

`sys.config`
