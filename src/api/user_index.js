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
