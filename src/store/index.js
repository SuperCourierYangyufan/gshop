//store对象管理
import Vue from "vue";
import Vuex from "vuex";
import state from './store';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);
export default new Vuex.Store({
  state, //状态,初始化
  mutations, //包含多个更新state的函数
  actions, //包含多个对应事件回调函数
  getters, //包含多个计算属性函数,计算属性,computed
});


