import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { retrievePwd, getCheckCode } from './service';

export default {
  namespace: 'forget',
  state: {
  },

  effects: {
    *retrievePwd({ payload }, { call, put }) {
      const result = { ...payload };
      delete result.password1;
      const { ok, msg } = yield call(retrievePwd, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('重置密码成功！');
      yield put(routerRedux.push('/login'));
    },
    *getCheckCode({ payload }, { call }) {
      const params = { ...payload, smsType: 3 }
      const { ok, msg } = yield call(getCheckCode, { ...params });
      if (!ok) {
        message.error(msg);
        return false;
      }
      return true;
    },
  },

  reducers: {
  },
};
