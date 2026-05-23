export interface ApiResponse<T = unknown> {
  code: number
  data: T
  msg: string
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface LoginResult {
  accessToken: string
  expiresIn: number
  adminId: number
  username: string
  roleName: string
  permissions: string[]
}

export interface ProfileResult {
  adminId: number
  username: string
  roleName: string
  permissions: string[]
}

export interface DashboardData {
  userCount: number
  totalBalanceCents: string
  pendingKyc: number
  pendingDeposit: number
  pendingWithdraw: number
  tradingHalt: boolean
}

export interface UserItem {
  userId: number
  email: string
  status: number
  kycStatus: number
  createdAt: string
}

export interface KycDocument {
  docType: number
  imageUrl?: string
}

export interface KycPendingItem {
  applicationId: number
  userId: number
  email: string
  fullName: string
  idNumber: string
  createdAt: string
  documents: KycDocument[]
}

export interface DepositPendingItem {
  orderId: number
  userId: number
  email: string
  amountUsdt: string
  amountCents: string
  voucherUrl?: string
  createdAt: string
}

export interface WithdrawPendingItem {
  orderId: number
  userId: number
  email: string
  amountCents: string
  voucherUrl?: string
  createdAt: string
}

export interface IpWhitelistItem {
  id: number
  ipCidr: string
  remark: string
  enabled: boolean
  createdAt: string
}

export interface SysConfigData {
  tradingHalt: boolean
}

export interface AuditLogItem {
  id: number
  adminId: number
  action: string
  targetType: string
  targetId: number
  content: Record<string, unknown>
  ip: string
  createdAt: string
}
