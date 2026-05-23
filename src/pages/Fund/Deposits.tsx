import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ModalForm, PageContainer, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space } from 'antd'
import { useRef, useState } from 'react'
import {
  approveDeposit,
  listPendingDeposits,
  rejectDeposit,
} from '@/api/fund'
import type { DepositPendingItem } from '@/types/api'
import { ImagePreview } from '@/components/ImagePreview'
import { MoneyText } from '@/components/MoneyText'

export default function FundDepositsPage() {
  const actionRef = useRef<ActionType>()
  const [rejectOrderId, setRejectOrderId] = useState<number | null>(null)

  const columns: ProColumns<DepositPendingItem>[] = [
    { title: '订单 Id', dataIndex: 'orderId', width: 90 },
    { title: '用户 Id', dataIndex: 'userId', width: 90 },
    { title: '邮箱', dataIndex: 'email', copyable: true },
    {
      title: 'USDT',
      dataIndex: 'amountUsdt',
      render: (_, r) => r.amountUsdt,
    },
    {
      title: '金额',
      dataIndex: 'amountCents',
      render: (_, r) => <MoneyText cents={r.amountCents} />,
    },
    {
      title: '凭证',
      dataIndex: 'voucherUrl',
      render: (_, r) => <ImagePreview url={r.voucherUrl} width={80} />,
    },
    { title: '提交时间', dataIndex: 'createdAt', width: 180 },
    {
      title: '操作',
      valueType: 'option',
      width: 160,
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="确认通过该充值？"
            onConfirm={async () => {
              await approveDeposit(record.orderId)
              message.success('已通过')
              actionRef.current?.reload()
            }}
          >
            <Button type="link">通过</Button>
          </Popconfirm>
          <Button type="link" danger onClick={() => setRejectOrderId(record.orderId)}>
            驳回
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageContainer title="充值审核">
      <ProTable<DepositPendingItem>
        rowKey="orderId"
        actionRef={actionRef}
        columns={columns}
        search={false}
        request={async (params) => {
          const res = await listPendingDeposits(params.current, params.pageSize)
          return { data: res.list, total: res.total, success: true }
        }}
        pagination={{ defaultPageSize: 20 }}
      />
      <ModalForm
        title="驳回充值"
        open={rejectOrderId !== null}
        modalProps={{ destroyOnClose: true, onCancel: () => setRejectOrderId(null) }}
        onFinish={async (values) => {
          if (rejectOrderId === null) return false
          await rejectDeposit(rejectOrderId, values.reason)
          message.success('已驳回')
          setRejectOrderId(null)
          actionRef.current?.reload()
          return true
        }}
      >
        <ProFormTextArea
          name="reason"
          label="驳回原因"
          rules={[{ required: true, message: '请填写原因' }]}
        />
      </ModalForm>
    </PageContainer>
  )
}
