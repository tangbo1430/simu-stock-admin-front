import { requestJson } from '@/utils/request'
import type { IpWhitelistItem, SysConfigData } from '@/types/api'

export async function listIpWhitelist(): Promise<IpWhitelistItem[]> {
  const res = await requestJson<{ list: IpWhitelistItem[] }>({
    method: 'GET',
    url: '/sys/ip-whitelist',
  })
  return res.list ?? []
}

export async function createIpWhitelist(ipCidr: string, remark: string): Promise<IpWhitelistItem> {
  return requestJson<IpWhitelistItem>({
    method: 'POST',
    url: '/sys/ip-whitelist',
    data: { ipCidr, remark },
  })
}

export async function updateIpWhitelist(
  id: number,
  data: { remark?: string; enabled?: boolean },
): Promise<void> {
  await requestJson({
    method: 'PUT',
    url: `/sys/ip-whitelist/${id}`,
    data,
  })
}

export async function getSysConfig(): Promise<SysConfigData> {
  return requestJson<SysConfigData>({ method: 'GET', url: '/sys/config' })
}

export async function setTradingHalt(halt: boolean): Promise<void> {
  await requestJson({
    method: 'PUT',
    url: '/sys/trading-halt',
    data: { halt },
  })
}
