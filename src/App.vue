<template>
  <div id="app">
    <div class="blogapp">
      <div class="aside">aside</div>
      <div class="mainapp">
        <div class="main">
          <router-view></router-view>
          <!-- 备案信息 -->
          <footer>©2015 /蜀ICP备18005286号-1</footer>
        </div>
      </div>

      <!-- <el-container class="elcon">
        <el-aside class="aside"
                  width='45px'>Aside
        </el-aside>
        <el-main>
          <div class="main">
            <router-view></router-view>
          </div>

        </el-main>
      </el-container> -->
    </div>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

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
