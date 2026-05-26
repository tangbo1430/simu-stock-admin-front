import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES, getDefaultHomePath } from '@/access/routes'
import { getStoredProfile } from '@/stores/auth'

function homeButtonLabel(path: string): string {
  if (path === '/login') {
    return '前往登录'
  }
  const route = APP_ROUTES.find((r) => r.path === path)
  if (route?.name) {
    return `返回${route.name}`
  }
  return '返回首页'
}

export default function ForbiddenPage() {
  const navigate = useNavigate()
  const profile = getStoredProfile()
  const homePath = profile ? getDefaultHomePath(profile.permissions) : '/login'
  const canLeave = homePath !== '/403'

  function handleBack() {
    if (!canLeave) {
      navigate('/login', { replace: true })
      return
    }
    navigate(homePath, { replace: true })
  }

  return (
    <Result
      status="403"
      title="403"
      subTitle="您没有访问该页面的权限"
      extra={
        <Button type="primary" onClick={handleBack}>
          {canLeave ? homeButtonLabel(homePath) : '前往登录'}
        </Button>
      }
    />
  )
}
