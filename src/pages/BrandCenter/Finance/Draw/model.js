import { message } from 'antd';
import { getData, review, PayStatus, doPay, getPayInfo, ReivewStatus } from './service';

const InitState = {
  data: [],
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
};

export default {
  namespace: 'financeDraw',
  state: InitState,

  effects: {
    *getList({ payload }, { call, put, select }) {
      if (payload) {
        yield put({
          type: 'setPagination',
          payload,
        });
      }
      const finance = yield select(state => state.financeDraw);
      const params = {
        pageSize: finance.pagination.pageSize,
        pageIndex: finance.pagination.current,
      };
      const { data, ok, msg } = yield call(getData, params);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'saveList',
        payload: { data },
      });
    },
  },

  reducers: {
    saveList(state, { payload }) {
      const { data } = { ...payload };
      return {
        ...state,
        data: data.list,
        pagination: {
          ...state.pagination,
          total: data.resultCount,
        },
      };
    },
    setPagination(state, { payload }) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: payload.current,
          pageSize: payload.pageSize,
        },
      };
    },
    destory() {
      return InitState;
    },
  },
};
