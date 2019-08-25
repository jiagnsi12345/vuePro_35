/* eslint-disable no-undef */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  let mytoken = localStorage.getItem('itcast_manager_35_token')
  if (mytoken) {
    config.headers.Authorization = mytoken
  }

  return config
}, function (err) {
  return Promise.reject(err)
})

export default axios
