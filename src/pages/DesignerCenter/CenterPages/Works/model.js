import { message } from 'antd';
import { getWorksList, delWorks } from './service';

export default {
  namespace: 'designerCenterWorks',
  state: {
    pageIndex: 1,
    pageSize: 9,
  },

  effects: {
    *fetch({ userId, pageSize, pageIndex }, { call, put }) {
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
        },
      });
    },
    *delWork({ worksId, userId, pageSize, pageIndex }, { call, put }) {
      message.loading('正在删除');
      const { ok } = yield call(delWorks, worksId);
      message.destroy();
      if (!ok) {
        message.error('删除失败');
        return;
      }
      message.success('删除成功');
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
