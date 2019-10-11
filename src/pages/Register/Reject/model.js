import { message } from 'antd';
import { getAuthen } from './service';

export default {
  namespace: 'reject',
  state: {
    data: null,
  },

  effects: {
    *getAuthen(_, { call, put }) {
      const { ok, msg, data } = yield call(getAuthen);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'save',
        payload: { data },
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
    // saveProvince(state, { payload }) {
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    // },
    // saveCity(state, { payload }) {
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    // },
  },
};
