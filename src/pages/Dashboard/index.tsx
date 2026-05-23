import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components'
import { Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboard } from '@/api/dashboard'
import type { DashboardData } from '@/types/api'
import { MoneyText } from '@/components/MoneyText'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboard()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageContainer title="运营看板" loading={loading}>
      <ProCard gutter={16} wrap>
        <StatisticCard
          colSpan={{ xs: 24, sm: 12, md: 6 }}
          statistic={{ title: '用户总数', value: data?.userCount ?? 0 }}
        />
        <StatisticCard
          colSpan={{ xs: 24, sm: 12, md: 6 }}
          statistic={{
            title: '平台总余额',
            valueRender: () => (
              <MoneyText cents={data?.totalBalanceCents ?? '0'} />
            ),
          }}
        />
        <StatisticCard
          colSpan={{ xs: 24, sm: 12, md: 4 }}
          statistic={{ title: '待审 KYC', value: data?.pendingKyc ?? 0 }}
          onClick={() => navigate('/kyc/pending')}
          style={{ cursor: 'pointer' }}
        />
        <StatisticCard
          colSpan={{ xs: 24, sm: 12, md: 4 }}
          statistic={{ title: '待审充值', value: data?.pendingDeposit ?? 0 }}
          onClick={() => navigate('/fund/deposits')}
          style={{ cursor: 'pointer' }}
        />
        <StatisticCard
          colSpan={{ xs: 24, sm: 12, md: 4 }}
          statistic={{ title: '待审提现', value: data?.pendingWithdraw ?? 0 }}
          onClick={() => navigate('/fund/withdraws')}
          style={{ cursor: 'pointer' }}
        />
      </ProCard>
      <ProCard title="交易状态" style={{ marginTop: 16 }}>
        {data?.tradingHalt ? (
          <Tag color="error">已熔断 — 用户无法下单</Tag>
        ) : (
          <Tag color="success">正常</Tag>
        )}
      </ProCard>
    </PageContainer>
  )
}
