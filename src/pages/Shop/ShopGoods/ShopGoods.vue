<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item " @click="clickMenuItem(index)" :class="{current:index==currentIndex}" v-for="(good,index) in goods" :key="index">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
                {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUI">
          <li class="food-list-hook " v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(item,index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="item.image">
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{item.sellCount}} 份</span>
                    <span>好评率 {{item.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{item.price}}</span>
                    <span class="old" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    CartControl
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
    export default {
        name: "shop-goods",
        mounted(){
          this.$store.dispatch('getShopGoods', () => {// goods 更新了, 界面还没有更新
            this.$nextTick(() => {
              this._initScroll();
              this._initTops();
            })
          })

        },
        computed:{
          ...mapState(['goods']),
          currentIndex(){
            //计算得到当前分类下标
            let index = -2;
            const scrolly = this.scrolly;
            const tops = this.tops;
            for(let i=0;i<tops.length;i++){
              index++;
              if(scrolly<tops[i]){
                break;
              }
            }
            return index;
          }
        },
      data(){
          return{
            scrolly:0, //右侧滑动Y轴的坐标
            tops:[], //右侧分类li的top组成的数组
          }
      },
      methods:{
        clickMenuItem(index){
          const y = this.tops[index];
          this.scrolly = y; //先更新右侧菜单栏,再滑动
          this.foodScrool.scrollTo(0,-y,300);
        },
          //初始化组件的滑动,并且得到元素滑动的位置
          _initScroll(){
            new BScroll('.menu-wrapper',{

            });
            this.foodScrool = new BScroll('.foods-wrapper',{
              probeType:2
            });
            this.foodScrool.on('scroll',({x,y})=>{
              this.scrolly = Math.abs(y);
            });

            this.foodScrool.on('scrollEnd',({x,y})=>{
              this.scrolly = Math.abs(y);
            });
          },
        //初始化元素大块(食物类别)的高度
        _initTops(){
            //初始化
          const tops = [];
          let top = 0;
          tops.push(top);
          //找到所有分类的li
          const lis = this.$refs.foodsUI.getElementsByClassName("food-list-hook");
          //收集
          Array.prototype.slice.call(lis).forEach((i)=>{
            top+=i.clientHeight;
            tops.push(top);
          });
          //更新
          this.tops = tops;
        },
      },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
