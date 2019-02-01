module.exports = {
  getUserInfo: {
    code: 200,
    msg: 'success',
    data: {
      token: 'admin'
    }
  },
  logout: {
    code: 200,
    msg: 'success',
    data: ''
  },
  login: {
    code: 200,
    data: {
      name: '刘芳',
      avatar: 'user02.png',
      organizations: [],
      roles: ['admin']
    }
  }
}
