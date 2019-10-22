import { message } from 'antd';
import { saveEditorInfo, getEditorInfo, savePicture, getPicture, getImages } from './service';

const InitState = {
  displayType: '1',
  displayContent: '',
  introduction: '', // 企业简介
  honor: '', // 荣誉资质
  service: '', // 产品服务

  pictures: [],

  introductionErr: {
    content: '请输入企业简介！',
    show: false,
  },
  honorErr: {
    content: '请输入荣誉资质！',
    show: false,
  },
  serviceErr: {
    content: '请输入产品服务！',
    show: false,
  },
  pictureErr: {
    content: '请上传企业图片！',
    show: false,
  },
};

export default {
  namespace: 'brandCenterMaterial',
  state: InitState,

  effects: {
    *fetch(_, { call, put, select }) {
      const { displayType } = yield select(state => state.brandCenterMaterial);
      if (displayType === '4') {
        yield put({
          type: 'getPicture',
        });
      } else {
        const { ok, msg, data } = yield call(getEditorInfo, {
          reqType: displayType,
        });
        if (!ok) {
          message.error(msg);
          return;
        }
        if (displayType === '1') {
          yield put({
            type: 'updateState',
            payload: {
              introduction: data,
            },
          });
        }
        if (displayType === '2') {
          yield put({
            type: 'updateState',
            payload: {
              honor: data,
            },
          });
        }
        if (displayType === '3') {
          yield put({
            type: 'updateState',
            payload: {
              service: data,
            },
          });
        }
      }
    },
    *saveEditorInfo({ payload }, { call, select }) {
      const { displayType } = yield select(state => state.brandCenterMaterial);

      const { ok, msg } = yield call(saveEditorInfo, {
        displayType,
        displayContent: payload,
      });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('保存成功');
    },

    *savePicture(_, { call, select }) {
      const { pictures } = yield select(state => state.brandCenterMaterial);
      const urlList = yield call(getImages, { pictures });
      const { ok, msg } = yield call(savePicture, {
        urlList,
      });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('保存成功');
    },
    *getPicture(_, { call, put }) {
      const { ok, data, msg } = yield call(getPicture, { enterpriseId: '1' });
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updatePictures', payload: { list: data } });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateIntroErr(
      state,
      {
        payload: { show },
      },
    ) {
      return {
        ...state,
        introductionErr: {
          ...state.introductionErr,
          show,
        },
        introduction: show ? '' : state.introduction,
      };
    },
    updateHonorErr(
      state,
      {
        payload: { show },
      },
    ) {
      return {
        ...state,
        honorErr: {
          ...state.honorErr,
          show,
        },
        honor: show ? '' : state.honor,
      };
    },
    updateServiceErr(
      state,
      {
        payload: { show },
      },
    ) {
      return {
        ...state,
        serviceErr: {
          ...state.serviceErr,
          show,
        },
        service: show ? '' : state.service,
      };
    },
    updatePictureErr(
      state,
      {
        payload: { show },
      },
    ) {
      return {
        ...state,
        pictureErr: {
          ...state.pictureErr,
          show,
        },
        pictures: show ? '' : state.pictures,
      };
    },
    updatePictureValue(
      state,
      {
        payload: { images },
      },
    ) {
      return {
        ...state,
        pictures: images,
      };
    },

    updatePictures(
      state,
      {
        payload: { list },
      },
    ) {
      const pictures = list.map(it => ({
        id: it.id,
        server: it.elegantUrl,
      }));
      return {
        ...state,
        pictures,
      };
    },
  },
};
