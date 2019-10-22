import { getDesignList, getCatelogs } from './service';
import extendBaseModel from '@/pages/BaseCatelogPage/model';

export default extendBaseModel({
  namespace: 'production',
  effects: {
    *fetchDataList(_, { put, select }) {
      console.log('p_model_this:', this)
      const params = yield select(state => state.production.queryParams);
      const { data = {} } = yield getDesignList(params);
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
      const { data } = yield getCatelogs({ dataType: 9 })
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
