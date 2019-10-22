import { message } from 'antd';
import { getCode, modifyPwd, modifyMobile } from './service';

export default {
  namespace: 'brandCenterConfig',
  state: {
    showModal: 0, // 0 null 1 security 2 phone
  },

  effects: {
    *fetch(_, { call, put }) {
      // const { text } = yield call(getText);
      // yield put({
      //   type: 'save',
      //   payload: {
      //     text,
      //   },
      // });
    },
    *fetchCode({ mobileNumber, smsType }, { call }) {
      const { ok, msg } = yield call(getCode, mobileNumber, smsType);
      if (!ok) {
        message.error(msg);
      }
    },
    *modifyPwd({ code, newPwd }, { call, put }) {
      const { ok } = yield call(modifyPwd, code, newPwd);
      if (!ok) {
        message.error('密码修改失败');
      } else {
        message.success('密码重置成功');
        yield put({
          type: 'reset',
        });
      }
    },
    *modifyMobile({ oldCode, newMobileNumber, newCode }, { call, put }) {
      const { ok } = yield call(modifyMobile, oldCode, newMobileNumber, newCode);
      if (!ok) {
        message.error('手机更换失败');
      } else {
        message.success('手机更换成功');
        yield put({
          type: 'reset',
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    reset(state) {
      return {
        ...state,
        mobile: null,
        code1: null,
        code21: null,
        code22: null,
        newPwd: null,
        showModal: 0,
      }
    },
  },
};
