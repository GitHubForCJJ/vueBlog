<template>
  <div class="container">
    <!-- 登录 -->
    <el-form v-show="showType==0"
             label-width="80px">
      <el-form-item label="邮件地址">
        <el-col :span="11">
          <el-input v-model="loginForm.email"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="密码">
        <el-col :span="11">
          <el-input v-model="loginForm.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click="onSubmit">登录</el-button>
        <el-button @click="goRegist"
                   type="primary">注册</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 注册 -->
    <el-form v-show="showType==1"
             label-width="80px">
      <el-form-item label="邮件地址">
        <el-col :span="11">
          <el-input v-model="registForm.email"></el-input>
        </el-col>

      </el-form-item>
      <el-form-item label="验证码">
        <el-col :span="11">
          <el-input v-model="registForm.qrcode"
                    placeholder=""></el-input>

        </el-col>
        <el-col :span="11">
          <el-button type="primary"
                     @click="goBack">获取验证码</el-button>
        </el-col>

      </el-form-item>
      <el-form-item label="新密码">
        <el-col :span="11">
          <el-input v-model="registForm.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click="onRegist">注册</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 修改密码 -->
    <el-form v-show="showType==2"
             label-width="80px">
      <el-form-item label="邮件地址">
        <el-col :span="11">
          <el-input v-model="resetForm.email"></el-input>
        </el-col>

      </el-form-item>
      <el-form-item label="验证码">
        <el-col :span="11">
          <el-input v-model="resetForm.qrcode"
                    placeholder=""></el-input>
          <el-button type="primary"
                     @click="goBack">获取验证码</el-button>
        </el-col>
        <el-col :span="11">

        </el-col>

      </el-form-item>
      <el-form-item label="新密码">
        <el-col :span="11">
          <el-input v-model="resetForm.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click="onRegist">修改</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.container {
  padding-top: 25px;
}
</style>


<script>
import { Message } from 'element-ui';
import member from '@/api/member.js';

export default {
  name: 'login',
  data () {
    return {
      //控制登录  注册  修改密码显示
      showType: 1,
      loginForm: {
        email: '',
        password: ''
      },
      registForm: {
        email: '',
        password: '',
        qrcode: '',
        qrcodekey: ''
      },
      resetForm: {
        email: '',
        password: '',
        qrcode: '',
        qrcodekey: ''
      }
    }

  },
  created () {

  },
  mounted () {

  },
  methods: {
    onSubmit () {
      window.console.log('submit!');
    },
    goBack () {
      window.history.back(-1);
    },
    onRegist () {
      if (this.registForm.qrcode == '' || this.registForm.qrcode.length == 0) {
        Message.info({ message: '请输入二维码' });
        return;
      }
      member.registItemMember(this.registForm).then((res) => {
        window.console.log(res);
      });

    },
    goRegist () {
      this.showType = 1;
    }

  }
}
</script>


