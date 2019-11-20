<template>
  <div class="container">
    <!-- 评论 -->
    <div class="articleLike">
      <div class="likeTitle">喜欢</div>
      <div class="likeCount">15</div>
    </div>

    <!-- 上下篇文章 -->
    <div class="prenext">
      <div class="prev">上一篇：<span class="prevTitle">docker + rancher + jenkins 实现集成测试和自动部署(CI/CD)
        </span></div>
      <div class="next">下一篇：<span class="nextTitle">docker 实践杂记</span></div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  padding-top: 30px;

  pre {
    background-color: #fae5e2;
    color: #d96f5d;

    word-wrap: normal;
    word-break: normal;

    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

  .articleLike {
    margin-top: 50px;
    margin-bottom: 40px;
    width: 160px;
    height: 50px;
    position: relative;
    color: #e78170;

    border: 1px solid #e78170;
    -moz-border-radius: 40px;
    -webkit-border-radius: 40px;
    border-radius: 40px;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    overflow: hidden;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;

    .likeTitle {
      display: inline-block;
      position: absolute;
      left: 0;
      width: 70%;
      line-height: 50px;
      vertical-align: middle;
      padding-right: 10px;
    }

    .likeCount {
      display: inline-block;
      position: absolute;
      right: 0;
      width: 30%;
      line-height: 50px;
      vertical-align: middle;
      border-left: 1px solid;
    }
  }

  .prenext {
    margin-bottom: 40px;
    width: 100%;
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #555;

    .prev {
      //width: 45%;
      max-width: 50%;
      overflow: hidden;
      height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .next {
      //width: 45%;
      overflow: hidden;
      text-align: right;
      height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>

<script>
export default {
  name: 'blog',
  data () {
    return {
      id: null//博客id
    }

  },
  created () {
    window.console.log('1');
    const params = this.$route.query;
    this.id = params.blogId;
    window.console.log(params.blogId);
  },
  mounted () {

  },
  methods: {
    getBlogDetails () {
      //var id = this.id;
    }
  }
}
</script>


