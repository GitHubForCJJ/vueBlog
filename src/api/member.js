/*
 * 消息接口
 * @Author: 陈建军
 * @Date: 2019-11-8 09:19:43
 * @Last Modified by: 陈建军
 * @Last Modified time: 2019-11-8 09:19:43
 */

import axios from '@/utils/request';

const member = {
    resetPsw (obj) {
        var up = {};
        up.Update = obj;
        if (obj.Password != '' || obj.Password.length > 0) {
            obj.Password = '';
        }
        return axios({
            url: '/Member/ResetPsw',
            data: { Data: JSON.stringify(up) },
            encrypt: false,
        });
    },
    // 注册
    registItemMember (obj) {
        var up = {};
        up.Update = obj;
        window.console.log(obj)
        return axios({
            url: '/Member/RegistItemMember',
            data: { Data: JSON.stringify(up) },
            encrypt: false,
        });
    },
    sendQrcode (account, codekey) {
        return axios({
            url: '/Member/SendQrcode',
            data: { Data: JSON.stringify({ QrcodeKey: codekey, UserAccount: account }) },
            encrypt: false,
        });
    },
    memberLogin (obj) {

        return axios({
            url: '/Member/MemberLogin',
            data: { Data: JSON.stringify(obj) },
            encrypt: false,
        })

    },
    updateMember (obj) {

        return axios({
            url: '/Member/UpdateMember',
            data: { Data: JSON.stringify(obj) },
            encrypt: false,
        })

    },

}

export default member;
