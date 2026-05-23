import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { login } from '@/api/auth'
import { saveSession } from '@/stores/auth'
import './index.css'

interface LoginPageProps {
  onLoggedIn: () => void
}

interface LoginValues {
  username: string
  password: string
}

export default function LoginPage({ onLoggedIn }: LoginPageProps) {
  const navigate = useNavigate()
  const [form] = Form.useForm<LoginValues>()

  return (
    <div className="login-page">
      <Card className="login-card" bordered={false}>
        <Typography.Title level={3} className="login-title">
          模拟盘运营后台
        </Typography.Title>
        <Form
          form={form}
          layout="vertical"
          className="login-form"
          onFinish={async (values) => {
            try {
              const res = await login(values.username, values.password)
              saveSession(res.accessToken, {
                adminId: res.adminId,
                username: res.username,
                roleName: res.roleName,
                permissions: res.permissions,
              })
              message.success('登录成功')
              onLoggedIn()
              navigate('/dashboard', { replace: true })
            } catch {
              return
            }
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="login-input-icon" />}
              placeholder="用户名"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="login-input-icon" />}
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item className="login-submit-item">
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
