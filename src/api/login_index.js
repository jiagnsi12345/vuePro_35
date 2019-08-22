import axios from '@/utils/myaxios.js'
export const logins = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}
