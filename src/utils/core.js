/*
 * 公共方法
 * @Author: Tangfan
 * @Date: 2019-10-09 10:16:59
 * @Last Modified by: Tangfan
 * @Last Modified time: 2019-11-29 09:21:35
 */

import md5 from '@/utils/md5.js';
/**
 * 获取文件扩展名
 * @param name String
 */
export function getFileFormat (name) {
  const fileName = name.lastIndexOf('.');
  const fileNameLength = name.length;
  const fileFormat = name.substring(fileName + 1, fileNameLength);
  return fileFormat;
}

/**
 * 对象合并(后不修改前,无递归)
 * @param obj Object|Null Null时新建{}
 * @param extN Object|Null ... 多个参数 扩展数据,重复key不修改之前的
 * @return Object 参数obj或obj非对象时新的{}
 */
export function ext (obj, ...args) {
  if (!obj || typeof obj !== 'object') obj = {};
  for (let i = 0, extObj, k; i < args.length; i++) {
    extObj = args[i];
    for (k in extObj) {
      if (Object.prototype.hasOwnProperty.call(extObj, k) && obj[k] === undefined) {
        obj[k] = extObj[k];
      }
    }
  }
  return obj;
}

/**
 * 返回指定长度的随机字符串
 * @param len Number
 */
export function getRanStr (len) {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return md5(str);
}

/**
 * 校验身份证号
 * 支持地址编码、出生日期、校验位验证
 * 返回值：Boolean
 */
export function checkIDCard (code) {
  const ret = {};
  ret.msg = '';
  ret.issuccess = true;
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  };

  // 验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
  const idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (!code || !idcardReg.test(code)) {
    ret.msg = '身份证号格式错误';
    ret.issuccess = false;
  } else if (code.length !== 18) {
    ret.msg = '身份证号格式错误';
    ret.issuccess = false;
  } else if (!city[code.substr(0, 2)]) {
    ret.msg = '地址编码错误';
    ret.issuccess = false;
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      code = code.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      if (parity[sum % 11] !== code[17]) {
        ret.msg = '校验位错误';
        ret.issuccess = false;
      }
    }
  }
  if (ret.issuccess) {
    code = code.join('');
    const date = `${code.substr(6, 4)}-${code.substr(10, 2)}-${code.substr(12, 2)}`;
    ret.birthday = date;
    if (parseInt(code.substr(16, 1)) % 2 === 1) {
      ret.sex = 1;
    } else {
      ret.sex = 0;
    }
  }
  return ret.issuccess;
}

/**
 * 时间格式化
 * @param {String,Number,Date} oldDate 要转换的时间
 * @param {String} fmt 转换格式
 */
export function formatDate (oldDate, fmt) {
  let date = new Date();
  if (typeof oldDate === 'string' || typeof oldDate === 'number') {
    date = new Date(`${oldDate}`);
  } else {
    date = oldDate;
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  function padLeftZero (str) {
    return (`00${str}`).substr(str.length);
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`;
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 * 判断是否微信环境
 */
export function isWechat () {
  return /MicroMessenger/i.test(navigator.userAgent);
}

/**
 * 判断是否为空
 * @param val mixed 要判断的值
 * @return boolean
 */
export function isEmpty (val) {
  if (!val) return true;
  if (typeof val !== 'object') return false; // true | string!=='' | number!==0
  if (val instanceof Array) return !val.length; // array
  return !Object.keys(val).length; // object
}


/**
 * 阿拉伯数字转中文汉字
 * @param {number} num 要转换的阿拉伯数字
 */
export function numToZh (num) {
  const mapNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const mapBit = ['', '十', '百', '千'];
  const mapPart = ['', '万', '亿', '万'];
  // eslint-disable-next-line prefer-const
  let [int, dot] = (`${num}`).split('.');
  const arr = int.split('').map(i => mapNum[i]).reverse();
  for (let i = 0, n = 0; i < arr.length; i++) {
    const rem = i % 4;
    if (arr[i] !== '零') arr[i] += mapBit[rem];
    if (rem === 0) arr[i] += mapPart[n++];
  }
  int = arr.reverse().join('').replace(/零{2,}/g, '零')
    .replace(/零+$/, '')
    .replace(/零(万|亿)/g, '$1');
  return dot ? `${int}点${dot.split('').map(i => mapNum[i]).join('')}` : int;
}

/**
 * 开启全局loading
 */
export function openLoad () {
  const $load = document.querySelector('.app-wait');
  $load.style.display = 'block';
}
/**
 * 关闭全局loading
 */
export function closeLoad () {
  const $load = document.querySelector('.app-wait');
  $load.style.display = 'none';
}
