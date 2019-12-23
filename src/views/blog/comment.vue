<template>
  <div class="container">
    <div class="commentTop">
      <div>4条评论</div>
      <div>添加评论</div>
    </div>

    <div class="commentList">

    </div>
    <!-- <div class="top">
      <textarea v-model="commentData"
                name=""
                id=""
                cols="30"
                rows="10"></textarea>
      <div>
        <el-button type="primary">发表</el-button>
      </div>
    </div> -->
  </div>
</template>

<script>

export default {
  name: 'Comment',
  data () {
    return {
      commentData: ''
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

  .top {
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