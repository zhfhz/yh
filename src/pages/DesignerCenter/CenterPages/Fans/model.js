import { message } from 'antd';
import { getEnterpriseList, getPersonalList } from './service';

export default {
  namespace: 'designerCenterFans',
  state: {
    isPersonalSelect: true,
    pageIndex1: 1,
    pageIndex2: 1,
    pageSize: 5,
  },

  effects: {
    *fetch({ userId, pageIndex, pageSize }, { put }) {
      yield put({
        type: 'fetchPersonalList',
        userId,
        pageIndex,
        pageSize,
      });
    },
    *fetchPersonalList({ userId, pageIndex, pageSize }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const { ok, data } = yield call(getPersonalList, userId, pageIndex, pageSize);
      yield put({
        type: 'save',
        payload: {
          loading: false,
        },
      });
      if (!ok) {
        message.error('获取个人列表失败');
        return;
      }
      yield put({
        type: 'save',
        payload: {
          listData: data.list,
          resultCount: parseInt(data.resultCount, 10) || 0,
        },
      });
    },
    *fetchEnterpriseList({ userId, pageIndex, pageSize }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const { ok, data } = yield call(getEnterpriseList, userId, pageIndex, pageSize);
      yield put({
        type: 'save',
        payload: {
          loading: false,
        },
      });
      if (!ok) {
        message.error('获取企业列表失败');
        return;
      }
      yield put({
        type: 'save',
        payload: {
          listData: data.list,
          resultCount: parseInt(data.resultCount, 10) || 0,
        },
      });
    },
    *switch({ isPersonalSelect, userId, pageIndex, pageSize }, { put }) {
      yield put({
        type: 'save',
        payload: isPersonalSelect ? {
          isPersonalSelect,
          pageIndex1: pageIndex,
          listData: null,
        } : {
            isPersonalSelect,
            pageIndex2: pageIndex,
            listData: null,
          },
      });

      yield put({
        type: `${isPersonalSelect ? 'fetchPersonalList' : 'fetchEnterpriseList'}`,
        userId,
        pageIndex,
        pageSize,
      });
    },
    *follow({ userId, isFollow, isPersonalSelect, pageIndex, pageSize }, { put }) {
      yield put({ type: 'user/follow', userId, isFollow });
      yield put({ type: 'switch', isPersonalSelect, userId, pageIndex, pageSize });
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
