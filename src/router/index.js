import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from "../pages/Login/Login"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/msite",
      meta:{showFooter:true},
    },
    {
      path: '/msite',
      component: Msite,
      meta:{showFooter:true},
    },
    {
      path: '/order',
      component: Order,
      meta:{showFooter:true},
    },
    {
      path: '/profile',
      component: Profile,
      meta:{showFooter:true},
    },
    {
      path: '/search',
      component: Search,
      meta:{showFooter:true},
    },
    {
      path: '/login',
      component: Login,
    },
  ]
})
