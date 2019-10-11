import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { pwdLogin, AuditStatus, getCheckCode } from './service';
import { UserType } from '@/services/user';

export default {
  namespace: 'loginAccount',
  state: {
    text: 'loading...',
  },

  effects: {
    *pwdLogin({ payload }, { call, put }) {
      const { mobileNumber, password, remember } = payload;
      const result = { mobileNumber, password, userSource: 500 }
      const { ok, msg, data } = yield call(pwdLogin, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'user/saveCurrentUser', payload: data, remember });
      const { auditStatus, userType } = data;
      if (userType === UserType.registerfactory) {
        if (auditStatus === AuditStatus.unAudit) {
          yield put(routerRedux.push('/register/auditing'));
        } else if (auditStatus === AuditStatus.success) {
          yield put(routerRedux.push('/'));
        } else {
          yield put(routerRedux.push('/register/reject'));
        }
      } else {
        yield put(routerRedux.push('/'));
      }
    },
    *codeLogin({ payload }, { call, put }) {
      const { mobileNumber, code } = payload;
      const result = { mobileNumber, code, userSource: 500 }
      const { ok, msg, data } = yield call(pwdLogin, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'user/saveUser', payload: data });
      const { auditStatus, userType } = data;
      if (userType === UserType.registerfactory) {
        if (auditStatus === AuditStatus.unAudit) {
          yield put(routerRedux.push('/register/auditing'));
        } else if (auditStatus === AuditStatus.success) {
          yield put(routerRedux.push('/'));
        } else {
          yield put(routerRedux.push('/register/reject'));
        }
      } else {
        yield put(routerRedux.push('/'));
      }
    },
    *getCheckCode({ payload }, { call }) {
      const params = { ...payload, smsType: 1 }
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
