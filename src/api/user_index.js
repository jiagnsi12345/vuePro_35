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

export const editUser = (data) => {
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

// 实现角色删除

export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 进行用户状态修改

export const updateUserState = (uId, type) => {
  return axios({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}
