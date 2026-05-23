import { LogoutOutlined } from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import { Dropdown, Typography } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { buildMenuData } from '@/access/routes'
import type { StoredProfile } from '@/stores/auth'

interface AdminLayoutProps {
  profile: StoredProfile
  onLogout: () => void
}

export function AdminLayout({ profile, onLogout }: AdminLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const menuData = buildMenuData(profile.permissions)

  return (
    <ProLayout
      title="模拟盘运营后台"
      logo={false}
      layout="mix"
      fixSiderbar
      location={{ pathname: location.pathname }}
      route={{ path: '/', routes: menuData }}
      menuItemRender={(item, dom) => (
        <a
          onClick={(e) => {
            e.preventDefault()
            if (item.path) navigate(item.path)
          }}
        >
          {dom}
        </a>
      )}
      avatarProps={{
        title: profile.username,
        render: (_, dom) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'role',
                  label: (
                    <Typography.Text type="secondary">
                      角色：{profile.roleName}
                    </Typography.Text>
                  ),
                  disabled: true,
                },
                { type: 'divider' },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                  onClick: onLogout,
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        ),
      }}
    >
      <div style={{ padding: 24, minHeight: 'calc(100vh - 112px)' }}>
        <Outlet />
      </div>
    </ProLayout>
  )
}
