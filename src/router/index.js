import Vue from 'vue'
import Router from 'vue-router'
import main from '../pages/main/index.vue'
//用户模块
import login from '../pages/user/login/login.vue'
import userList from '../pages/user/list/list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/', name: 'main', component: main ,children:[
      { path:'/user/list',name:'用户列表', component: userList}
    ] }
  ]
})
