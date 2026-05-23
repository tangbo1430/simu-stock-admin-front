export const PERM = {
  DASHBOARD: 'dashboard.view',
  USER_MANAGE: 'user.manage',
  KYC_REVIEW: 'kyc.review',
  FUND_REVIEW: 'fund.review',
  SYS_CONFIG: 'sys.config',
  EXPORT_DATA: 'export.data',
} as const

export type Permission = (typeof PERM)[keyof typeof PERM]

export function hasPermission(perms: string[], required: string): boolean {
  return perms.includes(required)
}

export function hasAnyPermission(perms: string[], required: string[]): boolean {
  return required.some((p) => perms.includes(p))
}
