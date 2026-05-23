import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ModalForm, PageContainer, ProFormText, ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space, Tag } from 'antd'
import { useRef, useState } from 'react'
import { banUser, listUsers, resetUserPassword, unbanUser } from '@/api/users'
import type { UserItem } from '@/types/api'
import { kycStatusLabel, userStatusLabel } from '@/utils/format'

export default function UsersPage() {
  const actionRef = useRef<ActionType>()
  const [resetUserId, setResetUserId] = useState<number | null>(null)

  const columns: ProColumns<UserItem>[] = [
    { title: '用户 Id', dataIndex: 'userId', width: 90, search: false },
    { title: '邮箱', dataIndex: 'email', copyable: true },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: { text: '正常', status: 'Success' },
        2: { text: '已封禁', status: 'Error' },
      },
      render: (_, r) => (
        <Tag color={r.status === 2 ? 'red' : 'green'}>{userStatusLabel(r.status)}</Tag>
      ),
    },
    {
      title: 'KYC',
      dataIndex: 'kycStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '未提交' },
        1: { text: '审核中' },
        2: { text: '已通过' },
        3: { text: '已驳回' },
      },
      render: (_, r) => kycStatusLabel(r.kycStatus),
    },
    { title: '注册时间', dataIndex: 'createdAt', search: false, width: 180 },
    {
      title: '操作',
      valueType: 'option',
      width: 220,
      render: (_, record) => (
        <Space>
          {record.status === 2 ? (
            <Popconfirm
              title="确认解封该用户？"
              onConfirm={async () => {
                await unbanUser(record.userId)
                message.success('已解封')
                actionRef.current?.reload()
              }}
            >
              <Button type="link">解封</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="确认封禁该用户？"
              onConfirm={async () => {
                await banUser(record.userId)
                message.success('已封禁')
                actionRef.current?.reload()
              }}
            >
              <Button type="link" danger>
                封禁
              </Button>
            </Popconfirm>
          )}
          <Button type="link" onClick={() => setResetUserId(record.userId)}>
            重置密码
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer title="用户管理">
      <ProTable<UserItem>
        rowKey="userId"
        actionRef={actionRef}
        columns={columns}
        request={async (params) => {
          const res = await listUsers({
            page: params.current,
            pageSize: params.pageSize,
            email: params.email,
            status: params.status ? Number(params.status) : undefined,
            kycStatus: params.kycStatus !== undefined ? Number(params.kycStatus) : undefined,
          })
          return { data: res.list, total: res.total, success: true }
        }}
        pagination={{ defaultPageSize: 20 }}
        search={{ labelWidth: 'auto' }}
      />
      <ModalForm
        title="重置用户密码"
        open={resetUserId !== null}
        modalProps={{ destroyOnClose: true, onCancel: () => setResetUserId(null) }}
        onFinish={async (values) => {
          if (resetUserId === null) return false
          await resetUserPassword(resetUserId, values.newPassword)
          message.success('密码已重置')
          setResetUserId(null)
          return true
        }}
      >
        <ProFormText.Password
          name="newPassword"
          label="新密码"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 8, message: '至少 8 位' },
          ]}
        />
      </ModalForm>
    </PageContainer>
  )
}
