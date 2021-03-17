/*
 * @Author: your name
 * @Date: 2020-05-07 09:11:05
 * @LastEditTime: 2020-05-19 08:21:05
 * @LastEditors: liangzhanpeng
 * @Description: In User Settings Edit
 * @FilePath: \new-backendclient\src\routes\index.js
 */
import Login from '../module/Login/index.jsx';
import DataResource from '../module/DataResource/index.jsx';

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: DataResource,
    exact: true
  }
]
export default routes