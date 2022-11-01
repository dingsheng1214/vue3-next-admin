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
