import request from '@/utils/request';

export const ShelfType = {
  get draft() {
    return 0;
  }, // 下架
  get putAway() {
    return 1;
  }, // 上架
  get soldOut() {
    return 2;
  }, // 下架
  get audit() {
    return 3;
  }, // 审核中
};

export const SortType = {
  get time() {
    return null;
  }, // 更新时间
  get show() {
    return 7;
  }, // 展示顺序
};

export function getData(params) {
  return request('/gms/info/goodsinfoList/1.2', { method: 'post', data: params });
}

export function saveShelf(params) {
  return request(`/gms/info/updownshelf/${params.id}/${params.status}`);
}

export function setTop(params) {
  return request('/gms/info/top/1.2', { method: 'get', params });
}
