/*
 * 公共接口
 * @Author: Tangfan
 * @Date: 2019-10-09 10:27:24
 * @Last Modified by: Tangfan
 * @Last Modified time: 2019-11-21 14:15:48
 */
// import { get } from 'https';
import axios from '@/utils/request';

const comm = {
  // 获取七牛云上传token
  getQiNiuUploadToken () {
    return axios({
      url: '/Common/GetQiNiuUploadToken',
      encrypt: false,
    });
  },
  // 根据pid获取省市区
  getAreaInfoByPid (pid) {
    const data = {
      where: {
        pid,
      },
    };
    return axios({
      url: '/Comm/GetAreaInfoByPid',
      data: JSON.stringify(data),
      encrypt: false,
    });
  },
  // 发送验证码
  getMoblieAuthCode (obj) {
    return axios({
      url: '/Comm/GetMoblieAuthCode',
      data: JSON.stringify(obj),
      encrypt: false,
    });
  },
  // 验证码登录
  loginInByCode (obj) {
    return axios({
      url: '/Comm/MemLoginInByCode',
      data: JSON.stringify(obj),
      encrypt: false,
    });
  },

  // 账号密码登录
  loginIn (obj) {
    return axios({
      url: '/Comm/MemLoginIn',
      data: JSON.stringify(obj),
      encrypt: false,
    });
  },
  // 注册
  memRegister (obj) {
    return axios({
      url: '/Comm/MemRegister',
      data: JSON.stringify(obj),
      encrypt: false,
    });
  },
  // 找回密码
  upPwdByCode (obj) {
    return axios({
      url: '/Comm/UpPwdByCode',
      data: JSON.stringify(obj),
      encrypt: false,
    });
  },
  // 根据token获取会员信息
  getMemInfoByToken (str) {
    return axios({
      url: '/Comm/GetMemInfoByToken',
      data: JSON.stringify(str),
      encrypt: false,
    });
  },
  // 获取游客模式token
  getTouristsModeToken () {
    return axios({
      url: '/Comm/GetTouristsModeToken',
      encrypt: false,
    });
  },
  // 根据渠道id信息获取公众号授权信息
  getMpAutoInfo (obj) {
    return axios({
      url: '/Comm/GetMpAutoInfo',
      data: JSON.stringify(obj),
      encrypt: false,
    });
  },
  // 根据openid获取会员信息
  getMemInfoByOpenId (obj) {
    return axios({
      url: '/Comm/GetMemInfoByOpenId',
      data: JSON.stringify(obj),
      encrypt: false,
    });
  },
  // 根据经纬度获取最近地区
  getNearest (str) {
    return axios({
      url: `/Comm/GetNearest?lonlat=${str}`,
      encrypt: false,
    });
  },
  // 微信分享
  wxShare (str) {
    return axios({
      url: `/Comm/WxShare?url=${str}`,
      encrypt: false,
    });
  },
  // 注册分销
  joinInDis (obj) {
    return axios({
      url: '/Comm/joinInDis',
      data: JSON.stringify(obj),
      encrypt: false,
    });
  },
  // 根据用户姓名获取用户拼音
  GetUserPy (str) {
    return axios({
      url: `/Comm/GetUserPy?tripname=${str}`,
      encrypt: false,
    });
  },
};

export default comm;
