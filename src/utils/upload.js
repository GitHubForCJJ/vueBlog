import comm from '@/api/comm';
import md5 from '@/utils/md5.js';
import { ext, getFileFormat } from '@/utils/core';

let token;
let expire;
const qiniu = require('qiniu-js');

let GHM_QINIU_API = 'http://cdn1.lieweiyou.com/';// 七牛云上传地址

// 获取1-5的随机数
const getRndInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 取得上传token
const getToken = function () {
  if (token && expire > new Date() * 1) return Promise.resolve(token);
  return comm.getQiNiuUploadToken().then((res) => {
    expire = new Date() * 1 + 6900000; // 2小时-5分钟(防止使用刚好快过期)
    return res.Data;
  });
};
const createUId = function () {
  const random = Math.round(Math.random() * 10000000000).toString(36);
  return md5((new Date() * 1 - 1556668800000).toString(36) + random);
};

// 上传到七牛云(单个文件)
function update (file, opt) {
  GHM_QINIU_API = `http://cdn${getRndInteger(1, 5)}.lieweiyou.com/`;
  return getToken().then((token) => {
    opt = ext(opt, {
      types: ['image/png', 'image/jpeg', 'image/gif'],
    });
    const name = `${opt.folder}/${createUId()}.${getFileFormat(file.name)}`;
    const extra = {
      fname: file.name,
      mimeType: opt.types,
      params: opt.params || {},
    };
    const config = ext(
      opt.config,
      {
        useCdnDomain: true,
        region: qiniu.region.z2,
      },
    );
    return new Promise(((resolve, reject) => {
      qiniu.upload(file, name, token, extra, config).subscribe(
        opt.next || ((ret) => {
          // console.log(`上传中：${ret.total.percent}%`);
        }),
        reject,
        ret => resolve(GHM_QINIU_API + ret.key),
      );
    }));
  });
}
/**
 * 上传七牛云
 * @param em Element input[type='file']
 * @param opt object json 选项
 *    foleder: string 上传文件位置
 *    types: array [七牛云]限制类型mimeType 默认:['image/png', 'image/jpeg', 'image/gif']
 *          若设置,替换整个默认
 *    params: json [七牛云]用来放置自定义变量  默认: {}
 *    config: json [七牛云]上传配置 默认: {useCdnDomain:true, region:qiniu.region.z2}
 *          若设置,对未设置项的默认保留
 *          配置优先级: 参数opt.config > GHM_config.qiniuUpdate > 默认项
 *    next: function 上传进度的回调函数
 * @return Promise
 */

const upload = function (em, opt) {
  const $pms = [];
  const files = em.files || em;

  for (let i = 0; i < files.length; i++) $pms.push(update(files[i], opt));
  return Promise.all($pms).then((arr) => {
    em.value = '';
    return arr;
  }).catch(err => err);
};

/**
 * 单个Blob上传
 * @param blob Blob 上传的Blob对象 需要
 *    blob.name string 原来的文件名
 * @param opt json|null 同update()的参数opt
 */
upload.blob = function (blob, opt) {
  return getToken().then((token) => {
    opt = ext(opt, {
      types: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'],
    });
    const name = `${opt.folder}/${createUId()}.${getFileFormat(blob.name)}`;
    const extra = {
      fname: blob.name,
      mimeType: opt.types,
      params: opt.params || {},
    };
    const config = ext(
      opt.config,
      {
        useCdnDomain: true,
        region: qiniu.region.z2,
      },
    );

    return new Promise(((resolve, reject) => {
      qiniu.upload(blob, name, token, extra, config).subscribe(
        opt.next || (() => {
          /* console.log('上传中：' + ret.total.percent + '%'); */
        }),
        reject,
        ret => resolve(GHM_QINIU_API + ret.key),
      );
    }));
  });
};

export default upload;
