# Plan Admin-4：KYC 审核

## 页面

`/kyc/pending` + 详情 Drawer

## API

- `GET /kyc/pending`
- `GET /kyc/:applicationId`
- `POST /kyc/:applicationId/review`

## UI

- 列表：applicationId、userId、email、fullName、idNumber、createdAt
- 详情：证件 `documents[]`（docType + `imageUrl` data URL 预览）
- 通过：`{ action: "approve" }`
- 驳回：`{ action: "reject", reason: "必填" }`

## 权限

`kyc.review`
