import request from '@/utils/request';

export const MODEL_NAMES = {
    HOME: 'home',
    PRODUCTION: 'production',
    COMPANY: 'brand',
    DESIGNER: 'designer',
}

export const BANNER_CONFIG = {
    home: {
        pageIndex: 1,
        pageSize: 5,
        showAddress: 1,
        classify: 1,
    },
    production: {
        pageIndex: 1,
        pageSize: 5,
        showAddress: 2,
        classify: 1,
    },
    brand: {
        pageIndex: 1,
        pageSize: 5,
        showAddress: 3,
        classify: 1,
    },
    designer: {
        pageIndex: 1,
        pageSize: 5,
        showAddress: 4,
        classify: 1,
    },
}

export function getBannerData({
pageIndex, /* 页码 */
pageSize, /* 每页条数 */
showAddress, /* 1 首页  2 作品集页面  3 工厂集页面  4 设计师列表页 */
classify, /*  1 轮播图   2 广告位 */
}) {
   return request('/gms/resources/rotationList/1.2', {
     method: 'POST',
     params: {
        pageIndex,
        pageSize,
        showAddress,
        classify,
     },
   });
}
