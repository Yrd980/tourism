import request from '@/utils/request'

// 查询投诉处理列表
export function listComplaints(query) {
  return request({
    url: '/complaint/complaints/list',
    method: 'get',
    params: query
  })
}

// 查询投诉处理详细
export function getComplaints(id) {
  return request({
    url: '/complaint/complaints/' + id,
    method: 'get'
  })
}

// 新增投诉处理
export function addComplaints(data) {
  return request({
    url: '/complaint/complaints',
    method: 'post',
    data: data
  })
}

// 修改投诉处理
export function updateComplaints(data) {
  return request({
    url: '/complaint/complaints',
    method: 'put',
    data: data
  })
}

// 删除投诉处理
export function delComplaints(id) {
  return request({
    url: '/complaint/complaints/' + id,
    method: 'delete'
  })
}
