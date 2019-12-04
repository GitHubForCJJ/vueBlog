<template>
  <div id="app">
    <div class="blogApp">
      <div class="aside">
        <div class="top">
          <div class="flag">
            Chen
          </div>
        </div>
        <div class="bottom">
          <div class="item"> <i class="iconFont">&#xe699;</i></div>
          <!-- <div class="item"> <i class="iconFont">&#xe69a;</i></div> -->
          <!-- <div class="item"> <i class="iconFont login">&#xe501;</i></div> -->
          <div class="item">
            <router-link :to="{name:'login'}"><a href="javascript:"> <i class="iconFont">&#xe501;</i></a></router-link>
          </div>
          <div class="item"> <a target="_blank"
               href="https://github.com/GitHubForCJJ/vueBlog"><i class="iconFont git">&#xe606;</i></a></div>

        </div>
      </div>
      <div class="mainApp">
        <div class="main">
          <router-view></router-view>
          <!-- 备案信息 -->
          <footer>©2018 /蜀ICP备18005286号-1 </footer>
        </div>
        <!-- 回到顶部 -->
        <!-- <div class="backTop"
             @click="backTop"
             v-if="showBackTop">
          <a href="javascript:"> <i class="iconFont top">&#xe609;</i></a>
        </div> -->

        <el-backtop target=".mainApp"
                    :bottom="100">
          <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #e78170;
      }">
            UP
          </div>
        </el-backtop>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  data: function () {
    return {


    };
  },
  components: {

  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    handleScroll (e) {

      var scTop = e.target.scrollTop;
      if (scTop > 100) {
        this.showBackTop = true;
      }
      else {
        this.showBackTop = false;
      }

    },
    backTop () {

    }

  },
  destroyed () {
    // window.removeEventListener('scroll', this.scrollToTop);
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
</style>
