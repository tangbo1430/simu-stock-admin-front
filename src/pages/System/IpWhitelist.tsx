import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ModalForm, PageContainer, ProFormText, ProTable } from '@ant-design/pro-components'
import { Button, message, Switch, Tag } from 'antd'
import { useRef, useState } from 'react'
import { createIpWhitelist, listIpWhitelist, updateIpWhitelist } from '@/api/sys'
import type { IpWhitelistItem } from '@/types/api'

export default function IpWhitelistPage() {
  const actionRef = useRef<ActionType>()
  const [createOpen, setCreateOpen] = useState(false)

  const columns: ProColumns<IpWhitelistItem>[] = [
    { title: 'Id', dataIndex: 'id', width: 60 },
    { title: 'CIDR', dataIndex: 'ipCidr', copyable: true },
    { title: '备注', dataIndex: 'remark' },
    {
      title: '状态',
      dataIndex: 'enabled',
      render: (_, r) => (
        <Switch
          checked={r.enabled}
          onChange={async (checked) => {
            await updateIpWhitelist(r.id, { enabled: checked })
            message.success('已更新')
            actionRef.current?.reload()
          }}
        />
      ),
    },
    { title: '创建时间', dataIndex: 'createdAt', width: 180 },
    {
      title: '状态标签',
      search: false,
      render: (_, r) => (
        <Tag color={r.enabled ? 'green' : 'default'}>{r.enabled ? '启用' : '禁用'}</Tag>
      ),
    },
  ]

  return (
    <PageContainer
      title="IP 白名单"
      extra={
        <Button type="primary" onClick={() => setCreateOpen(true)}>
          新增
        </Button>
      }
    >
      <ProTable<IpWhitelistItem>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        search={false}
        request={async () => {
          const list = await listIpWhitelist()
          return { data: list, total: list.length, success: true }
        }}
        pagination={false}
      />
      <ModalForm
        title="新增 IP 白名单"
        open={createOpen}
        modalProps={{ destroyOnClose: true, onCancel: () => setCreateOpen(false) }}
        onFinish={async (values) => {
          await createIpWhitelist(values.ipCidr, values.remark || '')
          message.success('已添加')
          setCreateOpen(false)
          actionRef.current?.reload()
          return true
        }}
      >
        <ProFormText
          name="ipCidr"
          label="IP/CIDR"
          placeholder="127.0.0.1/32"
          rules={[{ required: true, message: '请输入 CIDR' }]}
        />
        <ProFormText name="remark" label="备注" />
      </ModalForm>
    </PageContainer>
  )
}
