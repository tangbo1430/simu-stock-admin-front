import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getToken } from '@/stores/auth'
import { canAccessRoute } from '@/access/routes'
import type { StoredProfile } from '@/stores/auth'

interface AuthGuardProps {
  profile: StoredProfile | null
  loading: boolean
}

export function AuthGuard({ profile, loading }: AuthGuardProps) {
  const location = useLocation()
  const token = getToken()

  if (loading) {
    return null
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
    return null
  }
  if (profile && getToken()) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
