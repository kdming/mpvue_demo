import fly from './fly'

// 用户注册
export default {
  register(data) {
    return fly.post('/user/register', data)
  },
  login(data) {
    return fly.post('/user/login', data)
  }
}
