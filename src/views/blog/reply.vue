<template>
  <div class="container">
    <div class="replyList">
      <div class="replyItem"
           v-for="(reply,index) in replyList"
           :key="index">
        <p class="content">
          <span class="">{{reply.MemberName}}:</span>
          {{reply.Content}}
        </p>
        <div class="time"> {{reply.CreateTime}} <a href="#"
             @click="showReply(parentIndex,reply.MemberName,reply.Memberid)">回复</a></div>
      </div>
      <!-- <div class="replyItem">
        <p class="content">
          <span class="">rodman:</span>
          不行不信
        </p>
        <div class="time">2019-01-01 03:03:23 <a href="#">回复</a></div>
      </div> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'Reply',
  props: ['replyList', 'user', 'parentIndex'],
  data () {
    return {
    }
  },
  methods: {
    showReply (index, nickname, tomemberid) {
      window.console.log("子", index, nickname);
      this.$parent.showReply(index, nickname, tomemberid);
    }

  },
};
</script>


<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  box-sizing: border-box;

  .replyList {
    width: 100%;
    border-left: 5px solid #d9d9d9;
    box-sizing: border-box;
    border-top: 1px dashed #d9d9d9;

    a {
      float: right;
      color: #999;
      font-size: 12px;
    }

    .replyItem {
      box-sizing: border-box;
      width: 100%;
      padding: 15px 0 15px 10px;
      border-bottom: 1px dashed #d9d9d9;

      .content {
        font-size: 13px;

        span {
          color: #4094c7;
          margin-right: 5px;
        }
      }
      .time {
        font-size: 12px;
      }
    }
  }
}
</style>