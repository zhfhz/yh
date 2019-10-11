import { message } from 'antd';
import { getFinanceInfo, getList } from './service';

const InitState = {
  data: [],
  cardOptions: [],
  attributionOptions: [],
  financeInfo: {
    accountBalances: null, // 账户余额
    withdrawableBalance: null, // 可提现金额
    taxRefundAmount: null, // 税收返税总金额
  },
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  searchObj: {
    transactionType: null, // 交易类型
    transactionWay: null, // 交易方式
    transactionStatus: null, // 交易状态
  },
};

// 交易类型
export const financeType = [
  { label: '全部', value: null },
  { label: '入账', value: 0 },
  { label: '提现', value: 1 },
];
// 交易方式
export const financeWay = [
  { label: '全部', value: null },
  { label: '线上支付', value: 0 },
  { label: '线下打款', value: 1 },
];
// 交易状态
export const financeStatus = [
  { label: '全部', value: null },
  { label: '冻结中', value: 0 },
  { label: '已到账', value: 1 },
  { label: '已退款', value: 2 },
];

export default {
  namespace: 'brandCenterFinance',
  state: InitState,

  effects: {
    *getList({ payload }, { call, put, select }) {
      if (payload) {
        yield put({
          type: 'setPagination',
          payload,
        });
      }
      const finance = yield select(state => state.brandCenterFinance);
      const params = {
        pageSize: finance.pagination.pageSize,
        pageIndex: finance.pagination.current,
        transactionType: finance.searchObj.transactionType,
        transactionWay: finance.searchObj.transactionWay,
        transactionStatus: finance.searchObj.transactionStatus,
      };
      const { data, ok, msg } = yield call(getList, params);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'saveList',
        payload: { data },
      });
    },
    // 查询财务信息
    *getFinanceInfo(_, { call, put }) {
      const { data, ok, msg } = yield call(getFinanceInfo);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'saveFinanceInfo',
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
    saveFinanceInfo(
      state,
      {
        payload: { data },
      },
    ) {
      return {
        ...state,
        financeInfo: data,
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
    changeFinanceState(state, { payload }) {
      // 状态
      return {
        ...state,
        searchObj: {
          ...state.searchObj,
          transactionStatus: payload,
        },
      };
    },
    changeFinanceWay(state, { payload }) {
      // 状态
      return {
        ...state,
        searchObj: {
          ...state.searchObj,
          transactionWay: payload,
        },
      };
    },
    changeFinanceType(state, { payload }) {
      // 状态
      return {
        ...state,
        searchObj: {
          ...state.searchObj,
          transactionType: payload,
        },
      };
    },
    release() {
      return InitState;
    },
  },
};
