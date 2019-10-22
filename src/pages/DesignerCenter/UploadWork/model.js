import { message } from 'antd';
import { getDic, DicDataType } from '@/pages/Register/Complete/service';
import { getWorkInfo, postWork } from './service';
import { WorksStatus } from '../Const';

export default {
  namespace: 'designerCenterUploadWork',
  state: {
    loading: true,
  },

  effects: {
    *fetch({ worksId, editor }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          worksId,
          loading: true,
        },
      });
      yield put({
        type: 'getCategories',
      });

      if (worksId) {
        const { ok, data } = yield call(getWorkInfo, worksId);
        if (!ok) {
          message.error('作品信息查询失败');
          return;
        }
        yield put({
          type: 'save',
          payload: {
            coverImage: data.coverImage,
            images: [{ server: data.coverImage }],
            copyright: data.copyright,
            category: data.categoryId,
            categoryName: data.categoryName,
            tag: data.labels,
            worksName: data.worksName,
            content: data.content,
            protection: data.copyrightProtection === 1,
          },
        });
        if (editor) {
          editor.setContent(data.content);
        }
      }

      yield put({
        type: 'save',
        payload: {
          loading: false,
        },
      });
    },
    *getCategories(_, { call, put }) {
      const params = { dataType: DicDataType.DesignTypies }
      const { ok, data } = yield call(getDic, params);
      const list = [...data, ...[{ dataId: -1, dataName: '其它' }]];
      if (!ok) {
        message.error('获取分类信息失败');
        return;
      }
      yield put({
        type: 'save',
        payload: {
          categories: list,
        },
      });
    },
    *uploadWork({ data, isEdit, editor }, { call, put }) {
      const { ok, msg } = yield call(postWork, data);
      if (!ok) {
        message.error(msg);
      } else if (data.worksStatus === WorksStatus.PUBLISH) {
        if (isEdit) {
          message.success('编辑成功')
        } else {
          message.success('上传成功')
        }
      } else {
        message.success('草稿保存成功')
      }
      yield put({
        type: 'fetch',
        worksId: data.worksId,
        editor,
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
