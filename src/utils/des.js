/*
 * des加密解密
 * @Author: Tangfan
 * @Date: 2019-10-09 10:18:44
 * @Last Modified by: Tangfan
 * @Last Modified time: 2019-10-09 10:37:10
 */

import cryptoJs from 'crypto-js';

export default {
  // des解密
  decryptByDESModeCBC(encrypted, key, iv) {
    key = cryptoJs.enc.Utf8.parse(key);
    iv = cryptoJs.enc.Utf8.parse(iv);
    const decrypted = cryptoJs.DES.decrypt(encrypted, key, {
      iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7,
    });
    return decrypted.toString(cryptoJs.enc.Utf8);
  },
  // des 加密
  encryptByDESModeCBC(encrypted, key, iv) {
    key = cryptoJs.enc.Utf8.parse(key);
    iv = cryptoJs.enc.Utf8.parse(iv);
    encrypted = cryptoJs.DES.encrypt(encrypted, key, {
      iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7,
    });
    return encrypted.toString();
  },
};
