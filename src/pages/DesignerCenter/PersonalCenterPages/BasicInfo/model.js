import { message } from 'antd';
import moment from 'moment';
import { changeUserInfo, getUserInfo } from './service';
import { getDic, DicDataType } from '@/pages/Register/Complete/service';

export default {
  namespace: 'designerCenterBasicInfo',
  state: {
    images: [],
    showOccupation: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          nickName: null,
        },
      });
      const { ok, data } = yield call(getUserInfo);
      if (!ok || !data) {
        message.error('个人信息获取失败');
      }
      const res = {
        nickName: data.nickName,
        headImage: data.headImage,
        sex: data.sex,
        birthday: moment(data.birthday),
        occupationId: data.occupationId,
        occupation: data.occupation,
        province: data.province,
        city: data.city,
        autograph: data.autograph,
      };
      yield put({
        type: 'save',
        payload: {
          ...res,
          showOccupation: data.occupation === '其他',
        },
      });
    },
    *changeInfo({ params, setFieldsValue }, { call, put }) {
      const { ok, msg } = yield call(changeUserInfo, params);
      if (!ok) {
        message.error(msg);
      } else {
        message.success('个人资料修改成功');
      }
      yield put({
        type: 'fetch',
        setFieldsValue,
      });
    },
    *getOcc(_, { call, put }) {
      const params = { dataType: DicDataType.UserJobs }
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
      const params = { dataType: DicDataType.Provinces }
      const { ok, msg, data } = yield call(getDic, params);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'save',
        payload: {
          provinces: data,
        },
      });
    },
    *getCity({ payload }, { call, put }) {
      const params = { dataType: DicDataType.Cities, superDataId: payload };
      const { ok, msg, data } = yield call(getDic, params);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({
        type: 'save',
        payload: {
          cities: data,
        },
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
  },
};
