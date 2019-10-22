import { message } from 'antd';
import { routerRedux } from 'dva/router';
import {
  getDic,
  getInfo,
  completeUser,
  SecondType,
  completeFactoryFirst,
  completeFactorySecond,
} from './service';

export default {
  namespace: 'brandCenterRegisterMaterial',
  state: {
    secondStatus: SecondType.First,
    provinces: [],
    cities: [],
    list: [],
    factoryInfo: {
      applyId: null,
      enterpriseName: '',
      shopName: '',
      industry: '',
      province: '',
      city: '',
      companyLogo: '',
      licenseNumber: '',
      licensePicture: '',
      companyProfile: '',
      legalName: '',
      legalIdentityCard: '',
      legalPhone: '',
      idFrontPhoto: '',
      idBackPhoto: '',
      contactName: '',
      contactDuties: '',
      contactPhone: '',
      rejectReason: '',
      approvalStatus: null,
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      const { ok, msg, data } = yield call(getInfo);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'save',
        payload: {
          factoryInfo: data,
        },
      });
    },
    *getOcc(_, { call, put }) {
      const params = { dataType: 1 };
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
      const params = { dataType: 1 };
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
      const result = {
        ...payload,
        headImage: payload.headImage[0].server,
        birthday: payload.birthday.format('YYYY-MM-DD HH:mm:ss'),
      };
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
        enterpriseName: payload.enterpriseName,
        shopName: payload.shopName,
        industryId: payload.industryId,
        province: payload.province,
        industryName: payload.industryName,
        city: payload.city,
        licenseNumber: payload.licenseNumber,
        companyProfile: payload.companyProfile,
        companyLogo: payload.companyLogo[0].server,
        licensePicture: payload.licensePicture[0].server,
      };
      const { ok, msg } = yield call(completeFactoryFirst, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('编辑成功！');
      // yield put({
      //   type: 'updateStep',
      //   payload: SecondType.Second,
      // });
    },
    *completeFactorySecond({ payload }, { call, put }) {
      const result = {
        legalName: payload.legalName,
        legalIdentityCard: payload.legalIdentityCard,
        legalPhone: payload.legalPhone,
        code: payload.code,
        contactName: payload.contactName,
        contactDuties: payload.contactDuties,
        contactPhone: payload.contactPhone,
        idFrontPhoto: payload.idFrontPhoto[0].server,
        idBackPhoto: payload.idBackPhoto[0].server,
      };
      const { ok, msg } = yield call(completeFactorySecond, { ...result });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('编辑成功！');
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
