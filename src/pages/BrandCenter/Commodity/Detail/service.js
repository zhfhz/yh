import request from '@/utils/request';

export function getGoodsInfo(params) {
  return request(`/gms/info/goodsinfo/${params.id}/1.2`);
}

export function getBannerList(params) {
  return request(`/gms/picture/carousel/${params.goodsId}`);
}

export function getPictureDetail(params) {
  return request(`/gms/picture/details/${params.goodsId}`);
}

export function getSpecsDetail(params) {
  return request(`/gms/specs/details/${params.goodsId}`);
}
