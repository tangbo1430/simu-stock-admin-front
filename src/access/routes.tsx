import type { ReactNode } from 'react'
import {
  AuditOutlined,
  DashboardOutlined,
  DollarOutlined,
  ExportOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuDataItem } from '@ant-design/pro-components'
import { PERM } from '@/access/permissions'

export interface AppRoute {
  path: string
  name: string
  permission?: string
  icon?: ReactNode
  hideInMenu?: boolean
}

export const APP_ROUTES: AppRoute[] = [
  { path: '/dashboard', name: '运营看板', permission: PERM.DASHBOARD, icon: <DashboardOutlined /> },
  { path: '/users', name: '用户管理', permission: PERM.USER_MANAGE, icon: <TeamOutlined /> },
  { path: '/kyc/pending', name: 'KYC 审核', permission: PERM.KYC_REVIEW, icon: <SafetyOutlined /> },
  { path: '/fund/deposits', name: '充值审核', permission: PERM.FUND_REVIEW, icon: <DollarOutlined /> },
  { path: '/fund/withdraws', name: '提现审核', permission: PERM.FUND_REVIEW, icon: <DollarOutlined /> },
  { path: '/system/ip-whitelist', name: 'IP 白名单', permission: PERM.SYS_CONFIG, icon: <SettingOutlined /> },
  { path: '/system/trading-halt', name: '交易熔断', permission: PERM.SYS_CONFIG, icon: <SettingOutlined /> },
  { path: '/audit-logs', name: '审计日志', permission: PERM.SYS_CONFIG, icon: <AuditOutlined /> },
  { path: '/export/ledger', name: '流水导出', permission: PERM.EXPORT_DATA, icon: <ExportOutlined /> },
  { path: '/403', name: '无权限', hideInMenu: true },
  { path: '/login', name: '登录', hideInMenu: true, icon: <UserOutlined /> },
]

function safePermissions(permissions?: string[] | null): string[] {
  return Array.isArray(permissions) ? permissions : []
}

export function buildMenuData(permissions: string[]): MenuDataItem[] {
  const perms = safePermissions(permissions)
  return APP_ROUTES.filter(
    (r) => !r.hideInMenu && (!r.permission || perms.includes(r.permission)),
  ).map((r) => ({
    path: r.path,
    name: r.name,
    icon: r.icon,
  }))
}

export function getDefaultHomePath(permissions: string[]): string {
  const perms = safePermissions(permissions)
  const home = APP_ROUTES.find(
    (r) => !r.hideInMenu && (!r.permission || perms.includes(r.permission)),
  )
  return home?.path ?? '/403'
}

export function canAccessRoute(path: string, permissions: string[]): boolean {
  const perms = safePermissions(permissions)
  const route = APP_ROUTES.find((r) => r.path === path)
  if (!route || route.path === '/403' || route.path === '/login') return true
  if (!route.permission) return true
  return perms.includes(route.permission)
}
