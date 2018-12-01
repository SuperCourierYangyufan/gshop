//基于state的计算属性
export default {
  totalCount(state){
    return state.cartFoods.reduce((total,food)=>total+food.count,0);
  },

  totalPrice(state){
    return state.cartFoods.reduce((total,food)=>total+food.price*food.count,0);
  },

  positiveSize(state){
    return state.ratings.reduce((total,rating)=>total+(rating.rateType===0?1:0),0);
  }
}
