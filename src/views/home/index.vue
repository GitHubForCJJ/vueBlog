<template>
  <div>
    <!-- 分类列表 -->
    <ul class="typeCont">
      <li>
        <a href="javascript:;"
           class="active">最新</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">热门</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">框架</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">数据库</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">服务器</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">vue</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">工具</a>
      </li>

      <li>
        <a href="javascript:;"
           class="">热门</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">框架</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">数据库</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">服务器</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">vue</a>
      </li>
      <li>
        <a href="javascript:;"
           class="">工具</a>
      </li>

    </ul>
    <!-- 博客list -->
    <ul class="blogCont">

      <li class="blogItem"
          @click="goDetail(1)">
        <div>
          <div class="itemTop">
            <span class="time">3天前</span>
          </div>
          <h4 class="itemTitle">
            <span class="">
              使用docker一键启动jackblog的所有版本
            </span>
          </h4>
          <div class="itemFooter">
            <span>阅读 18811</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>
      </li>

      <li class="blogItem"
          @click="goDetail(2)">
        <div>
          <div class="itemTop">
            <span class="time">4天前</span>
          </div>
          <div class="itemTitle">
            <span class="">.net core3下的webapi附加到进程方法</span>
          </div>
          <div class="itemFooter">
            <span>阅读 311</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>

      </li>

      <li class="blogItem"
          @click="goDetail(3)">
        <div>
          <div class="itemTop">
            <span class="time">3天前</span>
          </div>
          <h4 class="itemTitle">
            <span class="">
              使用docker一键启动jackblog的所有版本
            </span>
          </h4>
          <div class="itemFooter">
            <span>阅读 18811</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>

      </li>

      <li class="blogItem"
          @click="goDetail(1)">
        <div>
          <div class="itemTop">
            <span class="time">3天前</span>
          </div>
          <h4 class="itemTitle">
            <span class="">
              使用docker一键启动jackblog的所有版本
            </span>
          </h4>
          <div class="itemFooter">
            <span>阅读 18811</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>
      </li>

      <li class="blogItem"
          @click="goDetail(2)">
        <div>
          <div class="itemTop">
            <span class="time">4天前</span>
          </div>
          <div class="itemTitle">
            <span class="">.net core3下的webapi附加到进程方法</span>
          </div>
          <div class="itemFooter">
            <span>阅读 311</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>

      </li>

      <li class="blogItem"
          @click="goDetail(3)">
        <div>
          <div class="itemTop">
            <span class="time">3天前</span>
          </div>
          <h4 class="itemTitle">
            <span class="">
              使用docker一键启动jackblog的所有版本
            </span>
          </h4>
          <div class="itemFooter">
            <span>阅读 18811</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>

      </li>

      <li class="blogItem"
          @click="goDetail(1)">
        <div>
          <div class="itemTop">
            <span class="time">3天前</span>
          </div>
          <h4 class="itemTitle">
            <span class="">
              使用docker一键启动jackblog的所有版本
            </span>
          </h4>
          <div class="itemFooter">
            <span>阅读 18811</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>
      </li>

      <li class="blogItem"
          @click="goDetail(2)">
        <div>
          <div class="itemTop">
            <span class="time">4天前</span>
          </div>
          <div class="itemTitle">
            <span class="">.net core3下的webapi附加到进程方法</span>
          </div>
          <div class="itemFooter">
            <span>阅读 311</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>

      </li>

      <li class="blogItem"
          @click="goDetail(3)">
        <div>
          <div class="itemTop">
            <span class="time">3天前</span>
          </div>
          <h4 class="itemTitle">
            <span class="">
              使用docker一键启动jackblog的所有版本
            </span>
          </h4>
          <div class="itemFooter">
            <span>阅读 18811</span>
            <span> . 评论 101</span>
            <span> . 喜欢 22</span>
          </div>
        </div>

      </li>

    </ul>

  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }

  },
  methods: {
    goDetail (blogid) {
      this.$router.push({ path: '/blog', query: { blogId: blogid } });
    }
  }
}
</script>

<style lang="less" scoped>
.typeCont {
  list-style-type: none;
  padding: 0;

  li {
    display: inline-block;

    margin: 10px 15px 5px 0;
    line-height: 1.5em;

    a {
      padding: 5px 10px;
      border-width: 1px;
      border-style: solid;
      -moz-border-radius: 14px;
      -webkit-border-radius: 14px;
      border-radius: 14px;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 1.5em;
      text-decoration: none;
      color: #999;
    }

    .active {
      color: white;
      border-color: #e78170;
      background-color: #e78170;
    }
  }
}

.blogCont {
  list-style-type: none;
  padding: 0;
  margin-top: 35px;

  .blogItem {
    display: list-item;
    width: 100%;
    padding-right: 2px;
    padding-bottom: 17px;

    margin-bottom: 17px;
    border-bottom-width: 1px;
    border-bottom-style: dashed;
    border-color: #d9d9d9;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    word-wrap: break-word;
    line-height: 1.5em;

    .itemTop {
      padding: 15px 0 10px 0;
      font-size: 12px;
    }

    .itemTitle {
      margin-right: 10px;
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;
      color: #555;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .itemFooter {
      font-size: 12px;
      line-height: 1.5;
    }
  }
}
</style>
