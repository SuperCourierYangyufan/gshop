//间接更新state
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from "./mutations-type";

import {
  reqFoodTypes,
  reqShopList,
  reqAddress
} from '../api'
export default{
  async getAddress({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  async getFoodTypes({commit}){
    //发送异步ajax
    const result = await reqFoodTypes();
    //提交
    if(result.code ===0 ){
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS,{categorys});
    }
  },

  async getShopList({commit,state}){
    //发送异步ajax
    const result = await reqShopList(state.latitude,state.longitude);
    //提交
    if(result.code ===0 ){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops});
    }
  },
  add:({commit},num)=>{
    commit('add',num);
  },
}
