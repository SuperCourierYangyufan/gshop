<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">美团外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginType}" @click="loginType=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginType}" @click="loginType=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginType}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" @click.prevent="getCode" class="get_verification" :class="{right_phone:rightPhone}">
                {{computedTime===0?'获取验证码':`已发送${computedTime}S`}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册美团外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginType}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-if="!ShowPass" v-model="pwd">
                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button off"  :class="ShowPass?'on':'off'"  @click="ShowPass=!ShowPass">
                  <div class="switch_circle" :class="{right:ShowPass}"></div>
                  <span class="switch_text">{{ShowPass? '显示' : '' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="./images/captcha.svg" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip   :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/alertTip'
    export default {
        name: "login",
        data(){
          return{
            loginType:true,
            phone:'',
            computedTime:0, //计时时间
            ShowPass:false,//默认不显示密码,
            pwd:'',
            code:'',//验证码
            name:'',
            captcha:'', //滑块验证码
            alertText:'', //错误消息
            alertShow:false,
          }
        },
      components:{
          AlertTip,
      },
      computed:{
        rightPhone(){
          return /^1\d{10}$/.test(this.phone);
        },
      },
      methods:{
        getCode(){
          //如果当前没有计时器才触发
          if(this.computedTime===0){
            this.computedTime = 30;
            let clearIntervalId = setInterval(()=>{
              this.computedTime--;
              if(this.computedTime===0){
                clearInterval(clearIntervalId);
              }
            },1000);
          };
        },

        closeTip(){
          this.alertShow=false;
          this.alertText = '';
        },


        showAlert(alertText){
          this.alertText = alertText;
          this.alertShow=true;
        },

        login(){
          //前台表单验证
          if(this.loginType){ //短信登入
            if(!this.rightPhone){
              //手机号不正确
              this.showAlert('手机号不正确');
            }else if(!/^\d{6}$/.test(this.code)){
              //验证码必须为6位数
              this.showAlert('验证码必须为6位数');
            }
          }else{
          //验证码登入
            if(!this.name){
              //用户名必须指定
              this.showAlert('用户名必须指定');
            }else if(!this.pwd){
              this.showAlert('密码不能为空');
            }else if(!this.captcha){
                //验证码必须指定
              this.showAlert('验证码必须指定');
            }
          }
        },
      },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float left
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
