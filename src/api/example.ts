import request from '@/utils/request';

// 测试接口为 http://localhost:3000/banner?type=2
export function useAxiosGet(params: unknown) {
  return request.get(`/banner`, { params });
}

export function useAxiosPost(data: unknown) {
  return request.post(`/banner`, data);
}
