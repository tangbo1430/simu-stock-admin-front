import { requestJson } from '@/utils/request'
import type { LoginResult, ProfileResult } from '@/types/api'

export async function login(username: string, password: string): Promise<LoginResult> {
  return requestJson<LoginResult>({
    method: 'POST',
    url: '/login',
    data: { username, password },
  })
}

export async function getProfile(): Promise<ProfileResult> {
  return requestJson<ProfileResult>({ method: 'GET', url: '/profile' })
}
