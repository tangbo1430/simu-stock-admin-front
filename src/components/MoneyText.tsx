import { Typography } from 'antd'

interface MoneyTextProps {
  cents: string | number
  prefix?: string
}

export function MoneyText({ cents, prefix = '$' }: MoneyTextProps) {
  const n = typeof cents === 'string' ? parseFloat(cents) : cents
  const display = Number.isNaN(n) ? '0.00' : (n * 0.01).toFixed(2)
  return (
    <Typography.Text>
      {prefix}
      {display}
    </Typography.Text>
  )
}
