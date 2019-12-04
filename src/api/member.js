/*
 * 消息接口
 * @Author: 陈建军
 * @Date: 2019-11-8 09:19:43
 * @Last Modified by: 陈建军
 * @Last Modified time: 2019-11-8 09:19:43
 */

import axios from '@/utils/request';

const member = {
    // 获取会员的消息
    registItemMember (obj) {
        var up = {};
        up.Update = obj;
        return axios({
            url: '/Member/RegistItemMember',
            data: JSON.stringify(up),
            encrypt: false,
        });
    },
    sendQrcode (codekey) {
        return axios({
            url: '/Member/SendQrcode',
            data: JSON.stringify({ key: codekey }),
            encrypt: false,
        });
    },
    memberLogin (account, pass) {
        return axios({
            url: '/Member/MemberLogin',
            data: JSON.stringify({ UserAccount: account, UserPassword: pass }),
            encrypt: false,
        })

    },

}

export default member;
