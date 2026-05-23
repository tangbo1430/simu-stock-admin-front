# Plan Admin-3：用户管理

## 页面

`/users`

## API

- `GET /users` — 分页筛选
- `POST /users/:userId/ban|unban|reset-password`

## UI（ProTable）

- 筛选：`email`、`status`（1 正常 / 2 封禁）、`kycStatus`（0~3）
- 列：userId、email、status、kycStatus、createdAt
- 操作：封禁/解封（Popconfirm）、重置密码（Modal，min 8 位）

## 权限

`user.manage`
