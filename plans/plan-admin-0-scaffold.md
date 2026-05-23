# Plan Admin-0：工程脚手架

## 目标

可运行的空壳 + 开发代理 + 统一 HTTP 层。

## 交付

- Vite + React 18 + TypeScript
- Ant Design 5 + `@ant-design/pro-components`
- `vite.config.ts`：`/admin` → `http://127.0.0.1:8080`
- `.env.development`：`VITE_API_BASE=/admin/api/v1`
- `src/utils/request.ts`：JSON `{ code, data, msg }`；`export/fund-ledger` 用 blob

## 验收

- `npm run dev` 可启动（端口 5174）
- `npm run build` 通过
