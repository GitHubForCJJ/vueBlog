<template>
  <div class="container">
    <div class="commentTop">
      <div>4条评论</div>
      <div>添加评论</div>
    </div>

    <div class="commentList">
      <div class="commentItme">
        <div class="itemTop">
          <img :src="defaultAvatar"
               alt="头像">
          <div>
            <div class="name">Rodman</div>
            <div class="time">2019-02-03 03:12:23</div>
          </div>
        </div>
        <p class="itemContent">你是傻子！！！ <a href="#">回复</a></p>
        <div class="itemReplayList">
          <Reply :replyList='commentList'
                 :user="true"></Reply>
        </div>
      </div>

      <div class="commentItme">
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
        </div>
      </div>
    </div>

    <!-- 写新评论 -->
    <div v-if="user"
         class="bottom">
      <textarea v-model="commentData"
                name=""
                id=""
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
import Reply from '../blog/reply'
import DefaultAvatar from '../../assets/logo.png'

export default {
  name: 'Comment',
  props: ['commentList', 'user'],
  components: { Reply },
  data () {
    return {
      commentData: '',
      defaultAvatar: DefaultAvatar
    }
  },
  methods: {


  },
};
</script>


<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  color: #555;

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
    min-height: 300px;
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
  }
}
</style>