/*
 * 消息接口
 * @Author: 陈建军
 * @Date: 2019-11-8 09:19:43
 * @Last Modified by: 陈建军
 * @Last Modified time: 2019-11-8 09:19:43
 */

import axios from '@/utils/request';

const blog = {

    //获取评论列表
    getComments (blogNum) {
        var obj = {};
        obj.num = blogNum;
        return axios({
            url: '/Comment/GetBlogComments',
            data: JSON.stringify(obj),
            encrypt: false,
        });
    },
    // 获取会员的消息
    getListBlog (type, page, limit) {
        return axios({
            url: '/Blog/GetListBlog',
            data: JSON.stringify({ KID: type, Limit: limit, Page: page }),
            encrypt: false,
        });
    },
    getItemBlog (obj) {
        return axios({
            url: '/Blog/GetItemBlog',
            data: JSON.stringify(obj),
            encrypt: false,
        });
    },
    //获取上下篇
    getPrenext (obj) {
        return axios({
            url: '/Blog/GetPrenextBlog',
            data: JSON.stringify(obj),
            encrypt: false,
        })

    },
    //获取文章类型列表
    getBlogTypeList () {
        return axios({
            url: '/Blog/GetListBlogTypes',
            data: {},
            encrypt: false,
        })
    },
    //点赞
    addPraise (token, blognum) {
        return axios({
            url: '/Blog/AddPraise',
            data: JSON.stringify({ BlogNum: blognum, Token: token }),
            encrypt: false,
        })
    },
    isOrNotPraise (memberid, blognum) {
        return axios({
            url: '/Blog/IsOrNotPraise',
            data: JSON.stringify({ where: { BlogNum: blognum, MemberId: memberid } }),
            encrypt: false,
        })
    }

}

export default blog;
