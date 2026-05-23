import { requestBlob, requestJson } from '@/utils/request'
import type { AuditLogItem, PageResult } from '@/types/api'

export async function listAuditLogs(page = 1, pageSize = 20): Promise<PageResult<AuditLogItem>> {
  return requestJson<PageResult<AuditLogItem>>({
    method: 'GET',
    url: '/audit-logs',
    params: { page, pageSize },
  })
}

export async function exportFundLedger(params: {
  dateFrom: string
  dateTo: string
  userId?: number
}): Promise<Blob> {
  return requestBlob({
    method: 'GET',
    url: '/export/fund-ledger',
    params,
  })
}
