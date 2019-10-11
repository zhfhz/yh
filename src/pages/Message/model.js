import { message } from 'antd';
import moment from 'moment';
import { getData } from './service';

export default {
  namespace: 'message',
  state: {
    pageIndex: 1,
    pageSize: 4,
  },

  effects: {
    *fetch({ pageIndex, pageSize }, { call, put }) {
      const { ok, data } = yield call(getData, pageIndex, pageSize);
      if (!ok) {
        message.error('系统消息获取失败');
        return;
      }

      if (data.resultList) {
        data.resultList.map(v => {
          const v2 = v;
          // v2.sendDate = moment(v2.sendDate).format('YYYY年M月D日 HH:mm');
          v2.sendDate = v.sendDate.slice(0, -3);
          return v2;
        })
      }

      yield put({
        type: 'save',
        payload: {
          pageIndex,
          resultCount: parseInt(data.resultCount, 10) || 0,
          dataList: data.resultList,
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
