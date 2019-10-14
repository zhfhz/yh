import * as service from './service';

export default {
  namespace: 'brandDetail',
  state: {
    userInfo: {},
    content: '',
    options: [
      {
        text: '企业简介',
        value: '0',
        checked: true,
      },
      {
        text: '荣誉资质',
        value: '1',
      },
      {
        text: '产品服务',
        value: '2',
      },
      {
        text: '企业风采',
        value: '3',
      },
    ],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(service.getCompanyInfo, payload.id);
      yield put({
        type: 'save',
        payload: {
          userInfo: data,
        },
      });
    },
    *getCompanyInfo({ payload }, { call, put }) {
      const { data } = yield call(service[`getCompanyInfo${payload.optionValue}`], payload.id);
      yield put({
        type: 'save',
        payload: {
          content: data,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
