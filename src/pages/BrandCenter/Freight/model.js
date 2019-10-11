import { message } from 'antd';
import {
  getData,
  getRegionData,
  pageState,
  billingMethod as BM,
  packageMethod as PM,
} from './service';
import { displayYuan } from '@/utils/utils';

export default {
  namespace: 'brandCenterFreight',
  state: {
    data: [],
    regionData: [],
    pageCount: 0,
    loading: false,
  },

  effects: {
    *fetch({ page = 1 }, { call, put }) {
      yield put({
        type: 'save',
        payload: { loading: true, page },
      });
      const { ok, data } = yield call(getData, page, pageState.PAGESIZE);
      if (!ok || !data) {
        message.error('运费列表加载失败');
        return;
      }
      const pageCount = data.resultCount || 0;
      yield put({
        type: 'save',
        payload: { data: data.resultList, pageCount },
      });
      yield put({
        type: 'fetchRegionData',
      });
      yield put({
        type: 'modifyData',
      });
      yield put({
        type: 'save',
        payload: { loading: false },
      });
    },
    *fetchRegionData(_, { call, put }) {
      const { ok, data } = yield call(getRegionData);

      if (!ok || !data) {
        message.error('地区信息加载失败');
        return;
      }
      yield put({
        type: 'save',
        payload: { regionData: data.list },
      });
      yield put({
        type: 'modifyRegionData',
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
    modifyData(state) {
      const { data } = state;
      let i = 1;
      let newData = data;
      if (!data) {
        return { ...state };
      }

      newData = data.map(v => {
        const v2 = v;
        v2.fakeID = i;
        i += 1;
        v2.billingMethodName = v2.billingMethod === BM.THING ? '按件计费' : '按重计费';
        if (v2.packageMethod === PM.COUNT) {
          v2.packageMethodName = `数量达${v2.packageNumber}`;
        } else if (v2.packageMethod === PM.MONEY) {
          v2.packageMethodName = `金额达${displayYuan(v2.packageNumber)}`;
        } else {
          v2.packageMethodName = '无';
        }
        return v2;
      });

      return {
        ...state,
        data: [...newData],
      };
    },
    modifyRegionData(state) {
      const { regionData } = state;

      // key title value children
      const newRegionData = regionData.map(v => {
        const new1 = v;
        new1.title = v.dataName;
        new1.key = v.dataId;
        new1.value = v.dataName;
        if (v.sonList) {
          new1.children = v.sonList.map(v2 => {
            const new2 = v2;
            new2.title = v2.dataName;
            new2.key = v2.dataId;
            new2.value = v2.dataName;
            return new2;
          });
        }
        return new1;
      });
      return {
        ...state,
        regionData: [...newRegionData],
      };
    },
  },
};
