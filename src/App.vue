<template>
  <div id="app">
    <div class="blogapp">
      <el-container class="elcon">
        <el-aside class="aside"
                  width='45px'>Aside</el-aside>
        <el-main :span="7"
                 :offset="3"
                 class="main"><img alt="Vue logo"
               src="./assets/logo.png"></el-main>
      </el-container>
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
