//包含N个接口请求函数模块
import ajax from "./ajax"

const BASE_URL = '/api'

//根据经纬度获取位置详情
export const reqAddress = (geohash) =>ajax(BASE_URL+`/position/${geohash}`);
//获取食物分类列表
export const reqFoodTypes = () =>ajax(BASE_URL+'/index_category');
//获取商品列表
export const reqShopList = (latitude,longitude) =>ajax(BASE_URL+'/shops',{latitude:latitude,longitude:longitude});
