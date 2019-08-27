import axios from '@/utils/myaxios.js'
// 获取用户的数据
export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}
