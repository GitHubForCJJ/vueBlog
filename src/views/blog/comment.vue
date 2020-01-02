<template>
  <div class="container">
    <div class="commentTop">
      <div> {{ commentList.length || 0 }}条评论</div>
      <div @click="goNewComment">添加评论</div>
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
        <p class="itemContent">{{item.Content}}<a href="#"
             @click="showReply(index,item.MemberName,item.Memberid)">回复</a></p>
        <div class="itemReplayList">
          <Reply v-if="item.Replys.length>0"
                 :replyList='item.Replys'
                 :user="true"
                 :parentIndex="index"></Reply>
          <!-- 子回复 -->
          <form v-if="user"
                v-bind:id="'replyForm'+index"
                class="hide">

            <textarea v-show="user"
                      name=""
                      v-bind:id="'replyContent' +index"
                      maxlength="500"
                      cols="30"
                      rows="10"></textarea>
            <div v-show="user">
              <el-button type="primary"
                         @click.prevent="submitReply(index,item.Commentid,item.Memberid)">发表</el-button>
            </div>

            <div v-show="!user"
                 class="hide login">
              <span class="loginBtn"
                    @click="goLogin">登录后评论</span>
            </div>

          </form>

        </div>
      </div>
    </div>

    <!-- 写新评论 -->
    <div v-if="user"
         class="bottom">
      <textarea name=""
                id="newcommenttextarea"
                ref="focusarea"
                maxlength="500"
                cols="30"
                rows="10"
                placeholder="留下你的足迹.."></textarea>
      <div>
        <el-button type="primary"
                   @click.prevent="submitReply(0,'',0)">发表</el-button>
      </div>
    </div>
    <div v-else
         class="login">
      <span class="loginBtn"
            @click="goLogin">登录后评论</span>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import blog from '@/api/blog.js';
import Reply from '../blog/reply';
import DefaultAvatar from '../../assets/logo.png';
import { getToken, getMember, setRedirUrl, isLogin } from '@/utils/core.js';

export default {
  name: 'Comment',
  props: ["blogNumTran"],
  components: { Reply },
  data () {
    return {
      user: false,
      blogNum: "",
      commentList: [],
      defaultAvatar: DefaultAvatar,
      toMemberid: 0,//存储评论别人时  别人的id
    }
  },
  created () {
    this.blogNum = this.blogNumTran;
    this.getComments();
    this.user = isLogin();
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
    showReply (index, nickname, tomemberid) {
      this.user = isLogin();
      const form = document.getElementById('replyForm' + index);
      window.console.log(index, nickname, tomemberid)
      window.console.log(form)
      if (this.user) {

        const formTextArea = form.getElementsByTagName('textarea')[0]
        if (form.className.indexOf('hide') > -1) {
          form.className = ' '
          formTextArea.focus();
          formTextArea.value = '@' + nickname + ' ';
          this.toMemberid = tomemberid;
        } else {
          form.className += ' hide';
          this.toMemberid = 0;
        }
      }


    },
    //当前用户给别人评论，tomemid=0为自己写的评论
    submitReply (index, sessionid) {
      if (sessionid == '') {
        var newcommenttext = document.getElementById('newcommenttextarea');
        if (newcommenttext.value.length == 0) {
          Message.warning({ message: '内容不能为空' });
          return;
        }
        this.addComment(newcommenttext.value, '')
        newcommenttext.value = '';
      }
      else {
        const form = document.getElementById('replyForm' + index);
        const formTextArea = document.getElementById('replyContent' + index);
        if (formTextArea.value.length == 0) {
          Message.warning({ message: '内容不能为空' });
          return;
        }
        this.addComment(formTextArea.value, sessionid);
        formTextArea.value = '';
        form.className += ' hide';
      }

    },
    //提交评论
    addComment (content, commentid) {
      var obj = {};
      obj.BlogNum = this.blogNum;
      obj.ToMemberid = this.toMemberid;
      obj.Token = getToken();
      obj.Content = content;
      obj.Commentid = commentid;
      blog.addComment(obj).then((res) => {
        window.console.log(res);
        var memberid = getMember();
        obj.Commentid = res.Data;//添加评论后我的解决方案是在当前的list中插入对应的对象  添加成功后返回会话id给我
        obj.Memberid = memberid.KID;
        obj.MemberName = memberid.UserName
        obj.CreateTime = 'just right now';
        var list = this.commentList;
        obj.Replys = [];
        window.console.log('12331231');
        if (commentid == '' || commentid == undefined) {
          //新会话
          window.console.log('新会话');
          list.unshift(obj);
          window.console.log(list);
        }
        else {
          for (var i in list) {
            if (list[i].Commentid == commentid) {
              list[i].Replys.push(obj);
            }
          }
        }

        window.console.log(memberid);

      }).catch()
    },
    //跳转到添加新评论
    goNewComment () {
      this.user = isLogin();
      if (this.user) {
        this.$refs.focusarea.focus();
      } else {
        this.goLogin()
      }

    },
    goLogin () {

      setRedirUrl();
      this.$router.push({ path: 'login' });
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
      font-size: 14px;

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
        line-height: 1.5;
        //margin-bottom: 30px;
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
  .login {
    margin-top: 40px;
    padding: 10px;

    text-align: center;

    .loginBtn {
      color: #fff;
      display: inline-block;
      background-color: #5bc0de;
      border-color: #46b8da;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}
</style>