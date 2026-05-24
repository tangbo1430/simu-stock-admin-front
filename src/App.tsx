import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { ConfigProvider, Spin, Typography } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { AuthGuard, GuestGuard } from '@/access/AuthGuard'
import { AdminLayout } from '@/layouts/AdminLayout'
import { getProfile } from '@/api/auth'
import {
  getStoredProfile,
  getToken,
  logout,
  saveSession,
  type StoredProfile,
} from '@/stores/auth'
import { getDefaultHomePath } from '@/access/routes'
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

function LoadingScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Spin size="large" />
      <Typography.Text type="secondary">正在加载运营后台...</Typography.Text>
    </div>
  )
}

export default function App() {
  const [profile, setProfile] = useState<StoredProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = useCallback(async () => {
    const token = getToken()
    const storedProfile = getStoredProfile()
    if (!token || !storedProfile) {
      logout()
      setProfile(null)
      setLoading(false)
      return
    }
    try {
      const p = await getProfile()
      const nextProfile: StoredProfile = {
        adminId: p.adminId,
        username: p.username,
        roleName: p.roleName,
        permissions: Array.isArray(p.permissions) ? p.permissions : [],
      }
      saveSession(token, nextProfile)
      setProfile(nextProfile)
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
    return <LoadingScreen />
  }

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestGuard profile={profile} loading={false} />}>
            <Route path="/login" element={<LoginPage onLoggedIn={refreshProfile} />} />
          </Route>
          <Route element={<AuthGuard profile={profile} loading={false} />}>
            <Route element={profile ? <AdminLayout profile={profile} onLogout={handleLogout} /> : null}>
              <Route index element={<Navigate to={profile ? getDefaultHomePath(profile.permissions) : '/login'} replace />} />
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
          <Route path="*" element={<Navigate to={profile ? getDefaultHomePath(profile.permissions) : '/login'} replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
