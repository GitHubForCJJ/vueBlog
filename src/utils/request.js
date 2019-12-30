/*
 * 二次封装axios请求
 * @Author: Tangfan
 * @Date: 2019-10-09 10:20:22
 * @Last Modified by: Tangfan
 * @Last Modified time: 2019-11-05 16:42:16
 */
import axios from 'axios';
import qs from 'qs';
// import router from '@/router';
import des from '@/utils/des';
import md5 from '@/utils/md5';
import getToken from '@/utils/token';
import { ext } from '@/utils/core';

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath,
//     },
//   });
// };

/**
 * 默认基础数据
 */
const baseData = {
  AppId: '358811079015606',
  AppName: 'dzxzapp',
  AppType: '1',
  AppVersion: '1.0.0.1',
  Page: 1,
  Limit: 10,
  Data: '{}',
};

/**
 *
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {String} type 请求方法，默认 post
 * @param {Boolean} encrypt 是否加密，默认是true
 */
const request = ({
  url,
  data = {},
  encrypt = true,
  type = 'post',
}) => {
  // 获取token，无token跳转登录页
  let headers = 'application/json';
  const token = getToken();
  // console.log('token', token);
  // if (!token) toLogin();
  const resEncrypt = localStorage.getItem('resEncrypt');
  const key = getToken(true);
  const timestamp = Math.round(new Date() / 1000);

  if (encrypt && token && resEncrypt) {
    data = ext(data, baseData);
    // 加密处理
    data.Data = des.encryptByDESModeCBC(data.Data, key, key);

    data.Md5 = md5(`${data.Data}${timestamp}{${token}}`);
    data.Token = token;
    data.Timestamp = timestamp;
    // 设置请求头
    data = qs.stringify(data);
    headers = 'application/x-www-form-urlencoded';
  }

  return axios({
    url,
    baseURL: process.env.VUE_APP_BASEURL,
    method: type,
    data,
    headers: {
      'Content-Type': headers,
    },
  }).then((res) => {
    const obj = res.data;
    if (encrypt && resEncrypt && typeof obj.Data === 'string') {
      data = des.decryptByDESModeCBC(obj.Data, key, key);
      obj.Data = JSON.parse(data);
    }
    return obj.Code ? Promise.reject(res) : Promise.resolve(obj);
  }).catch((err) => {
    let response;
    // eslint-disable-next-line prefer-destructuring
    if (err.response) response = err.response;
    else response = err;
    return Promise.reject(response.data);
  });
};

export default request;
