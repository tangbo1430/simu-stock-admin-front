import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function ForbiddenPage() {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="您没有访问该页面的权限"
      extra={
        <Button type="primary" onClick={() => navigate('/dashboard')}>
          返回看板
        </Button>
      }
    />
  )
}
