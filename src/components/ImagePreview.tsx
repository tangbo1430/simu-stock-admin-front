import { Image, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { requestBlob } from '@/utils/request'

interface ImagePreviewProps {
  url?: string
  width?: number
  height?: number
}

function isDataUrl(url: string): boolean {
  return url.startsWith('data:')
}

function isAuthImagePath(url: string): boolean {
  return url.startsWith('/admin/') || url.startsWith('/kyc/') || url.startsWith('/fund/')
}

export function ImagePreview({ url, width = 120, height = 120 }: ImagePreviewProps) {
  const [src, setSrc] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!url) {
      setSrc(undefined)
      setLoading(false)
      return
    }
    if (isDataUrl(url)) {
      setSrc(url)
      setLoading(false)
      return
    }

    let objectUrl: string | undefined
    let cancelled = false
    setLoading(true)
    setSrc(undefined)

    const fetchPath = isAuthImagePath(url)
      ? url.replace(/^\/admin\/api\/v1/, '')
      : url

    requestBlob({ method: 'GET', url: fetchPath })
      .then((blob) => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(blob)
        setSrc(objectUrl)
      })
      .catch(() => {
        if (!cancelled) setSrc(undefined)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [url])

  if (!url) {
    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #d9d9d9',
          borderRadius: 4,
          color: '#999',
          fontSize: 12,
          background: '#fafafa',
        }}
      >
        无图片
      </div>
    )
  }

  if (loading && !src) {
    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #f0f0f0',
          borderRadius: 4,
          background: '#fafafa',
        }}
      >
        <Spin size="small" />
      </div>
    )
  }

  if (!src) {
    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #d9d9d9',
          borderRadius: 4,
          color: '#999',
          fontSize: 12,
          background: '#fafafa',
        }}
      >
        加载失败
      </div>
    )
  }

  return (
    <div
      style={{
        width,
        height,
        border: '1px solid #f0f0f0',
        borderRadius: 4,
        overflow: 'hidden',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        style={{ objectFit: 'contain' }}
        preview={{ mask: '预览' }}
      />
    </div>
  )
}
