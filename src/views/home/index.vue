<template>
  <div>
    <!-- 分类列表 -->
    <ul class="typeCont">
      <li>
        <a href="javascript:;"
           v-if='blogType==0'
           @click="chooseType(0)"
           class="active">All</a>
        <a href="javascript:;"
           @click="chooseType(0)"
           v-else>All</a>
      </li>

      <li v-for="item in typeList"
          @click="chooseType(item.KID)"
          :key="item.KID">
        <a href="javascript:;"
           v-if='item.KID==blogType'
           class="active">{{item.Name}}</a>
        <a href="javascript:;"
           v-else>{{item.Name}}</a>
      </li>
    </ul>
    <!-- 博客list -->
    <ul class="blogCont">

      <li class="blogItem"
          v-for="item in blogList"
          :key="item.BlogNum"
          :title="item.Title"
          @click="goDetail(item.BlogNum)">
        <div>
          <div class="itemTop">
            <span class="time">{{item.CreateTime}}</span>
          </div>
          <h4 class="itemTitle">
            <span class="">
              {{item.Title}}
            </span>
          </h4>
          <div class="itemFooter">
            <span>阅读 {{item.Views}}</span>
            <span> . 评论 {{item.Comments}}</span>
            <span> . 喜欢 {{item.Start}}</span>
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

    </ul>

  </div>
</template>

<script>
import blog from '@/api/blog.js';
import { Message } from 'element-ui';
export default {
  name: 'home',
  data () {
    return {

      blogList: [],
      //所有类型
      typeList: [],
      //当前选中的类型
      blogType: 0,
      page: 1,
      limit: 10,

    }

  },
  created () {
    this.getListBlog(this.blogType, this.page, this.limit);
    this.getTypeList();
    var url = window.location.href;
    //设置默认的跳转地址
    localStorage.setItem('redirurl', url);
  },
  methods: {
    goDetail (blogNum) {
      this.$router.push({ path: '/blog', query: { a: blogNum, t: this.blogType } });
    },
    getListBlog (type, page, limit) {

      blog.getListBlog(type, page, limit).then((res) => {
        window.console.log(res);
        if (res.Code == 0) {
          for (var i in res.Data) {
            var time = this.timeAgo(res.Data[i].CreateTime);
            res.Data[i].CreateTime = time;
            this.blogList.push(res.Data[i]);
          }
          this.blogList = res.Data;
        }
        else {
          Message.success({ mesage: "err" })
        }

      });

    },
    getTypeList () {

      blog.getBlogTypeList().then((res) => {
        window.console.log(res);
        if (res.Code == 0) {
          this.typeList = res.Data;
        }

      });

    },
    chooseType (type) {
      // Message.success({ message: type })
      this.blogType = type;
      this.getListBlog(type, 1, this.limit);

    },
    timeAgo (dateTime) {
      //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
      var dateTimeStamp = "";
      var data = new Date(Date.parse(dateTime.replace(/-/g, "/")));
      dateTimeStamp = data.getTime();
      var minute = 1000 * 60;//把分，时，天，周，半个月，一个月用毫秒表示
      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      //var halfamonth=day*15;
      var month = day * 30;
      var result = "";

      var now = new Date().getTime();//获取当前时间毫秒
      var diffValue = now - dateTimeStamp;//时间差

      if (diffValue < 0) { return; }

      var minC = diffValue / minute;//计算时间差的分，时，天，周，月
      var hourC = diffValue / hour;
      var dayC = diffValue / day;
      var weekC = diffValue / week;
      var monthC = diffValue / month;

      if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
      }
      else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
      }
      else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
      }
      else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
      }
      else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
      } else
        result = "刚刚";
      return result;
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
