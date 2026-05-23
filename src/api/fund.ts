import { requestJson } from '@/utils/request'
import type {
  DepositPendingItem,
  PageResult,
  WithdrawPendingItem,
} from '@/types/api'

export async function listPendingDeposits(
  page = 1,
  pageSize = 20,
): Promise<PageResult<DepositPendingItem>> {
  return requestJson<PageResult<DepositPendingItem>>({
    method: 'GET',
    url: '/fund/deposits/pending',
    params: { page, pageSize },
  })
}

export async function listPendingWithdraws(
  page = 1,
  pageSize = 20,
): Promise<PageResult<WithdrawPendingItem>> {
  return requestJson<PageResult<WithdrawPendingItem>>({
    method: 'GET',
    url: '/fund/withdraws/pending',
    params: { page, pageSize },
  })
}

export async function approveDeposit(orderId: number, remark?: string): Promise<void> {
  await requestJson({
    method: 'POST',
    url: `/fund/deposit/${orderId}/approve`,
    data: { remark: remark || '' },
  })
}

export async function rejectDeposit(orderId: number, reason: string): Promise<void> {
  await requestJson({
    method: 'POST',
    url: `/fund/deposit/${orderId}/reject`,
    data: { reason },
  })
}

export async function approveWithdraw(orderId: number, remark?: string): Promise<void> {
  await requestJson({
    method: 'POST',
    url: `/fund/withdraw/${orderId}/approve`,
    data: { remark: remark || '' },
  })
}

export async function rejectWithdraw(orderId: number, reason: string): Promise<void> {
  await requestJson({
    method: 'POST',
    url: `/fund/withdraw/${orderId}/reject`,
    data: { reason },
  })
}
