import { message } from 'antd';
import { getData, saveShelf, SortType, setTop } from './service';

export default {
  namespace: 'brandCenterCommodity',
  state: {
    commodityList: [], // 列表参数
    // 分页参数
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
    },
    sort: SortType.time,
    // modal
    visible: false,
    modalTitle: '',
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      if (payload) {
        yield put({
          type: 'setPagination',
          payload: {
            pageIndex: payload.pageIndex,
            pageSize: payload.pageSize,
          },
        });
      }
      const { pagination, sort } = yield select(state => state.brandCenterCommodity);

      const { data, ok, msg } = yield call(getData, {
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
        sort,
      });
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'save', payload: { data } });
    },
    *saveShelf(
      {
        payload: { id, status },
      },
      { call, put },
    ) {
      yield put({ type: 'closeModal' });
      const { ok, msg } = yield call(saveShelf, { id, status });
      if (ok) {
        if (status === 2) {
          message.success('下架成功');
        } else {
          message.success('上架成功');
        }
        yield put({ type: 'fetch' });
      } else {
        message.error(msg);
      }
    },
    *setTop(
      {
        payload: { goodsId },
      },
      { call, put },
    ) {
      const { ok, msg } = yield call(setTop, { goodsId });
      if (ok) {
        message.success('置顶成功');
        yield put({ type: 'fetch' });
      } else {
        message.error(msg);
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    save(
      state,
      {
        payload: { data },
      },
    ) {
      return {
        ...state,
        commodityList: data.list,
        pagination: {
          ...state.pagination,
          total: +data.resultCount,
        },
      };
    },
    setPagination(state, { payload }) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: payload.pageIndex,
          pageSize: payload.pageSize,
        },
      };
    },

    openModal(
      state,
      {
        payload: { id, modalTitle },
      },
    ) {
      return {
        ...state,
        goodsId: id,
        visible: true,
        modalTitle,
      };
    },

    closeModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        visible: false,
      };
    },
    release(state, { payload }) {
      return {
        ...state,
        ...payload,
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
        },
      };
    },
  },
};
