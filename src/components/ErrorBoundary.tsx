import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button, Result } from 'antd'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('admin ui crashed', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="error"
          title="页面渲染失败"
          subTitle={this.state.error.message || '请打开浏览器控制台查看详情，或清除站点数据后重试'}
          extra={
            <Button
              type="primary"
              onClick={() => {
                localStorage.removeItem('admin_access_token')
                localStorage.removeItem('admin_profile')
                window.location.href = '/login'
              }}
            >
              清除登录状态并重试
            </Button>
          }
        />
      )
    }
    return this.props.children
  }
}
