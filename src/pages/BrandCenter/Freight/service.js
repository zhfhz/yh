import request from '@/utils/request';

export function getData(pageIndex, pageSize) {
  return request('/sys/freight/freightTemplate', {
    params: {
      pageIndex,
      pageSize,
    },
  });
}

export function getRegionData() {
  return request('/sys/freight/dictionaries');
}

// 分页状态
export const pageState = {
  // 每页行数
  get PAGESIZE() { return 10; },
};

export const billingMethod = {
  get THING() { return 1; },
  get WEIGHT() { return 2; },
};

export const packageMethod = {
  get NONE() { return 0; },
  get COUNT() { return 1; },
  get MONEY() { return 2; },
};
