import { getCompanyList, getCatelogs } from './service';
import extendBaseModel from '@/pages/BaseCatelogPage/model';

export default extendBaseModel({
  namespace: 'brand',
  effects: {
    *fetchDataList(_, { put, select }) {
      const params = yield select(state => state.brand.queryParams);
      const { data = {} } = yield getCompanyList(params);
      yield put({
        type: 'save',
        payload: {
          dataList: data.resultList || [],
          pageTotal: data.resultCount || 0,
        },
      })
      return data;
    },
    *fetchCatelogData (_, { put }) {
      const { data } = yield getCatelogs({ dataType: 8 })
      yield put({
        type: 'save',
        payload: {
          catelogData: data.map(item => ({ text: item.dataName, value: item.dataId })),
        },
      });
    },
    *fetchSortOptions () {
        yield null;
        throw new Error('fetchSortOptions 还没有实现');
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
