//包含N个接口请求函数模块
import ajax from "./ajax"

const BASE_URL = '/api'

//根据经纬度获取位置详情
export const reqAddress = (geohash) =>ajax(BASE_URL+`/position/${geohash}`);
//获取食物分类列表
export const reqFoodTypes = () =>ajax(BASE_URL+'/index_category');
//获取商品列表
export const reqShopList = (latitude,longitude) =>ajax(BASE_URL+'/shops',{latitude,longitude});
//用户名密码登入
export const reqPwdLogin = ({name:name,pwd:pwd,captcha:captcha}) => ajax(BASE_URL+'/login_pwd',{name:name,pwd:pwd,captcha:captcha},'POST');
//发送短信验证码
export const reqSendCode = (phone)=> ajax(BASE_URL+'/sendcode',{phone:phone});
//手机号验证码登入
export const reqSms = (phone,code)=> ajax(BASE_URL+'/login_sms',{phone:phone,code:code},'POST');
//获取用户信息
export const reqUserInfo = ()=> ajax(BASE_URL+'/userinfo');
//用户登出
export const reqLogout = ()=> ajax(BASE_URL+'/logout');
//根据经纬度搜索商铺列表
export const reqsearchShops = (geohash,keyword) =>ajax(BASE_URL+'/search_shops',{geohash,keyword});
//获取商家信息
export const reqShopInfo = ()=>ajax('/shop_info')
//获取商家评价数组
export const reqShopRating = ()=>ajax('/shop_ratings')
//获取商家数组
export const reqShopGoods =()=>ajax('/shop_goods')

