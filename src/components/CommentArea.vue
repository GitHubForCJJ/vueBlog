<template>
  <div class="container">
    <div class="top">
      <textarea v-model="commentData"
                name=""
                id=""
                cols="30"
                rows="10"></textarea>
      <div>
        <el-button type="primary">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CommentArea',
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