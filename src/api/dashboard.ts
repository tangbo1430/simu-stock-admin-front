import { requestJson } from '@/utils/request'
import type { DashboardData } from '@/types/api'

export async function getDashboard(): Promise<DashboardData> {
  return requestJson<DashboardData>({ method: 'GET', url: '/dashboard' })
}
