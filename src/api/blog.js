/*
 * 消息接口
 * @Author: 陈建军
 * @Date: 2019-11-8 09:19:43
 * @Last Modified by: 陈建军
 * @Last Modified time: 2019-11-8 09:19:43
 */

import axios from '@/utils/request';

const msg = {
    // 获取会员的消息
    getListBlog (obj, page, limit) {
        return axios({
            url: '/Blog/GetListBlog',
            data: { Data: JSON.stringify(obj), Limit: limit, Page: page },
            encrypt: false,
        });
    },
    getItemBlog (obj) {
        return axios({
            url: '/Blog/GetItemBlog',
            data: { Data: JSON.stringify(obj) },
            encrypt: false,
        });
    },
};

export default msg;
