import { requestJson } from '@/utils/request'
import type { PageResult, UserItem } from '@/types/api'

export interface UserListParams {
  page?: number
  pageSize?: number
  email?: string
  status?: number
  kycStatus?: number
}

export async function listUsers(params: UserListParams): Promise<PageResult<UserItem>> {
  return requestJson<PageResult<UserItem>>({
    method: 'GET',
    url: '/users',
    params,
  })
}

export async function banUser(userId: number): Promise<void> {
  await requestJson({ method: 'POST', url: `/users/${userId}/ban` })
}

export async function unbanUser(userId: number): Promise<void> {
  await requestJson({ method: 'POST', url: `/users/${userId}/unban` })
}

export async function resetUserPassword(userId: number, newPassword: string): Promise<void> {
  await requestJson({
    method: 'POST',
    url: `/users/${userId}/reset-password`,
    data: { newPassword },
  })
}
