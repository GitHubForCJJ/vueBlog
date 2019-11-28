/*
 * token管理
 * @Author: Tangfan
 * @Date: 2019-10-09 10:23:18
 * @Last Modified by: Tangfan
 * @Last Modified time: 2019-10-09 10:24:52
 */

/**
 *
 * @param {string|true|null} val string:记录token  true:取得token秘钥  null:取得token
 * @return {string|null} string:取得token|秘钥(无时为:'')  null:设置
 */
const getToken = (val) => {
  if (val === true) {
    const token = localStorage.getItem('token') || '';
    let secret = '';

    if (!token) return '';
    for (let i = 0; i < token.length; i++) {
      if (i % 2) secret += token[i];
      if (secret.length === 8) break;
    }
    return secret;
  }
  if (val) {
    // 请求成功后，写入 token
    localStorage.setItem('token', val);
  } else return localStorage.getItem('token') || '';
  return null;
};

export default getToken;
