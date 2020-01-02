<template>
  <div class="container">
    <!-- 标题 -->
    <h1 class="blogTitle">"{{blogInfo.Title}}"</h1>
    <!-- 阅读信息 -->
    <div class="viewInfo">
      <div>阅读 <span>{{blogInfo.Views}}</span></div>
      <div> . 评论 <span>{{blogInfo.Comments}}</span></div>
      <div> . 喜欢 <span>{{blogInfo.Start}}</span></div>
    </div>

    <!-- 内容 -->
    <div class="blogContent"
         v-html="blogInfo.Content"></div>

    <!-- 点赞 -->
    <div class="articleLikeStart"
         v-if="isPraise"
         @click="goPraise()">
      <div class="likeTitle"><i class="iconFont">&#xe64c;</i> Start</div>
      <div class="likeCount">{{blogInfo.Start}}</div>
    </div>
    <div v-else
         class="articleLike"
         @click="goPraise()">
      <div class="likeTitle"><i class="iconFont">&#xe64c;</i> Start</div>
      <div class="likeCount">{{blogInfo.Start}}</div>
    </div>
    <!-- 上下篇 -->
    <div class="prenext">
      <div class="prev"
           @click="goPrenext(preBlog.BlogNum)"
           v-if="preBlog">上一篇：<span class="prevTitle">{{preBlog.Title}}
        </span></div>
      <div class="next"
           @click="goPrenext(nextBlog.BlogNum)"
           v-if="nextBlog">下一篇：<span class="nextTitle">{{nextBlog.Title}}</span></div>
    </div>

    <!-- 评论区 -->
    <Comment :blogNumTran="blogNum"></Comment>

  </div>
</template>

<script>

import blog from '@/api/blog.js';
import { Message } from 'element-ui';
import { getMemberid, isLogin, setRedirUrl } from '@/utils/core.js';
// import CommentArea from '@/components/CommentArea.vue';
import Comment from '../blog/comment';

export default {
  name: 'blog',
  data () {
    return {
      blogNum: '',//博客编号
      blogType: 0,
      blogInfo: {},
      preBlog: null,
      nextBlog: null,
      isPraise: false,//当前账户是否点赞
      isOrNotLogin: false,
      disabled: false,

    }

  },
  components: {
    Comment
  },
  created () {
    const params = this.$route.query;
    this.blogNum = params.a;
    this.blogType = params.t;
    var info = {};
    info.Num = this.blogNum;
    this.getBlogDetails(info);
    this.getPrenext();
    //查询是否点赞
    this.getIsOrPraise();

    this.isOrNotLogin = isLogin();

  },
  mounted () {

  },
  methods: {
    //获取详情
    getBlogDetails (obj) {
      //var id = this.id;
      blog.getItemBlog(obj).then((res) => {

        var content = decodeURI(res.Data.Content);
        res.Data.Content = content;
        this.blogInfo = res.Data;

      }).catch(() => {
        Message.warning({ message: "系统错误" })
      });

    },
    //获取上一下篇
    getPrenext () {
      var obj = {};
      obj.BlogNum = this.blogNum;
      obj.BlogType = this.blogType;
      blog.getPrenext(obj).then((res) => {
        window.console.log(res.Data);
        this.preBlog = null;
        this.nextBlog = null;

        if (res.Data.PreBlog != null) {
          this.preBlog = res.Data.PreBlog;
        }
        if (res.Data.NextBlog != null) {
          this.nextBlog = res.Data.NextBlog;
        }

      }).catch(() => {

      });
    },
    //点击上下篇链接
    goPrenext (blogNum) {
      var obj = {};
      obj.Num = blogNum;
      this.getBlogDetails(obj);
      this.blogNum = blogNum;
      this.getPrenext();
    },
    //点赞
    goPraise () {
      if (this.disabled) {
        window.console.log('nonon disabled');
      }
      else {

        this.disabled = true;
        var token = localStorage.getItem('token');
        window.console.log(token);
        if (token == undefined || token == '' || token.length == 0) {
          setRedirUrl();
          this.$router.push('/login');
          return;
        }

        if (this.isPraise) {
          this.blogInfo.Start = this.blogInfo.Start - 1;
        }
        else {
          this.blogInfo.Start = this.blogInfo.Start + 1;
        }
        this.isPraise = !this.isPraise;
        blog.addPraise(token, this.blogNum).then((res) => {
          window.console.log(res);
          this.disabled = false;
        }).catch((err) => {
          {
            window.console.log(err);
            this.disabled = false;
          }
        })
      }

    },
    //获取当前登录者是否点赞
    getIsOrPraise () {
      var memid = getMemberid();
      window.console.log(memid);
      if (memid == 0) {
        return;
      }
      blog.isOrNotPraise(memid, this.blogNum).then((res) => {
        window.console.log(res);
        this.isPraise = res.Data;
      }).catch((err) => {
        {
          window.console.log(err);
        }
      })
    },
  }
}
</script>


<style lang="less" scoped>
.container {
  width: 100%;

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
    padding-bottom: 10px;
  }

  .blogContent {
    overflow-x: auto;

    pre {
      background-color: #fae5e2;
      color: #d96f5d;
      word-wrap: normal;
      word-break: normal;
      margin-bottom: 20px;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
  }

  .articleLikeStart {
    margin-top: 50px;
    margin-bottom: 40px;
    width: 160px;
    height: 50px;
    position: relative;
    color: white;
    background-color: #e78170;
    cursor: pointer;

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

  .articleLike {
    margin-top: 50px;
    margin-bottom: 40px;
    width: 160px;
    height: 50px;
    position: relative;
    color: #e78170;
    cursor: pointer;

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
      cursor: pointer;
    }
    .next {
      //width: 45%;
      overflow: hidden;
      text-align: right;
      height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
       cursor: pointer;
    }
  }
}
</style>


