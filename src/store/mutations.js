//直接更新state对象方法
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_CART
} from "./mutations-type";

export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address;
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys;
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops;
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
      state.userInfo = userInfo;
  },
  [RESET_USER_INFO](state){
    state.userInfo = {};
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods;
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings;
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info;
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){
      Vue.set(food,'count',1) //让新增的属性也有数据绑定
      state.cartFoods.push(food);
    }else {
      food.count++;
    }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--;
      if(food.count===0){
        //移除cartFood中的food
        state.cartFoods.splice(state.cartFoods.indexOf(food),1);
      }
    }
  },
  [CLEAR_CART](state){
    state.cartFoods.forEach((food)=>{
      food.count = 0;
    });

    state.cartFoods = [];
  }
}
