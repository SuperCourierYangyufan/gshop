import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from "../pages/Login/Login"
import Shop from "../pages/Shop/shop"
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo"
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods"
import ShopRating from "../pages/Shop/ShopRating/ShopRating"

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
    {
      path: "/shop",
      component:Shop,
      children:[
        {
          path: "/shop/shopRating",
          component: ShopRating,
        },
        {
          path: "/shop/shopGoods",
          component:ShopGoods ,
        },
        {
          path: "/shop/shopInfo",
          component: ShopInfo,
        },
        {
          path: '',
          redirect: "/shop/shopGoods"
        }
      ],
    },
  ]
})
