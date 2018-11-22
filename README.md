# vue
1. import导入模块时候 需要使用相对路径./....
  * 或者可以在build/webpack.base.conf.js下  `"components": resolve('src/components')`就可以不需要相对路径
2. 进行模块路由后
  1.  <router-link tag="路由后这个路由形成什么(div)" to="到那个路由模块(/search)">
  2.  <router-view></router-view> //路由模块显示内容
3. stylus
  1. cnpm install stylus stylus-loader --save-dev
  2. <style lang="stylus" rel="stylesheet/stylus>
4. $route.path可以获得当前页面路由路径,可以在选择为该路由时高亮显示图标`:class="{on: '/search'===$route.path}"`
5. this.$router.replace(path) //跳转路由
6. 滑动组件swiper
  1. cnpm install --save swiper
  2. 在使用的组件上引入
    `````````
        import Swiper from 'swiper'
        import 'swiper/dist/css/swiper.min.css'
    ```
  3. https://www.swiper.com.cn/usage/index.html
  4. 在vue的mounted(){new一个Swiper}
7. $router.back() 返回上级路由
  
