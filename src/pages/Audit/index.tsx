import type { ProColumns } from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { Typography } from 'antd'
import { listAuditLogs } from '@/api/audit'
import type { AuditLogItem } from '@/types/api'

export default function AuditLogsPage() {
  const columns: ProColumns<AuditLogItem>[] = [
    { title: 'Id', dataIndex: 'id', width: 70 },
    { title: '管理员 Id', dataIndex: 'adminId', width: 100 },
    { title: '动作', dataIndex: 'action', width: 200, copyable: true },
    { title: '目标类型', dataIndex: 'targetType', width: 120 },
    { title: '目标 Id', dataIndex: 'targetId', width: 90 },
    {
      title: '内容',
      dataIndex: 'content',
      ellipsis: true,
      render: (_, r) => (
        <Typography.Text copyable={{ text: JSON.stringify(r.content) }}>
          {JSON.stringify(r.content)}
        </Typography.Text>
      ),
    },
    { title: 'IP', dataIndex: 'ip', width: 130 },
    { title: '时间', dataIndex: 'createdAt', width: 180 },
  ]

  return (
    <PageContainer title="审计日志">
      <ProTable<AuditLogItem>
        rowKey="id"
        columns={columns}
        search={false}
        request={async (params) => {
          const res = await listAuditLogs(params.current, params.pageSize)
          return { data: res.list, total: res.total, success: true }
        }}
        pagination={{ defaultPageSize: 20 }}
      />
    </PageContainer>
  )
}
