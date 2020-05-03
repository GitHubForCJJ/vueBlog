<template>
  <div class="container">
    <!-- 登录页 用户表单 -->
    <van-form>

      <van-field v-model="UserName"
                 label="你的昵称"
                 right-icon="question-o"
                 placeholder="请输入昵称"
                 left-icon="contact"
                 @click-right-icon="$toast('评论区显示的昵称')" />

      <div style="margin: 30px 10px;">
        <van-button size="small"
                    style="width:80px;background-color:#e78170;color:white"
                    native-type="submit"
                    @click="update()">
          提交
        </van-button>
        <van-button size="small"
                    plain
                    type="info"
                    style="width:80px;"
                    native-type="submit"
                    @click="goOut()">
          退出登录
        </van-button>
        <van-button size="small"
                    plain
                    type='info'
                    @click="goBack">取消</van-button>
      </div>
    </van-form>
  </div>
</template>



<script>
import { getMemberName, getMember, updateMember, getMemberAccount } from '@/utils/core.js'
import { Toast } from 'vant';
import member from '@/api/member.js'

export default {
  name: 'updatemember',

  data () {
    return {
      UserName: '',
      UserAccount: ''
    }

  },
  created () {

  },
  mounted () {
    this.UserName = getMemberName()
    this.UserAccount = getMemberAccount()
  },
  methods: {
    goOut () {
      var that = this;
      localStorage.removeItem('token');
      localStorage.removeItem('memberinfo');
      that.$parent.refrshLogin(false);
      var url = localStorage.getItem('redirurl');
      window.location.href = url;
    },
    goBack () {
      window.history.back(-1);
    },
    update () {
      var that = this;
      if (that.UserAccount == '' || that.UserAccount.length == 0) {
        Toast.fail('登录信息有误，请重新登录');
        return;
      }

      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if (!reg.test(that.UserAccount)) {
        Toast.fail('登录信息有误，请重新登录');
        return;
      }
      var odata = {};
      odata.update = {};
      odata.update.UserName = that.UserName;
      odata.Num = that.UserAccount;
      member.updateMember(odata).then(() => {
        var memberinfo = getMember();
        memberinfo.UserName = that.UserName;
        updateMember(memberinfo);
        Toast('更新成功')
        var url = localStorage.getItem('redirurl');
        window.location.href = url;
      }).catch(() => {
        Toast.file('更新失败')
      })
    }
  }
}
</script>


<style lang="less" scoped>
.container {
  padding-top: 65px;

  button {
    margin-right: 10px;
  }
}
</style>
