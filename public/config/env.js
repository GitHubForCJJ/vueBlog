(function (window, fn) {
    window.config = fn();
}(window, () => {
    // 开发环境
    const { hostname } = window.location;
    const DEV = {
        baseURL: 'http://cjjapi.blog.com/api',
        baseDomain: 'http://wdmain.dzxz.com/',
    };
    // 预发布环境
    const PROTEST = {
        baseURL: 'https://testapi.lieweiyou.cn/api',
        baseDomain: 'http://testadmin.lieweiyou.cn',
    };
    // 生产环境
    const PRO = {
        baseURL: 'https://api.lieweiyou.cn/api',
        baseDomain: 'http://admin.lieweiyou.cn',
    };
    // 生产环境
    const PRO_B = {
        baseURL: 'https://api.lieweiyou.com/api',
        baseDomain: 'http://admin.lieweiyou.com',
    };
    // 测试环境
    const TES = {
        baseURL: 'http://testwdapi.dzxz.com/api',
        baseDomain: 'http://testwdmain.dzxz.com',
    };
    if (hostname.indexOf('localhost' > -1)) {
        return DEV;
    }
    if (hostname === 'testwap.lieweiyou.cn') {
        return PROTEST;
    }
    if (hostname === 'wap.lieweiyou.cn') {
        return PRO;
    }
    if (hostname === 'wap.lieweiyou.com') {
        return PRO_B;
    }
    if (hostname === 'testwdh5.dzxz.com') {
        return TES;
    }
    return DEV;
}));
