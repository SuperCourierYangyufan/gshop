import Mock from 'mockjs';
import data from '../data.json'

//返回goods的接口
Mock.mock('/shop_goods',{
  "code":0,
  "data":data.goods
})
//返回ratings
Mock.mock('/shop_ratings',{
  "code":0,
  "data":data.ratings
})
//info
Mock.mock('/shop_info',{
  "code":0,
  "data":data.info
})


