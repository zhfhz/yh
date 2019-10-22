import { message } from 'antd';
import { getWorksList, cancelFavWorks } from './service';

export default {
  namespace: 'designerCenterFav',
  state: {
    pageIndex: 1,
    pageSize: 9,
  },

  effects: {
    *fetch({ userId, pageSize, pageIndex }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
      const { ok, data } = yield call(getWorksList, userId, pageSize, pageIndex);
      if (!ok || !data) {
        message.error('作品列表获取失败');
        return;
      }
      yield put({
        type: 'save',
        payload: {
          listData: data.list,
          resultCount: parseInt(data.resultCount, 10) || 0,
          pageIndex,
          loading: false,
        },
      });
    },
    *cancelFav({ worksId, userId, pageSize, pageIndex }, { call, put }) {
      message.loading('正在取消收藏');
      const { ok } = yield call(cancelFavWorks, worksId);
      message.destroy();
      if (!ok) {
        message.error('取消收藏失败');
        return;
      }
      message.success('取消收藏成功');
      yield put({
        type: 'fetch',
        userId,
        pageSize,
        pageIndex,
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
