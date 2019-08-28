import axios from '@/utils/myaxios.js'
// 获取用户的数据
export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色权限接口
export const delRightsByRoleId = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
