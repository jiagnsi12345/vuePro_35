import axios from '@/utils/myaxios.js'

export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}
// 添加用户数据新增方法

export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 用户数据得编辑

export const ditUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

// 角色分配编辑
export const grantUserRloe = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.rid }
  })
}
