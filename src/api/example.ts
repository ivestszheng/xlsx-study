import request from '@/utils/request'

// 测试接口为 http://localhost:3000/banner?type=2
export function useAxiosGet(query:unknown) {
  return request.get(`/banner`,{params:query})
}

export function useAxiosPost(query:unknown) {
  return request.post(`/banner`,{params:query})
}