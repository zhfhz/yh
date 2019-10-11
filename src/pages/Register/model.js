import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getCheckCode, registerUser } from './service';

export default {
  namespace: 'register',
  state: {
    text: 'loading...',
  },

  effects: {
    *getCheckCode({ payload }, { call }) {
      const params = { ...payload, smsType: 2 }
      const { ok, msg } = yield call(getCheckCode, { ...params });
      if (!ok) {
        message.error(msg);
        return false;
      }
      return true;
    },
    *registerUser({ payload }, { call, put }) {
      const result = { ...payload };
      delete result.password1;
      delete result.agreement;
      const { ok, msg, data } = yield call(registerUser, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('注册成功！');
      yield put({
        type: 'save',
        payload: data,
      });
      yield put({ type: 'user/saveUser', payload: data });
      yield put(routerRedux.push('/register/complete'));
    },
  },

  reducers: {
    // save(state, { payload }) {
    //   put({ type: 'user/saveCurrentUser', payload: data }),
    //   storeUser({ user: payload });
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    // },
  },
};
