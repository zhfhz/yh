import { message } from 'antd';
import { getProductionDeital, collectThisDeital, likeThisDetail, getOtherDesignsOfTheUser } from './service';

export default {
  namespace: 'productionDetail',
  state: {
    data: {},
    dataList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(getProductionDeital, payload.id);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },

    *toggleCollect({ payload }, { call }) {
      const { id, isCollect } = payload;
      const { ok } = yield call(collectThisDeital, id, isCollect);
      if (!ok) {
        if (isCollect) {
          message.error('收藏失败');
        } else {
          message.error('取消收藏失败');
        }
        return {
          isCollect,
          ok,
        };
      }
      if (isCollect) {
        message.success('收藏成功');
      } else {
        message.success('取消收藏成功');
      }
      return {
        isCollect,
        ok,
      };
    },
    *likeThis({ payload }, { call }) {
      const { id } = payload;
      const { ok } = yield call(likeThisDetail, id);
      if (!ok) {
        message.error('暂时不能点赞。');
      }
    },
    *getDesignsList({ payload }, { call, put }) {
      const { id } = payload;
      const { ok, data } = yield call(getOtherDesignsOfTheUser, id);
      if (ok) {
        yield put({
          type: 'save',
          payload: {
            dataList: data,
          },
        })
      }
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
