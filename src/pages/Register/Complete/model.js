import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getDic, completeUser, SecondType, completeFactoryFirst, completeFactorySecond, getAuthen } from './service';


export default {
  namespace: 'registerComplete',

  state: {
    secondStatus: SecondType.First,
    provinces: [],
    cities: [],
    list: [],
    data: null,
  },

  effects: {
    *getOcc(_, { call, put }) {
      const params = { dataType: 1 }
      const { ok, msg, data } = yield call(getDic, params);
      const occList = [...data, ...[{ dataId: -1, dataName: '其它' }]];
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'save',
        payload: {
          list: occList,
        },
      });
    },
    *getProvince(_, { call, put }) {
      const params = { dataType: 1 }
      const { ok, msg, data } = yield call(getDic, params);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'saveProvince',
        payload: {
          provinces: data,
        },
      });
    },
    *getCity({ payload }, { call, put }) {
      const params = { dataType: 2, superDataId: payload };
      const { ok, msg, data } = yield call(getDic, params);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'saveCity',
        payload: {
          cities: data,
        },
      });
    },
    *completeUser({ payload }, { call, put }) {
      const result = { ...payload, headImage: payload.headImage[0].server, birthday: payload.birthday.format('YYYY-MM-DD HH:mm:ss') };
      const { ok, msg } = yield call(completeUser, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('编辑成功！');
      yield put(routerRedux.push('/register/success'));
    },
    *completeFactoryFirst({ payload }, { call, put }) {
      const result = {
        ...payload,
        companyLogo: payload.companyLogo[0].server,
        licensePicture: payload.licensePicture[0].server,
      };
      const { ok, msg } = yield call(completeFactoryFirst, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('编辑成功！');
      yield put({
        type: 'updateStep',
        payload: SecondType.Second,
      });
    },
    *completeFactorySecond({ payload }, { call, put }) {
      const result = {
        ...payload,
        idFrontPhoto: payload.idFrontPhoto[0].server,
        idBackPhoto: payload.idBackPhoto[0].server,
      };
      const { ok, msg } = yield call(completeFactorySecond, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('编辑成功！');
      yield put(routerRedux.push('/register/success'));
    },
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
    saveProvince(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveCity(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateStep(state, { payload }) {
      return {
        ...state,
        secondStatus: payload,
      };
    },
  },
};
