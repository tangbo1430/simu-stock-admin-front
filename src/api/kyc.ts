import { requestJson } from '@/utils/request'
import type { KycPendingItem, PageResult } from '@/types/api'

export async function listPendingKyc(page = 1, pageSize = 20): Promise<PageResult<KycPendingItem>> {
  return requestJson<PageResult<KycPendingItem>>({
    method: 'GET',
    url: '/kyc/pending',
    params: { page, pageSize },
  })
}

export async function getKycApplication(applicationId: number): Promise<KycPendingItem> {
  return requestJson<KycPendingItem>({
    method: 'GET',
    url: `/kyc/${applicationId}`,
  })
}

export async function reviewKyc(
  applicationId: number,
  body: { action: 'approve' | 'reject'; remark?: string; reason?: string },
): Promise<void> {
  await requestJson({
    method: 'POST',
    url: `/kyc/${applicationId}/review`,
    data: body,
  })
}
