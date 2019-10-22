import { getDesignerList, getCatelogs } from './service';
import { BANNER_CONFIG, getBannerData } from '@/services/global';
import extendBaseModel from '@/pages/BaseCatelogPage/model';

export default extendBaseModel({
  namespace: 'designer',
  effects: {
    *fetchDataList(_, { put, select }) {
      const params = yield select(state => state.designer.queryParams);
      const { data = {} } = yield getDesignerList(params);
      yield put({
        type: 'save',
        payload: {
          dataList: data.list || [],
          pageTotal: data.resultCount || 0,
        },
      })
      return data;
    },
    *fetchCatelogData (_, { put }) {
      const { data } = yield getCatelogs({ dataType: 6 })
      yield put({
        type: 'save',
        payload: {
          catelogData: data.map(item => ({ text: item.dataName, value: item.dataId })),
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
});
