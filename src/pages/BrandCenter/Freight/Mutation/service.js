import request from '@/utils/request';

export const billingMethod = {
  get THING() {
    return 1;
  },
  get WEIGHT() {
    return 2;
  },
};

export const packageMethod = {
  get NONE() {
    return 0;
  },
  get COUNT() {
    return 1;
  },
  get MONEY() {
    return 2;
  },
};

export const generalState = {
  get FARE_TEMPLATE_MAX() {
    return 5;
  },
};

export function postTemplate(data) {
  return request('/sys/freight/freightTemplate', {
    method: 'post',
    data,
  });
}

export function putTemplate(data) {
  return request('/sys/freight/freightTemplate', {
    method: 'put',
    data,
  });
}

export function deleteTemplate(templateId) {
  return request('/sys/freight/freightTemplate', {
    method: 'delete',
    params: { templateId },
  });
}
