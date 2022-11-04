export const sysLogin = {
  success: true,
  code: 10000,
  data: {
    token: 'Bearer d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0',
  },
  message: '执行成功',
}

export const sysProfile = {
  success: true,
  code: 200,
  data: {
    role: [
      {
        id: '1',
        title: '超级管理员',
      },
    ],
    _id: '612710a0ec87aa543c9c341d',
    id: '0',
    username: 'super-admin',
    title: '超级管理员',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
    permission: {
      menus: ['userManage', 'roleList', 'permissionList', 'articleRanking', 'articleCreate'],
      points: ['distributeRole', 'importUser', 'removeUser', 'distributePermission'],
    },
  },
  message: '获取资料成功',
}

export const userList = {
  success: true,
  code: 200,
  data: {
    list: [
      {
        role: [
          {
            id: '1',
            title: '超级管理员',
          },
        ],
        _id: '612710a0ec87aa543c9c341d',
        id: '0',
        openTime: '1433088000000',
        username: 'super-admin',
        mobile: '188xxxx0001',
        avatar: 'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png',
      },
      {
        role: [
          {
            id: '2',
            title: '管理员',
          },
        ],
        _id: '612710a0ec87aa543c9c341e',
        id: '1',
        username: 'admin',
        openTime: '1559318400000',
        mobile: '188xxxx0002',
        avatar: 'https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg',
      },
    ],
    total: 7,
    page: '1',
    size: '2',
  },
  message: 'success',
}
