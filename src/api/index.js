import request from '@/utils/request'

export function query() {
  return request({
    url: '/hello',
    method: 'get'
  })
}