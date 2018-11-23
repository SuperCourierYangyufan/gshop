# vue
### 1. import导入模块时候 需要使用相对路径./....
  * 或者可以在build/webpack.base.conf.js下  `"components": resolve('src/components')`就可以不需要相对路径
  
### 2. 进行模块路由
  1. `<router-link tag="路由后这个路由形成什么(div)" to="到那个路由模块(/search)">`
  2. `<router-view></router-view>` //路由模块显示内容
  3. this.$router.replace(path) //跳转路由
  4. $router.back() 返回上级路由
  5. $route.path可以获得当前页面路由路径,可以在选择为该路由时高亮显示图标`:class="{on: '/search'===$route.path}"`
  6. 可以在route中给每个路由配置一个属性值`meta:{key:value}`用来判断一些问题
### 3. stylus
  1. cnpm install stylus stylus-loader --save-dev
  2. `<style lang="stylus" rel="stylesheet/stylus>`
### 4. 滑动组件swiper
  1. cnpm install --save swiper
  2. 在使用的组件上引入
    `````````
        import Swiper from 'swiper'
        import 'swiper/dist/css/swiper.min.css'
    ```
  3. https://www.swiper.com.cn/usage/index.html
  4. 在vue的mounted(){new一个Swiper}
### 5. axios方法使用
  1. 封装的ajax方法
      ```
          import axios from 'axios'
          export default function ajax(url,data={},type='GET') {
            return new Promise(function (resolve,reject) {
              //执行异步请求
              let promise;
              if(type === 'GET'){
                let dataStr = '';
                Object.keys(data).forEach(key=>{
                  dataStr+=key+'='+data[key]+'&'
                });
                if(dataStr !== ''){
                  dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'));
                  url = url+'?'+dataStr;
                }
                promise = axios.get(url);
              }else{
                promise = axios.post(url,data);
              }
              promise.then(function (response) {
                //成功调用resolve
                resolve(response.data)
              }).catch(function (error) {
                //失败调用reject
                reject(error)
              });
            });
          }
      ```
  2. 封装请求函数
     跨域伪装(config/index.js)
      ```
        proxyTable: {
              '/api': { // 匹配所有以 '/api'开头的请求路径
                target: 'http://localhost:4000', // 代理目标的基础路径
                changeOrigin: true, // 支持跨域
                pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
                  '^/api': ''
                }
              }
            },
      ```  
      导入与跨域  
        ``` 
        import ajax from "./ajax" //导入
        const BASE_URL = '/api' //跨域伪装前缀
        ```  
      
      函数封装
    
      ``` 
        export const 函数名 = (参数) =>ajax(BASE_URL+'/地址/${参数}',{参数名:参数});
      ```
  3. vue里面使用  
      ``` 
       import {函数名} from "路径"
       .....
        async mounted(){     //async
             const result = await reqFoodTypes(); //await
          }
      ```
### 6.  Vuex
1.  基本使用
      ``` 
        import Vue from 'vue';
        import Vuex from 'vuex';
        
        Vue.use(Vuex)
        
        const state = {
          count: 1
        }
        
        const mutations = {
          add(state,num) {
            state.count++
          },
        }
        
        const actions = {
          add: ({commit},num) => {
            commit('add')
          },
        }
        
        export default new Vuex.Store({state, mutations, actions})
      ```
2. main.js引入`import store from './store'`
3. store文件夹操作(模块化_异步操作ajax)
  * 主文件store.js
    ``` 
      //格式完全固定
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

    ```
  * state.js(共有数据)
    ```
      export default{
        address: {},//地址
        对象名:对象值
        。。。
      }
    ```
  * mutations-type.js(完全一样)
    ``` 
      //export const RECEIVE_对象名大写 = receive_对象名小写
      export const RECEIVE_ADDRESS = 'receive_address' // 接收地址
    ```
  * mutations.js(对store的直接操作)
    ```  
    //import导入的为 RECEIVE_对象名大写
    //{这里面为state里面定义的值}
      import {
        RECEIVE_ADDRESS, 
      } from "./mutations-type";
      
      export default {
        [RECEIVE_ADDRESS](state,{address}){
          state.address = address;
        },
      }
    ```
  * action.js
  * 注意async,await
  * 方法参数commit,state均在大括号内,若有其他外部参数则在大括号外
   ```
    import {
      RECEIVE_ADDRESS,
    } from "./mutations-type";
    //这里导入的为函数封装 
    import {
      reqAddress
    } from '../api'
    export default{
      async getAddress({commit, state}) { 
        // 发送异步ajax请求
        const geohash = state.值1 + ',' + state.值2 //获取state的值
        const result = await reqAddress(geohash) //await
        // 提交一个mutation
        if (result.code === 0) {
          const address = result.data //这个名字与state里面的值最好一样
          commit(RECEIVE_ADDRESS, {address}) //mutations-typ和store的值
        }
      },
    }

   ```
  * 使用
    1. 第一个为方法名,第二个为可传入参数
      ``` 
         mounted(){
              this.$store.dispatch('add',10);
         },
      ```
    2. 常用
      ```  
       import {mapActions} from 'vuex'
       
          mounted(){
              this.getAddress()
            },
            methods:{
              ...mapActions(['getAddress']),
            },
      ```
 
