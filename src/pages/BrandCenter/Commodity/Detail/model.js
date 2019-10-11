import { message } from 'antd';
import uuid from 'uuid/v1';
import { getGoodsInfo, getBannerList, getPictureDetail, getSpecsDetail } from './service';

export default {
  namespace: 'commodityListDetail',
  state: {
    loading: false,

    goodsInfo: {
      goodsName: '',
      category: '',
      goodsBrand: '',
      currentPrice: 0,
      stockNum: 0,
      stockUnit: '',
      status: 0,
      updateMan: '',
      id: '',
      buyableUserName: '',
      salesVolume: 0,
      advisePrice: 0,
      upperShelfTime: '',
      labels: 0,
      picture: '',
      sellingPoint: '',
      minOrder: '',
      minOrderUnit: '',
      coverImage: '',
      templateName: '',
      originalStock: 0, // 原始库存
      ifStepPrice: null,
      stepPriceList: [],
      shelfLabel: [],
    },

    specsList: [],
    showList: [],

    bannerList: [],
    pictureDetailList: [],
    detailPicMap: '',
    coverImages: [],
    labelsList: [],
  },

  effects: {
    *fetch({ payload }, { put, all }) {
      yield all([
        put({ type: 'getGoodsInfo', payload: { id: payload } }),
        put({ type: 'getBannerList', payload: { goodsId: payload } }),
        put({ type: 'getPictureDetail', payload: { goodsId: payload } }),
        put({ type: 'getSpecsDetail', payload: { goodsId: payload } }),
      ]);
    },
    *getGoodsInfo({ payload }, { put, call }) {
      const { ok, data, msg } = yield call(getGoodsInfo, { id: payload.id });
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateGoodsInfo', payload: { data } });
    },

    *getBannerList({ payload }, { put, call }) {
      const { ok, data, msg } = yield call(getBannerList, { goodsId: payload.goodsId });
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateBannerList', payload: { list: data.list } });
    },

    *getPictureDetail({ payload }, { put, call }) {
      const { ok, data, msg } = yield call(getPictureDetail, { goodsId: payload.goodsId });
      if (!ok) {
        message.error(msg);
        return;
      }

      if (data.detailPicMap && data.detailPicMap.length > 0) {
        yield put({
          type: 'updatePictureDetail',
          payload: { detailPicMap: data.detailPicMap || '' },
        });
      } else {
        yield put({ type: 'updatePictureList', payload: { list: data.list } });
      }
      // yield put({ type: 'updatePictureDetail', payload: { detailPicMap: data.detailPicMap || '' } });
    },

    *getSpecsDetail({ payload }, { put, call }) {
      const { ok, data, msg } = yield call(getSpecsDetail, { goodsId: payload.goodsId });
      if (!ok) {
        message.error(msg);
        return;
      }

      yield put({
        type: 'updateSpecsDetail',
        payload: {
          data,
        },
      });
    },
  },

  reducers: {
    updateSpecsDetail(
      state,
      {
        payload: { data },
      },
    ) {
      return {
        ...state,
        specsList: data.specsList.reverse(),
        showList: data.showList,
      };
    },

    updateGoodsInfo(
      state,
      {
        payload: { data },
      },
    ) {
      return {
        ...state,
        goodsInfo: {
          ...data,
          stepPriceList: data.stepPriceList
            ? data.stepPriceList.map(it => ({ id: uuid(), ...it }))
            : [],
          shelfLabel: data.shelfLabel.split(',') || [],
        },
        coverImages: [{ id: uuid(), server: data.coverImage }],
      };
    },
    updateBannerList(
      state,
      {
        payload: { list },
      },
    ) {
      return {
        ...state,
        bannerList: list.map(it => ({
          id: it.id,
          server: it.picture,
        })),
      };
    },

    updatePictureList(
      state,
      {
        payload: { list },
      },
    ) {
      return {
        ...state,
        pictureDetailList: list.map(it => ({
          id: it.id,
          server: it.picture,
        })),
      };
    },
    updatePictureDetail(
      state,
      {
        payload: { detailPicMap },
      },
    ) {
      return {
        ...state,
        // pictureDetailList: list.map(it => ({
        //   id: it.id,
        //   server: it.picture,
        // })),
        detailPicMap,
      };
    },
  },
};
