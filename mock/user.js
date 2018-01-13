// 支持值为 Object 和 Array
const currentUser = {
  $desc: '获取当前用户接口',
  $params: {
    pageSize: {
      desc: '分页',
      exp: 2,
    },
  },
  $body: {
    name: 'Serati Ma',
    avatar: '/exImages/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    notifyCount: 12,
  },
}
// GET POST 可省略
const users = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}]

export default {
  'GET /api/currentUser': currentUser,
  'GET /api/users': users,
}
