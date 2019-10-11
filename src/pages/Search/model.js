import { getSearchResultTotal, getSearchResult0, getSearchResult1, getSearchResult2 } from './service';

export default {
  namespace: 'search',
  state: {
    queryParams: {
      pageIndex: 1,
      pageSize: '30',
    },
    pageTotal: 0,
    pageSizeOptions: [
        '10',
        '20',
        '30',
        '40',
        '50',
    ],
    dataList: [],
    totalCount: 0,
    options: [
        {
            text: '原创作品 (0)',
            checked: true,
            value: '0',
        },
        {
            text: '设计师 (0)',
            value: '1',
        },
        {
            text: '企业&品牌 (0)',
            value: '2',
        },
    ],
  },

  effects: {
    *getSearchResultTotal({ payload }, { call, put }) {
      const { data } = yield call(getSearchResultTotal, payload);
      const totalCount = Number(data.worksNo) + Number(data.designerNo) + Number(data.enterpriseNo);
      yield put({
        type: 'save',
        payload: {
          totalCount,
          options: [
            {
                text: `原创作品 (${data.worksNo || 0})`,
                value: '0',
                checked: true,
            },
            {
                text: `设计师 (${data.designerNo || 0})`,
                value: '1',
            },
            {
                text: `企业&品牌 (${data.enterpriseNo || 0})`,
                value: '2',
            },
          ],
        },
      });
      return totalCount;
    },
    *getDataList0({ payload }, { call, put, select }) {
      const queryParams = yield select(state => state.search.queryParams);
      const { data = {} } = yield call(getSearchResult0, { ...queryParams, ...payload });
      yield put({
        type: 'save',
        payload: {
          dataList: data.list || [],
          pageTotal: data.resultCount || 0,
        },
      });
    },
    *getDataList1({ payload }, { call, put, select }) {
      const queryParams = yield select(state => state.search.queryParams);
      const { data = {} } = yield call(getSearchResult1, { ...queryParams, ...payload });
      yield put({
        type: 'save',
        payload: {
          dataList: data.list || [],
          pageTotal: data.resultCount || 0,
        },
      });
    },
    *getDataList2({ payload }, { call, put, select }) {
      const queryParams = yield select(state => state.search.queryParams);
      const { data = {} } = yield call(getSearchResult2, { ...queryParams, ...payload });
      yield put({
        type: 'save',
        payload: {
          dataList: data.resultList || [],
          pageTotal: data.resultCount || 0,
        },
      });
    },
    *changeParams ({ payload }, { select, put }) {
      const params = yield select(state => state.queryParams);
      yield put({
          type: 'save',
          payload: {
              queryParams: {
                  ...params,
                  ...payload,
              },
          },
      });
      // this.fetchDataList();
      yield put({
          type: 'fetchDataList',
          payload: {
              queryParams: {
                  ...params,
                  ...payload,
              },
          },
      })
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
