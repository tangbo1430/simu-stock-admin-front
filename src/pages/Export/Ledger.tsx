import { PageContainer, ProForm, ProFormDatePicker, ProFormDigit } from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import type { Dayjs } from 'dayjs'
import { exportFundLedger } from '@/api/audit'
import { downloadBlob } from '@/utils/format'

function formatDate(v: Dayjs | string | undefined): string {
  if (!v) return ''
  if (typeof v === 'string') return v.slice(0, 10)
  return v.format('YYYY-MM-DD')
}

export default function ExportLedgerPage() {
  return (
    <PageContainer title="流水导出">
      <Card style={{ maxWidth: 480 }}>
        <ProForm
          onFinish={async (values) => {
            const blob = await exportFundLedger({
              dateFrom: formatDate(values.dateFrom),
              dateTo: formatDate(values.dateTo),
              userId: values.userId,
            })
            downloadBlob(blob, 'fund_ledger.csv')
            message.success('导出成功')
            return true
          }}
          submitter={{
            render: () => (
              <Button type="primary" htmlType="submit">
                导出 CSV
              </Button>
            ),
          }}
        >
          <ProFormDatePicker
            name="dateFrom"
            label="开始日期"
            rules={[{ required: true, message: '请选择' }]}
          />
          <ProFormDatePicker
            name="dateTo"
            label="结束日期"
            rules={[{ required: true, message: '请选择' }]}
          />
          <ProFormDigit name="userId" label="用户 Id（可选）" min={1} fieldProps={{ precision: 0 }} />
        </ProForm>
      </Card>
    </PageContainer>
  )
}
