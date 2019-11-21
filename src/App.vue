<template>
  <div id="app">
    <div class="blogapp">
      <div class="aside">
        <div class="top">

        </div>
        <div class="bottom">
          <div class="item"> <img src="./assets/icons/login1.png"
                 alt="登录"></div>
          <div class="item"> <img src="./assets/icons/sun.png"
                 alt="白天"></div>
          <div class="item"> <img src="./assets/icons/moon.png"
                 alt="黑夜"></div>

        </div>
      </div>
      <div class="mainapp">
        <div class="main">
          <router-view></router-view>
          <!-- 备案信息 -->
          <footer>©2018 /蜀ICP备18005286号-1</footer>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

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
