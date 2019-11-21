<template>
  <div class="container">
    <!-- 标题 -->
    <h1 class="blogTitle">" 服务端渲染(Universal/Isomorphic)之React"</h1>
    <!-- 阅读信息 -->
    <div class="viewInfo">
      <div>阅读 <span>1823</span></div>
      <div> . 评论 <span>101</span></div>
      <div> . 喜欢 <span>22</span></div>
    </div>

    <!-- 内容 -->

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

  h1 {
    font-size: 36px;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 18px;
  }
  h5 {
    font-size: 14px;
  }
  h6 {
    font-size: 12px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
  }
  p {
    margin: 0 0 10px;
  }

  .blogTitle {
    word-break: break-all;
    font-size: 2.2em;
    font-weight: bold;
    line-height: 1.5;
    color: #555;
  }

  .viewInfo {
    font-size: 13.4px;
    display: flex;
  }

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

    color: #555;
    font-size: 14px;

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


