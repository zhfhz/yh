import { message } from 'antd';
import moment from 'moment';
import { getData } from './service';

export default {
  namespace: 'designerCenterMsg',
  state: {
    pageIndex: 1,
    pageSize: 4,
  },

  effects: {
    *fetch({ pageIndex, pageSize }, { call, put }) {
      const { ok, data } = yield call(getData, pageIndex, pageSize);
      if (!ok) {
        message.error('动态获取失败');
        return;
      }

      if (data.list) {
        data.list.map(v => {
          const v2 = v;
          v2.sendDate = moment(v2.sendDate).format('YYYY年M月D日 HH:mm');
          return v2;
        })
      }

      yield put({
        type: 'save',
        payload: {
          pageIndex,
          resultCount: parseInt(data.resultCount, 10) || 0,
          dataList: data.list,
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
};
