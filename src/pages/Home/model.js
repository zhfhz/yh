import { getText } from './service';
import { BANNER_CONFIG, getBannerData } from '@/services/global';

export default {
  namespace: 'home',
  state: {
    bannerData: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const { text } = yield call(getText);
      yield put({
        type: 'save',
        payload: {
          text,
        },
      });
    },
    *fetchBannerData (_, { put }) {
      const { data } = yield getBannerData(BANNER_CONFIG.home);
      yield put({
        type: 'save',
        payload: {
            bannerData: data,
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
