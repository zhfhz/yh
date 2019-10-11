import { message } from 'antd';
import { getDynamicList, getOrderTrade } from './service';
import { ChartsType } from './commons';

export default {
  namespace: 'brandCenterHome',
  state: {
    text: 'loading...',
    dynamicList: [],
    chartList: [],
    timeType: ChartsType.week, // 默认本周
  },

  effects: {
    *fetch(_, { put, all }) {
      yield all([put({ type: 'getDynamicList' }), put({ type: 'getOrderTrade' })]);
    },
    *getDynamicList(_, { put, call }) {
      const { ok, data, msg } = yield call(getDynamicList);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateState', payload: { dynamicList: data.list } });
    },
    *getOrderTrade(_, { put, call, select }) {
      const timeType = yield select(state => state.brandCenterHome.timeType);
      const { ok, data, msg } = yield call(getOrderTrade, { timeType });
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateState', payload: { chartList: data } });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
