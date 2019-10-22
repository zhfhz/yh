import { message } from 'antd';
import { getCompanyInfo, getAmountInfo } from './service';

export default {
  namespace: 'brandCenter',
  state: {
    text: 'loading...',
    companyInfo: {
      companyLogo: '', // logo
      enterpriseName: '', // 工厂名称
      platformName: '', // 入驻智造谷名称
      companySlogan: '', // 企业slogan信息
      labelList: [], // 企业标签
    },
    amountInfo: {
      salesAmount: null, // 商品销售总额
      goodsNum: null, // 在售商品数
      refundAmount: null, // 累计返税
    },
  },

  effects: {
    *fetch(_, { put, all }) {
      yield all([put({ type: 'getCompanyInfo' }), put({ type: 'getAmountInfo' })]);
    },
    *getCompanyInfo(_, { put, call }) {
      const { ok, data, msg } = yield call(getCompanyInfo);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateCompanyInfo', payload: { data } });
    },
    *getAmountInfo(_, { put, call }) {
      const { ok, data, msg } = yield call(getAmountInfo);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateAmountInfo', payload: { data } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    updateCompanyInfo(
      state,
      {
        payload: { data },
      },
    ) {
      return {
        ...state,
        companyInfo: data,
      };
    },

    updateAmountInfo(
      state,
      {
        payload: { data },
      },
    ) {
      return {
        ...state,
        amountInfo: data,
      };
    },
  },
};
