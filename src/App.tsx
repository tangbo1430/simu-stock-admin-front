import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { AuthGuard, GuestGuard } from '@/access/AuthGuard'
import { AdminLayout } from '@/layouts/AdminLayout'
import { getProfile } from '@/api/auth'
import {
  getStoredProfile,
  logout,
  saveSession,
  type StoredProfile,
} from '@/stores/auth'
import { getToken } from '@/stores/auth'
import LoginPage from '@/pages/Login'
import ForbiddenPage from '@/pages/Forbidden'
import DashboardPage from '@/pages/Dashboard'
import UsersPage from '@/pages/Users'
import KycPendingPage from '@/pages/Kyc'
import FundDepositsPage from '@/pages/Fund/Deposits'
import FundWithdrawsPage from '@/pages/Fund/Withdraws'
import IpWhitelistPage from '@/pages/System/IpWhitelist'
import TradingHaltPage from '@/pages/System/TradingHalt'
import AuditLogsPage from '@/pages/Audit'
import ExportLedgerPage from '@/pages/Export/Ledger'

export default function App() {
  const [profile, setProfile] = useState<StoredProfile | null>(getStoredProfile())
  const [loading, setLoading] = useState(true)

  const refreshProfile = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setProfile(null)
      setLoading(false)
      return
    }
    try {
      const p = await getProfile()
      const stored: StoredProfile = {
        adminId: p.adminId,
        username: p.username,
        roleName: p.roleName,
        permissions: p.permissions,
      }
      saveSession(token, stored)
      setProfile(stored)
    } catch {
      logout()
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshProfile()
  }, [refreshProfile])

  const handleLogout = () => {
    logout()
    setProfile(null)
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestGuard profile={profile} loading={false} />}>
            <Route path="/login" element={<LoginPage onLoggedIn={refreshProfile} />} />
          </Route>
          <Route element={<AuthGuard profile={profile} loading={false} />}>
            <Route element={<AdminLayout profile={profile!} onLogout={handleLogout} />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/kyc/pending" element={<KycPendingPage />} />
              <Route path="/fund/deposits" element={<FundDepositsPage />} />
              <Route path="/fund/withdraws" element={<FundWithdrawsPage />} />
              <Route path="/system/ip-whitelist" element={<IpWhitelistPage />} />
              <Route path="/system/trading-halt" element={<TradingHaltPage />} />
              <Route path="/audit-logs" element={<AuditLogsPage />} />
              <Route path="/export/ledger" element={<ExportLedgerPage />} />
            </Route>
          </Route>
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
