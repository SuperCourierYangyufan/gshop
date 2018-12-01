// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import  VueLazyLoad from 'vue-lazyload'
import './mock/mockServer/mockServer'
import loading from './common/imgs/loading.gif'
import './filters'

Vue.component(Button.name,Button);
Vue.config.productionTip = false
Vue.use(VueLazyLoad,{ //内部自定义指令 :src换成v-lazy
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
