<template>
  <div class="container">
    <!-- 登录 -->
    <el-form v-show="showType==0"
             label-width="80px">
      <el-form-item label="邮件地址">
        <el-col :span="11">
          <el-input v-model="loginForm.UserAccount"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="密码">
        <el-col :span="11">
          <el-input type="password"
                    v-model="loginForm.Password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click="goLogin()">登录</el-button>
        <el-button @click="linkToModel(1)"
                   type="primary">注册</el-button>
        <el-button @click="linkToModel(2)"
                   type="warning">重置密码</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 注册 -->
    <el-form v-show="showType==1"
             label-width="80px">
      <el-form-item label="邮件地址">
        <el-col :span="11">
          <el-input v-model="registForm.UserAccount"></el-input>
        </el-col>

      </el-form-item>
      <el-form-item label="验证码">
        <el-col :span="7">
          <el-input v-model="registForm.Qrcode"
                    style="width: 100%;"
                    placeholder=""></el-input>

        </el-col>
        <el-col style="text-align:center"
                :span="1">-</el-col>
        <el-col :span="3">
          <el-button type="primary"
                     style="width: 100%;"
                     @click="getQrcode(1)">验证码</el-button>
        </el-col>

      </el-form-item>
      <el-form-item label="昵称">
        <el-col :span="11">
          <el-input v-model="registForm.UserName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="新密码">
        <el-col :span="11">
          <el-input type="password"
                    v-model="registForm.Password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click="goRegist()">注册</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 修改密码 -->
    <el-form v-show="showType==2"
             label-width="80px">
      <el-form-item label="邮件地址">
        <el-col :span="11">
          <el-input v-model="resetForm.UserAccount"></el-input>
        </el-col>

      </el-form-item>
      <el-form-item label="验证码">
        <el-col :span="7">
          <el-input v-model="resetForm.Qrcode"
                    placeholder=""></el-input>
        </el-col>
        <el-col style="text-align:center"
                :span="1">-</el-col>
        <el-col :span="3">
          <el-button type="primary"
                     style="width: 100%;"
                     @click="getQrcode(2)">验证码</el-button>
        </el-col>

      </el-form-item>
      <el-form-item label="新密码">
        <el-col :span="11">
          <el-input type="password"
                    v-model="resetForm.Password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click="goReset">修改</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.container {
  padding-top: 65px;
}
</style>


<script>
import { Message } from 'element-ui';
import member from '@/api/member.js';
import { getRanStr } from '@/utils/core.js';
import md5 from '@/utils/md5.js';

export default {
  name: 'login',
  data () {
    return {
      //控制登录  注册  修改密码显示
      showType: 0,
      transPsw: '',
      loginForm: {
        UserAccount: '',
        UserPassword: '',
        Password: ''
      },
      registForm: {
        UserAccount: '',
        UserPassword: '',
        Password: '',
        Qrcode: '',
        QrcodeKey: '',
        UserName: '',//昵称
      },
      resetForm: {
        UserAccount: '',
        UserPassword: '',
        Password: '',
        Qrcode: '',
        QrcodeKey: ''
      },

    }

  },
  created () {

  },
  mounted () {

  },
  methods: {
    goLogin () {
      window.console.log(this.loginForm)
      if (this.loginForm.UserAccount == '' || this.loginForm.UserAccount.length == 0 || this.loginForm.UserAccount.indexOf('@') < 0) {

        Message.warning({ message: '请输入正确的邮箱地址' });
        return;
      }
      if (this.loginForm.Password == '' || this.loginForm.Password.length == 0) {
        Message.warning({ message: '请输入密码' });
        return;
      }
      this.loginForm.UserPassword = md5(this.loginForm.Password).toUpperCase();

      var fromdata = this.loginForm;
      fromdata.Password = '';

      member.memberLogin(fromdata).then((res) => {

        //Message.info({ message: '登录成功' });
        window.console.log(res)
        localStorage.setItem('token', res.Data.Token);
        localStorage.setItem('memberinfo', JSON.stringify(res.Data.MemberInfo));
        var url = localStorage.getItem('redirurl');
        window.location.href = url;

      }).catch((err) => {
        var msg = '登录失败';
        if (err.Msg)
          msg = err.Msg;
        Message.info({ message: msg });
      });
    },
    goBack () {
      window.history.back(-1);
    },
    //注册
    goRegist () {
      window.console.log(this.registForm)
      if (this.registForm.UserAccount == '' || this.registForm.UserAccount.length == 0 || this.registForm.UserAccount.indexOf('@') < 0) {
        Message.warning({ message: '请输入正确的邮箱地址' });
        return;
      }

      if (this.registForm.Qrcode == '' || this.registForm.Qrcode.length == 0) {
        Message.warning({ message: '请输入验证码' });
        return;
      }
      if (this.registForm.Password == '' || this.registForm.Password.length == 0) {
        Message.warning({ message: '请输入密码' });
        return;
      }
      this.registForm.UserPassword = md5(this.registForm.Password).toUpperCase();
      window.console.log(this.registForm);
      this.transPsw = this.registForm.Password;
      var fromdata = this.registForm;

      member.registItemMember(fromdata).then(() => {

        Message.info({ message: '注册成功 自动登录' });
        this.loginForm.UserAccount = this.registForm.UserAccount;
        this.loginForm.Password = this.transPsw;
        //注册成功自动登录
        this.goLogin();

      }).catch((err) => {
        var msg = '注册失败请重试';
        if (err.Msg) {
          msg = err.Msg
        }
        Message.info({ message: msg });
      });

    },
    //重置密码
    goReset () {

      if (this.resetForm.UserAccount == '' || this.resetForm.UserAccount.length == 0 || this.resetForm.UserAccount.indexOf('@') < 0) {
        Message.warning({ message: '请输入正确的邮箱地址' });
        return;
      }

      if (this.resetForm.Qrcode == '' || this.resetForm.Qrcode.length == 0) {
        Message.warning({ message: '请输入验证码' });
        return;
      }
      if (this.resetForm.Password == '' || this.resetForm.Password.length == 0) {
        Message.warning({ message: '请输入新密码' });
        return;
      }
      this.resetForm.UserPassword = md5(this.resetForm.Password).toUpperCase();
      window.console.log(this.resetForm);
      this.transPsw = this.resetForm.Password;
      var fromdata = this.resetForm;

      member.resetPsw(fromdata).then(() => {

        Message.info({ message: '重置密码成功 自动登录' });
        this.loginForm.UserAccount = this.resetForm.UserAccount;
        this.loginForm.Password = this.transPsw;
        //重置成功自动登录
        this.goLogin();
        // this.linkToModel(0);

      }).catch((err) => {
        var msg = '重置密码失败请重试';
        if (err.Msg) {
          msg = err.Msg
        }
        Message.info({ message: msg });
      });

    },
    //发送验证码 1注册，2重置密码
    getQrcode (type) {
      var str = '';
      var account = '';
      window.console.log(this.registForm)
      switch (type) {
        case 1:
          if (this.registForm.UserAccount == '' || this.registForm.UserAccount.length == 0 || this.registForm.UserAccount.indexOf('@') < 0) {
            Message.warning({ message: '请输入正确的邮箱地址' });
            return;
          }
          str = getRanStr(11);
          this.registForm.QrcodeKey = str;
          account = this.registForm.UserAccount;
          break;
        case 2:
          if (this.resetForm.UserAccount == '' || this.resetForm.UserAccount.length == 0 || this.resetForm.UserAccount.indexOf('@') < -1) {
            Message.warning({ message: '请输入正确的邮箱地址' });
            return;
          }
          str = getRanStr(11);
          this.resetForm.QrcodeKey = str;
          account = this.resetForm.UserAccount;
          break;
      }
      member.sendQrcode(account, str).then((res) => {
        window.console.log(res);
        if (res.Code == 0) {
          Message.info({
            message: res.Msg
          })
        }
        else {
          Message.info({
            message: '程序好像开小差了！'
          })
        }
      });

    },
    //跳转到对应框 0登录，1注册，2重置密码
    linkToModel (type) {
      switch (type) {
        case 0:
          this.showType = 0;
          break;
        case 1:
          this.showType = 1;
          break;

        case 2:
          this.showType = 2;
          break;
        default:
          this.showType = 0;
          break;
      }
    }

  }
}
</script>


