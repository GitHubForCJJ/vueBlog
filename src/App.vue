<template>
  <div id="app">
    <div class="blogApp">
      <div class="aside">
        <div class="top">
          <div class="flag"
               @click="goHome">
            Chen
          </div>
        </div>
        <div class="bottom">

          <div class="item"
               v-if="isOrNotLogin">
            <router-link :to="{name:'updatemember'}"><a href="javascript:"
                 title='点击查看信息、退出操作'> 
                 <i v-if='headicon.length===0' class="iconFont"
                   style="color:#d96f5d;">&#xe501;</i>

                 <van-image v-else width="30" height="30" fit='cover' round lazy-load :src='headicon'/>
                  </a></router-link>
          </div>
          <div class="item"
               v-else>
            <router-link :to="{name:'login'}"><a href="javascript:"
                 title='点击登录'> <i class="iconFont">&#xe501;</i></a>
                 
                 </router-link>
          </div>

          <div class="item"> <a target="_blank"
               title='博主的git'
               href="https://github.com/GitHubForCJJ"><i class="iconFont git">&#xe606;</i></a></div>

        </div>
      </div>
      <div class="mainApp"
           id="mainApp">
        <!-- main  -->
        <div class="main">
          <router-view id="cnt"></router-view>
          <!-- 友情链接 鸣谢 -->
          <div class="tanks">
            感谢
            <a target="_blank"
               href="http://vue.jackhu.top">JackHu</a>支持
          </div>
          <!-- 备案信息 -->
          <footer>©2018 /蜀ICP备18005286号-1 </footer>
        </div>
        <!-- 回到顶部 -->
        <div v-if="isShow"
             @click='backTop'
             id="backtop">
          Top
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { isLogin,getMemberIcon } from '@/utils/core.js';
export default {
  name: 'app',
  data: function () {
    return {
      isOrNotLogin: false,
      isShow: false,
      scrollTop: 0,
      headicon:''
    };
  },
  components: {

  },
  created () {


  },

  mounted () {
    // window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('scroll', this.scrollToTop, true);
    this.isOrNotLogin = isLogin();
    this.headicon=getMemberIcon();
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop () {
      const that = this
      window.console.log("12")
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        // document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        document.getElementById("mainApp").scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this

      //这里是直接找到首页的  mainapp元素获取它的scrolltop距离
      let sTop = document.documentElement.scrollTop || document.body.scrollTop || document.getElementById("mainApp").scrollTop;
      that.scrollTop = sTop
      if (sTop > 150) {
        that.isShow = true
      } else {
        that.isShow = false
      }
    },
    //刷新登录状态
    refrshLogin (key) {
      window.console.log('run')
      if (key) {
        this.isOrNotLogin = true;
          this.headicon=getMemberIcon();
        return;
      }
      window.console.log(this.isOrNotLogin)
      this.isOrNotLogin = isLogin();
        this.headicon=getMemberIcon();
    }


  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop);
  }
}
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.flag {
  cursor: pointer;
}
.tanks {
  margin-top: 30px;
}
.mainApp {
  position: relative;
}
#backtop {
  position: fixed;
  bottom: 15px;
  right: 22px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #e78170;
}
</style>
