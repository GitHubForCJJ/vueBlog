<template>
  <div class="container">
    <div class="commentTop">
      <div> {{ commentList.length || 0 }}条评论</div>
      <div>添加评论</div>
    </div>

    <div class="commentList">
      <div class="commentItme"
           v-for="(item,index) in commentList"
           :key="index">
        <div class="itemTop">
          <img :src="item.Avatar || defaultAvatar"
               alt="头像">
          <div>
            <div class="name">{{item.MemberName}}</div>
            <div class="time">{{item.CreateTime}}</div>
          </div>
        </div>
        <p class="itemContent"><a href="#"
             @click="showReply(index,item.MemberName)">回复</a></p>
        <div class="itemReplayList">
          <Reply :replyList='item.Replys'
                 :user="true"
                 :parentIndex="index"></Reply>
          <!-- 子回复 -->
          <form class="hide"
                v-bind:id="'replyForm'+index">
            <textarea name=""
                      v-bind:id="'replyContent' +index"
                      maxlength="500"
                      cols="30"
                      rows="10"></textarea>
            <div>
              <el-button type="primary"
                         @click.prevent="submitReply(index,item.Memberid)">发表</el-button>
            </div>
          </form>
        </div>
      </div>

      <!-- <div class="commentItme">
        <div class="itemTop">
          <img :src="defaultAvatar"
               alt="头像">
          <div>
            <div class="name">Rodman</div>
            <div class="time">2019-02-03 03:12:23</div>
          </div>
        </div>
        <p class="itemContent">wowowowo NICE！！！ <a href="#">回复</a></p>
        <div class="itemReplayList">
          <Reply :replyList='commentList'
                 :user="true"></Reply>
          <form action=""></form>
        </div>
      </div> -->
    </div>

    <!-- 写新评论 -->
    <div v-if="user"
         class="bottom">
      <textarea name=""
                id=""
                maxlength="500"
                cols="30"
                rows="10"></textarea>
      <div>
        <el-button type="primary"
                   @click.prevent="">发表</el-button>
      </div>
    </div>
    <div v-else
         class="bottom">登录后评论</div>
  </div>
</template>

<script>

import blog from '@/api/blog.js';
import Reply from '../blog/reply';
import DefaultAvatar from '../../assets/logo.png';

export default {
  name: 'Comment',
  props: ['user', "blogNumTran"],
  components: { Reply },
  data () {
    return {
      blogNum: "",
      commentList: [],
      defaultAvatar: DefaultAvatar
    }
  },
  created () {
    this.blogNum = this.blogNumTran;
    this.getComments();
  },
  methods: {
    //获取评论列表
    getComments () {
      blog.getComments(this.blogNum).then((res) => {
        window.console.log(res)
        for (var i in res.Data) {
          this.commentList.push(res.Data[i])
        }
      }).catch()
    },
    //展示回复框
    showReply (index, nickname) {
      window.console.log("父", index, nickname);
      const form = document.getElementById('replyForm' + index);
      const formTextArea = form.getElementsByTagName('textarea')[0]
      if (form.className.indexOf('hide') > -1) {
        form.className = ' '
        formTextArea.focus()
        formTextArea.value = '@' + nickname + ' '
      } else {
        form.className += ' hide';
      }

    },
    //当前用户给别人评论，tomemid=0为自己写的评论
    submitReply (index, tomemid) {
      //const form = document.getElementById('replyForm' + index);
      const formTextArea = document.getElementById('replyContent' + index);

      window.console.log(formTextArea.value, tomemid);
    }

  },
};
</script>


<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  color: #555;

  .hide {
    display: none;
  }

  .commentTop {
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    align-items: center;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    margin-bottom: 20px;
  }

  .commentList {
    width: 100%;

    box-sizing: border-box;

    a {
      float: right;
      color: #999;
      font-size: 12px;
    }

    .commentItme {
      margin-top: 20px;
      padding-bottom: 30px;
      border-bottom: 1px solid #d9d9d9;

      .itemTop {
        padding-top: 10px;
        margin: 0 0 10px;
        width: 100%;
        display: flex;

        img {
          width: 35px;
          height: 35px;
          vertical-align: middle;
          margin-right: 13px;
        }
        .name {
          color: #4094c7;
          font-size: 14px;
        }
        .time {
          font-size: 12px;
          margin-top: 5px;
        }
      }
      .itemContent {
        word-break: break-all;
        word-wrap: break-word;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 30px;
      }
      .itemReplayList form {
        margin-top: 25px;
        padding: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
      }
    }
  }

  .bottom {
    margin-top: 40px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }
  textarea {
    width: 100%;
    height: 78px;
    padding: 0;
    margin: 0;
    border: none;
    resize: none;
    overflow: auto;
    outline: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font: inherit;
    color: inherit;
    font-size: 14px;
  }
}
</style>