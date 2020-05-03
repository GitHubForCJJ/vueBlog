<template>
  <div class="container">
    <!-- 登录页 用户表单 -->
    <van-form v-show="showType==0">

      <van-field v-model="loginForm.UserAccount"
                 clearable
                 label="用户名"
                 right-icon="question-o"
                 placeholder="请输入用户名"
                 left-icon="contact"
                 @click-right-icon="$toast('用户名必须是有效邮箱地址')" />

      <van-field v-model="loginForm.Password"
                 clearable
                 type="password"
                 label="密码"
                 right-icon="question-o"
                 placeholder="请输入密码"
                 left-icon="closed-eye"
                 @click-right-icon="$toast('密码必须是数字、字母、下划线')" />

      <div style="margin: 30px 10px;">
        <van-button size="small"
                    style="width:80px;background-color:#e78170;color:white"
                    native-type="submit"
                    @click="goLogin()">
          提交
        </van-button>
        <van-button size="small"
                    plain
                    type="info"
                    @click="linkToModel(1)">注册</van-button>
        <van-button size="small"
                    plain
                    type="info"
                    @click="linkToModel(2)">找回密码</van-button>
        <van-button size="small"
                    plain
                    type='info'
                    @click="goBack">取消</van-button>
      </div>
    </van-form>

    <!-- 注册 -->
    <van-form v-show="showType==1">
      <!-- 登录页 用户表单 -->
      <van-field v-model="registForm.UserAccount"
                 clearable
                 label="邮箱"
                 right-icon="question-o"
                 placeholder="请输入邮箱地址"
                 left-icon="free-postage"
                 @click-right-icon="$toast('用户名必须有效邮箱地址')" />
      <van-field v-model="registForm.UserName"
                 clearable
                 label="昵称"
                 right-icon="question-o"
                 placeholder="请输入昵称"
                 left-icon="contact"
                 @click-right-icon="$toast('昵称不能为空')" />

      <van-field v-model="registForm.Qrcode"
                 clearable
                 type="number"
                 label="验证码"
                 placeholder="请输入验证码"
                 left-icon="qr"
                 @click-right-icon="$toast('验证码必须是数字')">
        <van-button id="yzm"
                    style="width:80px"
                    slot="button"
                    type="info"
                    @click="getImgqrCode"><img :src="baseqrcodeimgurl"
               style="width: 100%;height: 100%;cursor: pointer;" /></van-button>
      </van-field>

      <van-field v-model="Password"
                 clearable
                 type="password"
                 label="密码"
                 right-icon="question-o"
                 placeholder="请输入密码"
                 left-icon="closed-eye"
                 @click-right-icon="$toast('密码必须是数字、字母、下划线')" />
      <van-field v-model="Surepassword"
                 clearable
                 type="password"
                 label="确认密码"
                 right-icon="question-o"
                 placeholder="请输入密码"
                 left-icon="closed-eye"
                 @click-right-icon="$toast('密码必须是数字、字母、下划线')" />

      <div style="margin: 30px 10px;"
           class="btnarea">
        <van-button size="small"
                    style="width:80px;background-color:#e78170;color:white"
                    native-type="submit"
                    @click="goRegist()">
          注册
        </van-button>
        <van-button size="small"
                    plain
                    type='info'
                    @click="goBack">取消</van-button>
      </div>
    </van-form>

    <!-- 重置密码 -->
    <van-form v-show="showType==2">
      <!-- 登录页 用户表单 -->
      <van-field v-model="resetForm.UserAccount"
                 clearable
                 label="邮箱"
                 right-icon="question-o"
                 placeholder="请输入邮箱地址"
                 left-icon="contact"
                 @click-right-icon="$toast('用户名必须有效邮箱地址')" />

      <van-field v-model="resetForm.Password"
                 clearable
                 type="password"
                 label="密码"
                 right-icon="question-o"
                 placeholder="请输入密码"
                 left-icon="closed-eye"
                 @click-right-icon="$toast('密码必须是数字、字母、下划线')" />
      <van-field v-model="resetForm.Qrcode"
                 clearable
                 type="number"
                 label="验证码"
                 placeholder="请输入验证码"
                 left-icon="qr"
                 @click-right-icon="$toast('验证码必须是数字')">
        <van-button :disabled="disableresetqrbtn"
                    style="width:80px"
                    slot="button"
                    type="info"
                    size="small"
                    @click="getQrcode">{{resettip}}</van-button>
      </van-field>

      <div style="margin: 30px 10px;">
        <van-button style="width:80px;background-color:#e78170;color:white"
                    native-type="submit"
                    size="small"
                    @click="goReset()">
          重置密码
        </van-button>
        <van-button plain
                    type='info'
                    size="small"
                    @click="goBack">取消</van-button>
      </div>
    </van-form>

  </div>
</template>



<script>

import member from '@/api/member.js';
import { getRanStr } from '@/utils/core.js';
import md5 from '@/utils/md5.js';
import baseurl from '@/api/baseurl.js';
import { Toast } from 'vant';
const TIME_COUNT = 60;
export default {
  name: 'login',

  data () {
    return {
      //控制登录  注册  修改密码显示
      showType: 0,
      resettip: '发送验证码',//重置二维码显示文本
      baseqrcodeimgurl: '',//图片二维码地址
      tip: '发送验证码',
      count: 0,//验证码倒计时
      time: null,
      disableresetqrbtn: false,//禁用重置密码的按钮
      transPsw: '',
      loginForm: {
        UserAccount: '',
        UserPassword: '',
        Qrcode: '',
        Qrcodekey: ''
      },
      registForm: {
        UserAccount: '',
        UserPassword: '',
        Qrcode: '',
        Qrcodekey: '',
        UserName: '',//昵称
      },
      resetForm: {
        UserAccount: '',
        UserPassword: '',
        Qrcode: '',
        QrcodeKey: ''
      },
      Surepassword: '',
      Password: ''

    }

  },
  created () {

  },
  mounted () {
    var that = this;
    that.baseqrcodeimgurl = baseurl.api + '/common/GetAuthCode?authcodekey=' + Math.floor(Math.random() * (9999999 - 1000000));
  },
  methods: {
    onSubmit (values) {
      window.console.log('submit', values);
    },
    goLogin () {
      var that = this;
      if (that.loginForm.UserAccount == '' || that.loginForm.UserAccount.length == 0) {
        Toast.fail('请输入正确的邮箱地址');
        return;
      }
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if (!reg.test(that.loginForm.UserAccount)) {
        Toast.fail('请输入正确的邮箱地址');
        return;
      }

      if (that.loginForm.Password == '' || that.loginForm.Password.length == 0) {
        Toast.fail("请输入密码");
        return;
      }
      that.loginForm.UserPassword = md5(that.loginForm.Password).toUpperCase();

      var fromdata = that.loginForm;
      fromdata.Password = '';
      const loading = Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      });
      member.memberLogin(fromdata).then((res) => {
        Toast.success('登录成功');
        that.$parent.refrshLogin(true);
        loading.clear()
        window.console.log(res)
        localStorage.setItem('token', res.Data.Token);
        localStorage.setItem('memberinfo', JSON.stringify(res.Data.MemberInfo));
        var url = localStorage.getItem('redirurl');
        window.location.href = url;

      }).catch((err) => {
        loading.clear()
        var msg = '登录失败';
        if (err.Msg)
          msg = err.Msg;
        Toast.fail(msg);
      });
    },
    goBack () {
      window.history.back(-1);
    },
    //注册
    goRegist () {
      var that = this;
      if (that.registForm.UserAccount == '' || that.registForm.UserAccount.length == 0) {
        Toast.fail('请输入正确的邮箱地址');
        return;
      }

      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if (!reg.test(that.registForm.UserAccount)) {
        Toast.fail('请输入正确的邮箱地址');
        return;
      }

      if (that.registForm.Qrcode == '' || that.registForm.Qrcode.length == 0) {
        Toast.fail('请输入验证码');
        return;
      }
      if (that.Password == '' || that.Password.length == 0) {
        Toast.fail('请输入密码');
        return;
      }
      if (that.Surepassword == '' || that.Surepassword.length == 0) {
        Toast.fail('请再次输入密码');
        return;
      }
      if (that.Password != that.Surepassword) {
        Toast.fail('2次密码不一致');
        return;
      }
      that.registForm.UserPassword = md5(that.Password).toUpperCase();
      var keyindex = that.baseqrcodeimgurl.indexOf('authcodekey=')
      var authcodekey = that.baseqrcodeimgurl.substring(keyindex + 12, that.baseqrcodeimgurl.length)
      that.registForm.Qrcodekey = authcodekey

      var fromdata = that.registForm;
      const loading = Toast.loading({
        message: '注册中...',
        forbidClick: true,
        duration: 0
      });
      member.registItemMember(fromdata).then(() => {
        loading.clear()
        Toast.success('注册成功自动登录');
        //Message.info({ message: '注册成功 自动登录' });
        that.loginForm.UserAccount = that.registForm.UserAccount;
        that.loginForm.UserPassword = that.registForm.UserPassword
        //注册成功自动登录
        var fromdata = that.loginForm;
        fromdata.Password = '';

        member.memberLogin(that.loginForm).then((res) => {
          Toast.success('登录成功')
          that.$parent.refrshLogin(true);

          window.console.log(res)
          localStorage.setItem('token', res.Data.Token);
          localStorage.setItem('memberinfo', JSON.stringify(res.Data.MemberInfo));
          var url = localStorage.getItem('redirurl');
          window.location.href = url;

        }).catch((err) => {
          var msg = '登录失败';
          if (err.Msg)
            msg = err.Msg;
          Toast.fail(msg);
        });


      }).catch((err) => {
        loading.clear()
        var msg = '注册失败请重试';
        if (err.Msg) {
          msg = err.Msg
        }
        Toast.fail(msg);
      });

    },
    //重置密码
    goReset () {
      var that = this;
      if (that.resetForm.UserAccount == '' || that.resetForm.UserAccount.length == 0) {
        Toast.fail('请输入正确的邮箱地址');
        return;
      }

      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      if (!reg.test(that.resetForm.UserAccount)) {
        Toast.fail('请输入正确的邮箱地址');
        return;
      }
      if (this.resetForm.Password == '' || this.resetForm.Password.length == 0) {
        Toast.fail('请输入新密码');
        return;
      }
      if (this.resetForm.Qrcode == '' || this.resetForm.Qrcode.length == 0) {
        Toast.fail('请输入验证码');
        return;
      }
      that.resetForm.UserPassword = md5(that.resetForm.Password).toUpperCase();
      var fromdata = that.resetForm;
      const loading = Toast.loading({
        message: '重置密码中...',
        forbidClick: true,
        duration: 0
      });
      member.resetPsw(fromdata).then(() => {
        Toast('重置密码成功 自动登录')
        that.loginForm.UserAccount = that.resetForm.UserAccount;
        that.loginForm.UserPassword = that.resetForm.UserPassword
        //重置成功自动登录
        member.memberLogin(that.loginForm).then((res) => {
          Toast.success('登录成功')
          loading.clear();
          that.$parent.refrshLogin(true);
          localStorage.setItem('token', res.Data.Token);
          localStorage.setItem('memberinfo', JSON.stringify(res.Data.MemberInfo));
          var url = localStorage.getItem('redirurl');
          window.location.href = url;

        }).catch((err) => {
          loading.clear()
          var msg = '登录失败';
          if (err.Msg)
            msg = err.Msg;
          Toast.fail(msg);
        });

      }).catch((err) => {
        var msg = '重置密码失败请重试';
        if (err.Msg) {
          msg = err.Msg
        }
        Toast.fail(msg);
      });

    },
    //发送邮箱验证码  验证码key写入storage防止多次发送 
    getQrcode () {
      var that = this;
      var str = '';
      var account = '';
      window.console.log(that.resetForm)
      //处理倒计时
      if (!that.timer) {
        that.count = TIME_COUNT;
        that.disableresetqrbtn = true;
        that.timer = setInterval(() => {
          if (that.count > 0 && that.count <= TIME_COUNT) {
            that.count--;
            that.resettip = that.count
          } else {
            that.disableresetqrbtn = false;
            clearInterval(that.timer);
            that.timer = null;
            that.resettip = '发送验证码'
          }
        }, 1000)
      }

      // if (that.resetForm.UserAccount == '' || that.resetForm.UserAccount.length == 0 || that.resetForm.UserAccount.indexOf('@') < 0) {
      //   Toast.fail('请输入正确的邮箱地址');
      //   return;
      // }
      // var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
      // if (!reg.test(that.resetForm.UserAccount)) {
      //   Toast.fail('请输入正确的邮箱地址');
      //   return;
      // }
      var storagekey = localStorage.getItem('resetqrcode');
      if (storagekey != null && storagekey.length > 0) {
        that.resetForm.QrcodeKey = storagekey;
      }
      else {
        str = getRanStr(11);
        that.resetForm.QrcodeKey = str;
        localStorage.setItem('resetqrcode', str);
      }
      window.console.log(that.resetForm.QrcodeKey)
      account = that.resetForm.UserAccount;

      member.sendQrcode(account, that.resetForm.QrcodeKey).then((res) => {
        window.console.log(res);
        Toast('验证码已发出，请留意查看邮件');

      }).catch((err) => {
        window.console.log(err);
        Toast.fail('发送邮件验证码失败，请检查邮箱地址是否正确');
      });

    },
    getImgqrCode () {
      var that = this;
      that.baseqrcodeimgurl = baseurl.api + '/common/GetAuthCode?authcodekey=' + Math.floor(Math.random() * (9999999 - 1000000));
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


<style lang="less" scoped>
.container {
  padding-top: 65px;

  button {
    margin-right: 10px;
  }
  #yzm {
    width: 60px;
    height: 24px;
    border: none;
    background: none;
    box-sizing: boder-box;
    padding: 0;
  }
  #yzm .van-button--normal {
    padding: 0;
  }
}
</style>
