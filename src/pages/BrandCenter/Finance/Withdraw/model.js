import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { saveData, getFinanceInfo } from './service';

const InitState = {
  data: {
    withdrawAmount: '',
    withdrawAccountName: '',
    withdrawCardNo: '',
    withdrawBankName: '',
    depositBankName: '',
    telephone: '',
  },
  financeInfo: {
    accountBalances: null,
    withdrawableBalance: null,
    taxRefundAmount: null,
  },
};

export default {
  namespace: 'financeWithdraw',
  state: InitState,

  effects: {
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
    *saveData(_, { put, call, select }) {
      const finance = yield select(state => state.financeWithdraw);
      const params = finance.data;
      const { ok, msg } = yield call(saveData, params);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'redirect',
      });
    },
    *redirect(_, { put }) {
      yield put({ type: 'brandCenterFinance/getList' });
      yield put(routerRedux.push('/center/brandcenter/finance'));
    },
  },

  reducers: {
    updateAllData(
      state,
      {
        payload: { values },
      },
    ) {
      return {
        ...state,
        data: values,
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
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    destory() {
      return InitState;
    },
  },
};
