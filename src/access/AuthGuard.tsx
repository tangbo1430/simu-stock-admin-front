import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Spin } from 'antd'
import { getToken } from '@/stores/auth'
import { canAccessRoute, getDefaultHomePath } from '@/access/routes'
import type { StoredProfile } from '@/stores/auth'

interface AuthGuardProps {
  profile: StoredProfile | null
  loading: boolean
}

export function AuthGuard({ profile, loading }: AuthGuardProps) {
  const location = useLocation()
  const token = getToken()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!token || !profile) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!canAccessRoute(location.pathname, profile.permissions)) {
    return <Navigate to="/403" replace />
  }

  return <Outlet />
}

export function GuestGuard({ profile, loading }: AuthGuardProps) {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }
  if (profile && getToken()) {
    return <Navigate to={getDefaultHomePath(profile.permissions)} replace />
  }
  return <Outlet />
}
