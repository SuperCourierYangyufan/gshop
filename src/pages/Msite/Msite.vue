<template>
    <section class="msite">
      <!--首页头部-->
      <header-top :title="address.name" >
        <span class="header_search" slot="search">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="login">
            <span class="header_login_text">登录|注册</span>
        </span>
      </header-top>
      <!--首页导航-->
      <nav class="msite_nav" >
        <div class="swiper-container" v-if="categoryArr.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys,index) in categoryArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                <div class="food_container">
                  <img :src="BASEIMG_URL+category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <shop-list></shop-list>
      </div>
    </section>
</template>

<script>
  import HeaderTop from "components/HeaderTop/HeaderTop.vue"
  import ShopList from "components/ShopList/ShopList"
  import Swiper from 'swiper'
  import {mapState} from 'vuex'
  import 'swiper/dist/css/swiper.min.css'
    export default {
      name: "msite",
      components:{
        HeaderTop,
        ShopList
      },
      watch:{
        categorys(newValue){
            //界面更新立即创建swiper对象
          this.$nextTick(()=>{
            new Swiper('.swiper-container',{ //第一个参数为主类名
              loop: true, // 循环轮播
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination', //为分页器的类名
              },
            });
          });
        }
      },
      methods:{
      },
      data(){
        return{
          BASEIMG_URL:'https://fuss10.elemecdn.com',
        }
      },
      mounted(){
        this.$store.dispatch('getFoodTypes');
        this.$store.dispatch('getShopList');
      },
      computed:{
        ...mapState(['address','categorys']),
        //根据categorys一位数组改为二维数组
        categoryArr(){
          const categorys = this.categorys;
          //准备空的二维数组
          let arr = [];
          let minArr = [];
          categorys.forEach(i =>{
            if(minArr.length === 8 ){
              minArr = [];
            };
            if(minArr.length === 0){
              //第一次执行循环就会将这个空数组添加到主数组中
              arr.push(minArr);
            };
            minArr.push(i);
          });
          return arr;
        },
      },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
