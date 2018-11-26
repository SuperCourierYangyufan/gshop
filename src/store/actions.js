//间接更新state
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
} from "./mutations-type";

import {
  reqFoodTypes,
  reqShopList,
  reqAddress,
  reqUserInfo,
  reqLogout
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

  //同步记录用户信息
    recordUser({commit},userInfo){
      commit(RECEIVE_USER_INFO,{userInfo});
    },

  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo();
    if(result.code === 0){
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },

  async logout({commit}){
    const result = await reqLogout();
    if(result.code === 0){
      commit(RESET_USER_INFO);
    }
  }
}
