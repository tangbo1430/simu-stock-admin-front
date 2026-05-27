import { PageContainer, ProForm, ProFormDatePicker, ProFormDigit } from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import type { RuleObject } from 'antd/es/form'
import type { StoreValue } from 'antd/es/form/interface'
import dayjs, { type Dayjs } from 'dayjs'
import { exportFundLedger } from '@/api/audit'
import { downloadBlob } from '@/utils/format'

function formatDate(v: Dayjs | string | undefined): string {
  if (!v) return ''
  if (typeof v === 'string') return v.slice(0, 10)
  return v.format('YYYY-MM-DD')
}

/** 禁止选择今天之后的日期 */
function disableFutureDate(current: Dayjs): boolean {
  return current != null && current.endOf('day').isAfter(dayjs().endOf('day'))
}

export default function ExportLedgerPage() {
  return (
    <PageContainer title="流水导出">
      <Card style={{ maxWidth: 480 }}>
        <ProForm
          onFinish={async (values) => {
            const dateFrom = formatDate(values.dateFrom)
            const dateTo = formatDate(values.dateTo)
            if (dateFrom && dateTo && dateFrom > dateTo) {
              message.error('开始日期不能晚于结束日期')
              return false
            }
            const blob = await exportFundLedger({
              dateFrom,
              dateTo,
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
            fieldProps={{
              disabledDate: disableFutureDate,
            }}
          />
          <ProFormDatePicker
            name="dateTo"
            label="结束日期"
            rules={[
              { required: true, message: '请选择' },
              ({ getFieldValue }: { getFieldValue: (name: string) => StoreValue }) => ({
                validator(_: RuleObject, value: StoreValue) {
                  const from = getFieldValue('dateFrom') as Dayjs | undefined
                  if (!value || !from) return Promise.resolve()
                  if (formatDate(value) < formatDate(from)) {
                    return Promise.reject(new Error('结束日期不能早于开始日期'))
                  }
                  return Promise.resolve()
                },
              }),
            ]}
            fieldProps={{
              disabledDate: disableFutureDate,
            }}
          />
          <ProFormDigit name="userId" label="用户 Id（可选）" min={1} fieldProps={{ precision: 0 }} />
        </ProForm>
      </Card>
    </PageContainer>
  )
}
