import type { ActionType, ProColumns } from '@ant-design/pro-components'
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components'
import { Button, Drawer, Empty, message, Space, Spin, Tag } from 'antd'
import { useRef, useState } from 'react'
import { getKycApplication, listPendingKyc, reviewKyc } from '@/api/kyc'
import type { KycPendingItem } from '@/types/api'
import { ImagePreview } from '@/components/ImagePreview'
import { docTypeLabel } from '@/utils/format'

export default function KycPendingPage() {
  const actionRef = useRef<ActionType>()
  const [detail, setDetail] = useState<KycPendingItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)

  const openDetail = async (applicationId: number) => {
    setDrawerOpen(true)
    setDetailLoading(true)
    setDetail(null)
    try {
      const item = await getKycApplication(applicationId)
      setDetail(item)
    } finally {
      setDetailLoading(false)
    }
  }

  const columns: ProColumns<KycPendingItem>[] = [
    { title: '申请 Id', dataIndex: 'applicationId', width: 90 },
    { title: '用户 Id', dataIndex: 'userId', width: 90 },
    { title: '邮箱', dataIndex: 'email', copyable: true },
    { title: '姓名', dataIndex: 'fullName' },
    { title: '证件号', dataIndex: 'idNumber', ellipsis: true },
    { title: '提交时间', dataIndex: 'createdAt', width: 180 },
    {
      title: '证件预览',
      width: 140,
      search: false,
      render: (_, record) => {
        const docs = record.documents ?? []
        if (docs.length === 0) return <span style={{ color: '#999' }}>无</span>
        return (
          <Space size={4}>
            {docs.slice(0, 2).map((doc, i) => (
              <ImagePreview key={i} url={doc.imageUrl} width={56} height={56} />
            ))}
          </Space>
        )
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (_, record) => (
        <Button type="link" onClick={() => openDetail(record.applicationId)}>
          审核
        </Button>
      ),
    },
  ]

  return (
    <PageContainer title="KYC 审核">
      <ProTable<KycPendingItem>
        rowKey="applicationId"
        actionRef={actionRef}
        columns={columns}
        search={false}
        request={async (params) => {
          const res = await listPendingKyc(params.current, params.pageSize)
          return { data: res.list, total: res.total, success: true }
        }}
        pagination={{ defaultPageSize: 20 }}
      />

      <Drawer
        title="KYC 审核详情"
        width={560}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false)
          setDetail(null)
        }}
        destroyOnClose
        extra={
          detail ? (
            <Space>
              <Button
                type="primary"
                onClick={async () => {
                  await reviewKyc(detail.applicationId, { action: 'approve' })
                  message.success('已通过')
                  setDrawerOpen(false)
                  actionRef.current?.reload()
                }}
              >
                通过
              </Button>
              <Button danger onClick={() => setRejectOpen(true)}>
                驳回
              </Button>
            </Space>
          ) : null
        }
      >
        {detailLoading ? (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <Spin tip="加载证件照片..." />
          </div>
        ) : detail ? (
          <>
            <ProDescriptions column={1} size="small">
              <ProDescriptions.Item label="申请 Id">{detail.applicationId}</ProDescriptions.Item>
              <ProDescriptions.Item label="用户">{detail.email}</ProDescriptions.Item>
              <ProDescriptions.Item label="姓名">{detail.fullName}</ProDescriptions.Item>
              <ProDescriptions.Item label="证件号">{detail.idNumber}</ProDescriptions.Item>
              <ProDescriptions.Item label="提交时间">{detail.createdAt}</ProDescriptions.Item>
            </ProDescriptions>
            <div style={{ marginTop: 16 }}>
              <Tag>证件照片</Tag>
              {(detail.documents ?? []).length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="暂无证件照片，请确认用户提交时是否上传了正反面"
                  style={{ marginTop: 16 }}
                />
              ) : (
                <Space wrap size={16} style={{ marginTop: 12 }}>
                  {(detail.documents ?? []).map((doc, i) => (
                    <div key={i}>
                      <div style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>
                        {docTypeLabel(doc.docType)}
                      </div>
                      <ImagePreview url={doc.imageUrl} width={240} height={160} />
                    </div>
                  ))}
                </Space>
              )}
            </div>
          </>
        ) : null}
      </Drawer>

      <ModalForm
        title="驳回 KYC"
        open={rejectOpen}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setRejectOpen(false),
        }}
        onFinish={async (values) => {
          if (!detail) return false
          await reviewKyc(detail.applicationId, { action: 'reject', reason: values.reason })
          message.success('已驳回')
          setRejectOpen(false)
          setDrawerOpen(false)
          actionRef.current?.reload()
          return true
        }}
      >
        <ProFormTextArea
          name="reason"
          label="驳回原因"
          rules={[{ required: true, message: '请填写驳回原因' }]}
        />
      </ModalForm>
    </PageContainer>
  )
}
