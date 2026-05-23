/** 金额展示：CENTS × 0.01 → USD 展示值 */
export function formatCents(cents: string | number): string {
  const n = typeof cents === 'string' ? parseFloat(cents) : cents
  if (Number.isNaN(n)) return '0.00'
  return (n * 0.01).toFixed(2)
}

export function kycStatusLabel(status: number): string {
  switch (status) {
    case 0:
      return '未提交'
    case 1:
      return '审核中'
    case 2:
      return '已通过'
    case 3:
      return '已驳回'
    default:
      return String(status)
  }
}

export function userStatusLabel(status: number): string {
  return status === 2 ? '已封禁' : '正常'
}

export function docTypeLabel(docType: number): string {
  return docType === 1 ? '证件正面' : docType === 2 ? '证件反面' : `类型${docType}`
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
