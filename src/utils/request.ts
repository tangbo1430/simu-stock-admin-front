import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { message } from 'antd'
import type { ApiResponse } from '@/types/api'
import { getToken, logout } from '@/stores/auth'

const baseURL = import.meta.env.VITE_API_BASE || '/admin/api/v1'

export const http = axios.create({
  baseURL,
  timeout: 30000,
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const ERROR_HINTS: Record<number, string> = {
  50001: '用户名或密码错误',
  50002: 'IP 不在白名单，请联系运维添加',
  50003: '无操作权限',
  50005: '管理员账号已禁用',
  50006: '登录尝试过多，请稍后再试',
  50004: '审核目标状态非法',
  50007: '导出参数无效',
  40010: '未登录或登录已过期',
}

function handleAuthError(): void {
  logout()
  if (!window.location.pathname.startsWith('/login')) {
    window.location.href = '/login'
  }
}

export async function requestJson<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const res = await http.request<ApiResponse<T>>(config)
    const body = res.data
    if (body.code !== 1) {
      const hint = ERROR_HINTS[body.code] || body.msg || '请求失败'
      message.error(hint)
      if (body.code === 40010) {
        handleAuthError()
      }
      throw new Error(hint)
    }
    return body.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const ax = err as AxiosError<ApiResponse>
      if (ax.response?.status === 401 || ax.response?.data?.code === 40010) {
        message.error('登录已过期，请重新登录')
        handleAuthError()
      }
    }
    throw err
  }
}

export async function requestBlob(config: AxiosRequestConfig): Promise<Blob> {
  try {
    const res = await http.request({
      ...config,
      responseType: 'blob',
    })
    const contentType = String(res.headers['content-type'] || '')
    if (contentType.includes('application/json')) {
      const text = await (res.data as Blob).text()
      const json = JSON.parse(text) as ApiResponse
      const hint = ERROR_HINTS[json.code] || json.msg || '导出失败'
      message.error(hint)
      throw new Error(hint)
    }
    return res.data as Blob
  } catch (err) {
    throw err
  }
}
