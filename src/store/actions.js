//间接更新state
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_CART
} from "./mutations-type";

import {
  reqFoodTypes,
  reqShopList,
  reqAddress,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRating,
  reqShopGoods
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
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({commit},callback) {
    const result = await reqShopRating()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
    callback&&callback();
  },


  // 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      //数据已经更新,执行回调的函数,&&放置没有传东西
      callback && callback()
    }
  },

  updataFoodCount({commit},{isAdd,food}){
      if(isAdd){
        commit(INCREMENT_FOOD_COUNT,{food})
      }else {
        commit(DECREMENT_FOOD_COUNT,{food})
      }
  },

  clearCart({commit}){
      commit(CLEAR_CART);
  }
}
