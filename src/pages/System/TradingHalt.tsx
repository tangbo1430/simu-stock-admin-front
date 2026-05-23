import { PageContainer, ProCard } from '@ant-design/pro-components'
import { message, Modal, Switch, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { getSysConfig, setTradingHalt } from '@/api/sys'

export default function TradingHaltPage() {
  const [halt, setHalt] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSysConfig()
      .then((cfg) => setHalt(cfg.tradingHalt))
      .finally(() => setLoading(false))
  }, [])

  const onToggle = (checked: boolean) => {
    Modal.confirm({
      title: checked ? '确认开启交易熔断？' : '确认关闭交易熔断？',
      content: checked
        ? '开启后用户将无法下单（返回 43001）'
        : '关闭后恢复正常交易',
      onOk: async () => {
        await setTradingHalt(checked)
        setHalt(checked)
        message.success('已更新')
      },
    })
  }

  return (
    <PageContainer title="交易熔断" loading={loading}>
      <ProCard>
        <Typography.Paragraph>
          控制模拟盘全局下单开关，对应后端 <code>sys_config.trading_halt</code>。
        </Typography.Paragraph>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}>
          <Switch checked={halt} onChange={onToggle} />
          {halt ? (
            <Tag color="error">已熔断 — 用户无法下单</Tag>
          ) : (
            <Tag color="success">正常交易</Tag>
          )}
        </div>
      </ProCard>
    </PageContainer>
  )
}
