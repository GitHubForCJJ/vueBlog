<template>
  <div class="container">
    <!-- 登录页 用户表单 -->
    <van-form>
      <!-- 上传头像  vant 属性绑定时不加冒号  时间时才加-->
      <div style="width:100%;height:100px;text-align:center">
       <van-uploader style="margin:0 auto"  :show-upload="fileList.length===0" :before-read="beforeRead" :after-read="afterRead" upload-text='你的头像'
       v-model="fileList"  :max-size="1 * 1024 * 1024"  @oversize="onOversize"/>
      </div>
      <van-field v-model="UserName"
                 label="你的昵称"
                 right-icon="question-o"
                 placeholder="请输入昵称"
                 left-icon="contact" clearable
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
import {  getMember, updateMember } from '@/utils/core.js'
import { Toast } from 'vant';
import member from '@/api/member.js'
import upload from '@/utils/upload.js'

export default {
  name: 'updatemember',

  data () {
    return {
      UserName: '',
      UserAccount: '',
      fileList:[],//用于存储上传七牛后返回的图片地址 用于预览 是一个对象{url:''}详情看vant  文件上传
    }

  },
  created () {

  },
  mounted () {

    var mem=getMember();
    this.UserName = mem.UserName;
    this.UserAccount = mem.UserAccount;
    if(mem.UserIcon !=null && mem.UserIcon.length>0){
      this.fileList.push({url:mem.UserIcon})
    }
  },
  methods: {
     onOversize() {
          Toast.fail('请上传不超过1M的图片')
    },
    //上传文件前的验证
    beforeRead(file) {
      window.console.log(file)
      if (file.type !== 'image/jpeg'&&file.type!=='image/png'&&file.type!=='image/svg+xml') {
        Toast('请上传 jpg,png,svg 格式图片');
        return false;
      }
      return true;
    },
    //上传操作
    afterRead(file) {
      var that=this;
      // 此时可以自行将文件上传至服务器
      window.console.log(file.file);
      var arr=new Array();
      arr.push(file.file);
      window.console.log(arr)
      upload(arr, { folder: 'memberavg' })
        .then((res) => {
          that.fileList=[]
          that.fileList.push({url:res[0]})
          window.console.log(that.fileList)
          //closeLoad();
        })
        .catch((err) => {
          window.console.log(err);
        });


    },
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
      if(that.fileList.length>0){
        odata.update.UserIcon=that.fileList[0].url;
      }
      odata.update.UserName = that.UserName;
      odata.Num = that.UserAccount;
      member.updateMember(odata).then(() => {
        var memberinfo = getMember();
        memberinfo.UserName = that.UserName;
        if(that.fileList.length>0){
        memberinfo.UserIcon=that.fileList[0].url;
      }
        updateMember(memberinfo);//更新localstrage
        Toast('更新成功')
        that.$parent.refrshLogin(true);//刷新登录状态
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
