import { Image } from 'antd'

interface ImagePreviewProps {
  url?: string
  width?: number
  height?: number
}

export function ImagePreview({ url, width = 120, height = 120 }: ImagePreviewProps) {
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
        src={url}
        width={width}
        height={height}
        style={{ objectFit: 'contain' }}
        preview={{ mask: '预览' }}
      />
    </div>
  )
}
