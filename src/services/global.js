import request from '@/utils/request';

export const BANNER_CONFIG = {
    // home页面的Banner获取参数
    home: {
        showAddress: 1,
        classify: 1,
    },
    // 作品页面的Banner获取参数
    production: {
        showAddress: 2,
        classify: 1,
    },
    // 企业页面的Banner获取参数
    brand: {
        showAddress: 3,
        classify: 1,
    },
    // 设计师页面的Banner获取参数
    designer: {
        showAddress: 4,
        classify: 1,
    },
}

export function getBannerData({
showAddress, /* 1 首页  2 作品集页面  3 工厂集页面  4 设计师列表页 */
classify, /*  1 轮播图   2 广告位 */
}) {
   return request('/gms/resources/banner/1.2', {
     method: 'GET',
     params: {
        showAddress,
        classify,
     },
   });
}
