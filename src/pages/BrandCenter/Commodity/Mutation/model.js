import { message } from 'antd';
import * as lodash from 'lodash';
import { routerRedux } from 'dva/router';
import uuid from 'uuid/v1';
import { displayFen, displayYuan, inputSpaceReg } from '@/utils/utils';
import { ImageViewStatus } from '../../../../components/ImageView/commons';

import {
  getCategoryA,
  getCategoryB,
  getFreightList,
  saveGoodsInfo,
  getGoodsInfo,
  getBannerList,
  getPictureDetail,
  getLabels,
  getSpecsDetail,
  conversionSpecsList,
  deleteGoods,
  getSellingPoint,
  getSpecsList,
  getCarouselList,
  // getDetailPicList,
  getCoverImage,
  conversionLabels,
  RadioStates,
  conversionStepPrice,
} from './service';

export default {
  namespace: 'commodityListMutation',
  state: {
    loading: false,

    isAdd: true, // 不是add就是edit
    goodsId: null,

    // 单位数组
    unitList: [
      { unit: '件', value: '0' },
      { unit: '只', value: '1' },
      { unit: '双', value: '2' },
      { unit: '套', value: '3' },
      { unit: '打', value: '4' },
      { unit: '卷', value: '5' },
      { unit: '辆', value: '6' },
      { unit: '袋', value: '7' },
      { unit: '箱', value: '8' },
      { unit: '包', value: '9' },
      { unit: '千克', value: '10' },
      { unit: '米', value: '11' },
      { unit: '厘米', value: '12' },
      { unit: '平方米', value: '13' },
      { unit: '立方米', value: '14' },
    ],

    // 商品基本信息
    goodsName: '', // 商品名称
    categoryAId: null, // 一级类别id
    categoryBId: null, // 二级类别id
    goodsBrand: '', // 商品品牌
    currentPrice: '', // 当前售价
    advisePrice: '', // 建议临售价

    minOrder: null, // 起订量
    minOrderUnit: '件', // 起定量单位
    stockNum: null, // 库存数量
    stockUnit: '件', // 库存单位
    freight: null, // 运费id
    designerId: null, // 设计师

    freightList: [], // 运费模板list
    categoryOne: [], // 一级类别
    categoryTwo: [], // 二级类别
    sellingPoints: [
      { id: uuid(), sellingPoint: '' },
      { id: uuid(), sellingPoint: '' },
      { id: uuid(), sellingPoint: '' },
    ],

    // 规格及详情
    specsList: [], // 规格数组
    specificationOne: '', // 规格名称1
    specPictuer: false, // 规格1图片
    specificationParamsOne: [{ id: uuid(), paramValue: '', picture: '', images: [] }], // 规格1的参数值
    specificationTwo: '', // 规格名称2
    specificationParamsTwo: [{ id: uuid(), paramValue: '', picture: '' }], // 规格2的参数值
    specificationThree: '', // 规格名称3
    specificationParamsThree: [{ id: uuid(), paramValue: '', picture: '' }], // 规格3的参数值
    showList: [{ id: uuid(), paramName: '', paramValue: '' }], // 展示参数
    carouselList: [], // 轮播图
    detailPicList: [], // 详情图
    coverImages: [], // 封面图
    coverImage: '', // 封面图

    // 上架设置
    labels: [
      {
        name: '本店热销',
        checked: false,
        value: '1',
      },
      {
        name: '本店上新',
        checked: false,
        value: '2',
      },
    ],
    status: null,

    radioState: RadioStates.uniformPrice,
    uniformDisable: false,
    ladderDisable: true,
    stepPriceList: [
      { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
      { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
      { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
    ], // 阶梯价
    detailPicMap: '', // 商品详情图富文本
  },

  effects: {
    *fetch({ payload }, { put, all }) {
      if (payload) {
        yield all([
          put({ type: 'updatePageStatus', payload: { id: payload } }),
          put({ type: 'getGoodsInfo', payload: { id: payload } }),
          put({ type: 'getBannerList', payload: { goodsId: payload } }),
          put({ type: 'getPictureDetail', payload: { goodsId: payload } }),
          put({ type: 'getSpecsDetail', payload: { goodsId: payload } }),
        ]);
      }
      yield all([put({ type: 'getCategoryA' }), put({ type: 'getFreightList' })]);
    },

    // 接口请求
    *getGoodsInfo({ payload }, { put, call, select }) {
      const { labels } = yield select(state => state.commodityListMutation);
      const { ok, data, msg } = yield call(getGoodsInfo, { id: payload.id });
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateGoodsInfo', payload: { data, labels } });
      const { categoryAId, isAdd } = yield select(state => state.commodityListMutation);
      if (!isAdd) {
        yield put({ type: 'getCategoryB', payload: { id: categoryAId } });
      }
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
      // yield put({ type: 'updatePictureDetail', payload: { list: data.list } });
      yield put({
        type: 'updatePictureDetail',
        payload: { detailPicMap: data.detailPicMap || '' },
      });
    },

    *getLabels({ payload }, { put, call, select }) {
      const { ok, data, msg } = yield call(getLabels, { goodsId: payload.goodsId });

      if (!ok) {
        message.error(msg);
        return;
      }

      const { labels } = yield select(state => state.commodityListMutation);
      const newLabels = yield call(conversionLabels, {
        labels,
        lablesList: data.lablesList || [],
      });
      yield put({ type: 'updateLabels', payload: { newLabels } });
    },

    *getSpecsDetail({ payload }, { put, call }) {
      const { ok, data, msg } = yield call(getSpecsDetail, { goodsId: payload.goodsId });
      if (!ok) {
        message.error(msg);
        return;
      }
      const {
        specificationOne,
        specificationParamsOne,
        specificationTwo,
        specificationParamsTwo,
        specificationThree,
        specificationParamsThree,
      } = yield call(conversionSpecsList, { data });

      yield put({
        type: 'updateSpecsDetail',
        payload: {
          data,
          specificationOne,
          specificationParamsOne,
          specificationTwo,
          specificationParamsTwo,
          specificationThree,
          specificationParamsThree,
        },
      });
    },

    *getFreightList(_, { put, call }) {
      const { ok, data, msg } = yield call(getFreightList);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateFreightTemplateList', payload: { list: data.resultList } });
    },

    *getCategoryA(_, { put, call }) {
      const { ok, data, msg } = yield call(getCategoryA);
      if (!ok) {
        message.error(msg);
        return;
      }
      yield put({ type: 'updateCategoryA', payload: { list: data.list } });
    },

    *changeCategoryA(
      {
        payload: { id },
      },
      { put },
    ) {
      yield put({
        type: 'changeCategoryAId',
        payload: { id },
      });
      yield put({
        type: 'getCategoryB',
        payload: { id },
      });
    },
    *getCategoryB(
      {
        payload: { id },
      },
      { call, put },
    ) {
      const { data } = yield call(getCategoryB, { superiorId: id });
      yield put({
        type: 'updateCategoryB',
        payload: { data },
      });
    },

    // 添加展示参数
    *addParams(_, { put, select }) {
      const list = yield select(state => state.commodityListMutation.showList);
      if (list.length >= 5) {
        message.warn('展示参数最多有5个');
        return;
      }
      yield put({
        type: 'addParamsItem',
      });
    },
    *deleteParams({ payload }, { put, select }) {
      const list = yield select(state => state.commodityListMutation.showList);
      if (list.length === 1) {
        message.warn('展示参数最少有1个');
        return;
      }
      yield put({
        type: 'deleteParamsItem',
        payload: { item: payload.item },
      });
    },
    // 添加规格一
    *addSpecParamOne(_, { put, select }) {
      const list = yield select(state => state.commodityListMutation.specificationParamsOne);
      if (list.length >= 10) {
        message.warn('规格参数最多有10个');
        return;
      }
      yield put({
        type: 'addSpecificationOneParam',
      });
    },
    *deleteSpecParamOne({ payload }, { put, select }) {
      const list = yield select(state => state.commodityListMutation.specificationParamsOne);
      if (list.length <= 1) {
        message.warn('规格参数最少有1个');
        return;
      }
      yield put({
        type: 'deleteSpecificationOneParam',
        payload: { item: payload.item },
      });
    },
    *addSpecParamTwo(_, { put, select }) {
      const list = yield select(state => state.commodityListMutation.specificationParamsTwo);
      if (list.length >= 10) {
        message.warn('规格参数最多有10个');
        return;
      }
      yield put({
        type: 'addSpecificationTwoParam',
      });
    },
    *deleteSpecParamTwo({ payload }, { put, select }) {
      const list = yield select(state => state.commodityListMutation.specificationParamsTwo);
      if (list.length <= 1) {
        message.warn('规格参数最少有1个');
        return;
      }
      yield put({
        type: 'deleteSpecificationTwoParam',
        payload: { item: payload.item },
      });
    },
    *addSpecParamThree(_, { put, select }) {
      const list = yield select(state => state.commodityListMutation.specificationParamsThree);
      if (list.length >= 10) {
        message.warn('规格参数最多有10个');
        return;
      }
      yield put({
        type: 'addSpecificationThreeParam',
      });
    },
    *deleteSpecParamThree({ payload }, { put, select }) {
      const list = yield select(state => state.commodityListMutation.specificationParamsThree);
      if (list.length <= 1) {
        message.warn('规格参数最少有1个');
        return;
      }
      yield put({
        type: 'deleteSpecificationThreeParam',
        payload: { item: payload.item },
      });
    },
    *saveGoods(
      {
        payload: { status },
      },
      { call, put, select },
    ) {
      const {
        isAdd,
        goodsId,
        // 商品基本信息
        goodsName,
        categoryAId,
        categoryBId,
        sellingPoints,
        currentPrice,
        advisePrice,
        minOrder,
        minOrderUnit,
        freight,
        stockNum,
        stockUnit,
        designerId,

        // 商品规格
        showList,
        carouselList,
        // detailPicList,
        coverImages,
        specPictuer,
        specificationOne,
        specificationParamsOne,
        specificationTwo,
        specificationParamsTwo,
        specificationThree,
        specificationParamsThree,

        // 上架设置
        labels,

        stepPriceList,
        ladderDisable,
        uniformDisable,
        detailPicMap,
        goodsBrand,
      } = yield select(state => state.commodityListMutation);

      // if (lodash.some(sellingPoints, it => it.sellingPoint !== '' && !inputReg(it.sellingPoint))) {
      //   message.error('卖点只支持中文、数字和字母');
      //   return;
      // }

      if (lodash.some(sellingPoints, it => it.sellingPoint !== '' && it.sellingPoint.length < 4)) {
        message.error('卖点需4-6个字');
        return;
      }

      const newSellingPoint = yield call(getSellingPoint, { sellingPoints });

      if (
        goodsName.length <= 0 ||
        categoryAId === null ||
        categoryBId === null ||
        newSellingPoint.length <= 0 ||
        currentPrice === null ||
        advisePrice === null ||
        minOrder === null ||
        freight === null ||
        stockNum === null
      ) {
        message.error('请填写商品基本信息必填参数');
        return;
      }

      if (!inputSpaceReg(goodsName)) {
        message.error('商品名称不能输入空格');
        return;
      }

      if (!uniformDisable && +currentPrice === 0) {
        message.error('统一价不能为0');
        return;
      }

      if (+advisePrice === 0) {
        message.error('建议零售价不能为0');
        return;
      }

      if (!uniformDisable && +currentPrice >= +advisePrice) {
        message.error('售价需小于建议零售价');
        return;
      }

      if (+minOrder === 0 || +stockNum === 0) {
        message.error('起订量、库存数量不能为0');
        return;
      }

      if (+minOrder > +stockNum) {
        message.error('库存数量需不低于起订量');
        return;
      }

      if (minOrderUnit !== stockUnit) {
        message.error('起订量单位和总库存单位需一致');
        return;
      }

      let newStepPriceList;
      if (!ladderDisable) {
        const newList = stepPriceList.map(it => ({
          minArea: +it.minArea,
          maxArea: +it.maxArea,
          areaPrice: +it.areaPrice,
        }));
        const ladderOne = newList[0];
        const ladderTwo = newList[1];
        const ladderThree = newList[2];

        if (ladderOne.maxArea <= 0 || ladderOne.areaPrice <= 0) {
          message.error('请输入阶梯价一的信息！');
          return;
        }
        if (ladderThree.minArea <= 0 || ladderThree.areaPrice <= 0) {
          message.error('请输入阶梯价三的信息！');
          return;
        }
        if (
          ladderOne.areaPrice >= advisePrice ||
          ladderTwo.areaPrice >= advisePrice ||
          ladderThree.areaPrice >= advisePrice
        ) {
          message.error('阶梯价需小于建议零售价！');
          return;
        }
        if (ladderOne.maxArea <= minOrder) {
          message.error('阶梯价一的最大数量需大于起订量！');
          return;
        }

        if (ladderTwo.minArea > 0 || ladderTwo.maxArea > 0 || ladderTwo.areaPrice > 0) {
          if (ladderTwo.maxArea <= ladderTwo.minArea) {
            message.error('阶梯价二的最大数量需大于阶梯价二的最小数量！');
            return;
          }
          if (ladderTwo.minArea !== ladderOne.maxArea + 1) {
            message.error('阶梯价二的最小数量需与阶梯价一的最大数量连续！');
            return;
          }
          if (ladderThree.minArea !== ladderTwo.maxArea + 1) {
            message.error('阶梯价三的最小数量需与阶梯价二的最大数量连续！');
            return;
          }
          if (
            ladderOne.areaPrice <= ladderTwo.areaPrice ||
            ladderTwo.areaPrice <= ladderThree.areaPrice
          ) {
            message.error(
              '阶梯价三的价格需小于阶梯价二的价格，阶梯价二的价格需小于阶梯价一的价格！',
            );
            return;
          }
        } else {
          if (ladderThree.minArea !== ladderOne.maxArea + 1) {
            message.error('阶梯价三的最小数量需与阶梯价一的最大数量连续！');
            return;
          }
          if (ladderOne.areaPrice <= ladderThree.areaPrice) {
            message.error('阶梯价三的价格需小于阶梯价一的价格！');
            return;
          }
        }
        newStepPriceList = yield call(conversionStepPrice, { stepPriceList, minOrder });
      }

      if (!specificationOne && !specificationTwo && !specificationThree) {
        message.error('请输入商品规格名称');
        return;
      }

      // if (specificationOne === specificationTwo
      //   || specificationOne === specificationThree
      //   || specificationTwo === specificationThree) {
      //   message.error('商品规格名称不能重复');
      //   return;
      // }

      if (!specificationOne && lodash.some(specificationParamsOne, it => it.paramValue)) {
        message.error('请填写商品规格一的名称');
        return;
      }
      if (specificationOne && lodash.some(specificationParamsOne, it => !it.paramValue)) {
        message.error('请填写商品规格一的参数');
        return;
      }

      if (
        lodash.uniqBy(specificationParamsOne, 'paramValue').length !== specificationParamsOne.length
      ) {
        message.error('商品规格一的参数不能重复');
        return;
      }

      if (specPictuer && lodash.some(specificationParamsOne, it => it.images.length <= 0)) {
        message.error('请上传商品规格一的参数图片');
        return;
      }

      if (
        specPictuer &&
        lodash.some(specificationParamsOne, it => it.paramValue && it.images.length <= 0)
      ) {
        message.error('请上传商品规格一的参数图片');
        return;
      }

      if (!specificationTwo && lodash.some(specificationParamsTwo, it => it.paramValue)) {
        message.error('请填写商品规格二的名称');
        return;
      }

      if (specificationTwo && lodash.some(specificationParamsTwo, it => !it.paramValue)) {
        message.error('请填写商品规格二的参数');
        return;
      }

      if (
        lodash.uniqBy(specificationParamsTwo, 'paramValue').length !== specificationParamsTwo.length
      ) {
        message.error('商品规格二的参数不能重复');
        return;
      }

      if (!specificationThree && lodash.some(specificationParamsThree, it => it.paramValue)) {
        message.error('请填写商品规格三的名称');
        return;
      }

      if (specificationThree && lodash.some(specificationParamsThree, it => !it.paramValue)) {
        message.error('请填写商品规格三的参数');
        return;
      }

      if (
        lodash.uniqBy(specificationParamsThree, 'paramValue').length !==
        specificationParamsThree.length
      ) {
        message.error('商品规格三的参数不能重复');
        return;
      }

      const newSpecsList = yield call(getSpecsList, {
        specificationOne,
        specificationParamsOne,
        specificationTwo,
        specificationParamsTwo,
        specificationThree,
        specificationParamsThree,
      });

      // if (lodash.some(newSpecsList, it => !inputReg(it.paramName))
      //   || lodash.some(newSpecsList, it => lodash.some(it.valueList, item => !inputReg(item.paramValue)))) {
      //   message.error('规格只支持中文、数字和字母');
      //   return;
      // }

      if (
        lodash.some(newSpecsList, it =>
          lodash.some(it.valueList, item => it.paramName === item.paramValue),
        )
      ) {
        message.error('商品规格的名称和参数值不能重复');
        return;
      }

      if (lodash.some(showList, it => !it.paramName)) {
        message.error('请填写展示参数名称');
        return;
      }

      if (lodash.some(showList, it => !it.paramValue)) {
        message.error('请填写展示参数值');
        return;
      }

      if (lodash.uniqBy(showList, 'paramName').length !== showList.length) {
        message.error('展示参数名称不能重复');
        return;
      }

      const newShowList = showList.map(it =>
        (it.id.length > 0 ? { paramName: it.paramName, paramValue: it.paramValue } : it),
      );

      // if (lodash.some(newShowList, it => !inputReg(it.paramName) || !inputReg(it.paramValue))) {
      //   message.error('展示参数只支持中文、数字和字母');
      //   return;
      // }

      if (lodash.some(newShowList, it => it.paramName === it.paramValue)) {
        message.error('展示参数名称和参数值不能相同');
        return;
      }

      if (carouselList.length <= 0) {
        message.error('请添加轮播图');
        return;
      }

      if (lodash.some(carouselList, it => it.status && it.status === ImageViewStatus.failed)) {
        message.error('轮播图上传失败，请重新上传');
        return;
      }

      if (lodash.some(carouselList, it => it.status && it.status === ImageViewStatus.uploading)) {
        message.error('轮播图正在上传中，请等待');
        return;
      }

      if (detailPicMap.length <= 0) {
        message.error('请添加详情文本');
        return;
      }

      // if (detailPicList.length <= 0) {
      //   message.error('请添加详情图');
      //   return;
      // }

      if (coverImages.length <= 0) {
        message.error('请添加封面图');
        return;
      }

      if (lodash.some(coverImages, it => it.status && it.status === ImageViewStatus.failed)) {
        message.error('封面图上传失败，请重新上传');
        return;
      }

      if (lodash.some(coverImages, it => it.status && it.status === ImageViewStatus.uploading)) {
        message.error('封面图正在上传中，请等待');
        return;
      }

      const newCarouselList = yield call(getCarouselList, { carouselList });
      // const newDetailPicList = yield call(getDetailPicList, { detailPicList });
      const coverImage = yield call(getCoverImage, { coverImages });

      const newLabels = lodash.join(labels.map(it => (it.checked ? it.value : null)), ',');
      // labels.forEach(it => {
      //   if (it.checked) {
      //     newLabels.push({ tagValue: it.name });
      //   }
      // });

      const { ok, msg } = yield call(saveGoodsInfo, isAdd, {
        status, // 状态 0草稿，1已上架，2已下架，3提交审核审核
        id: goodsId || undefined,
        // 商品基本信息
        goodsName,
        categoryAId,
        categoryBId,
        goodsBrand,
        sellingPoint: newSellingPoint,
        currentPrice: ladderDisable ? displayFen(currentPrice) : undefined,
        advisePrice: displayFen(advisePrice),
        minOrder,
        minOrderUnit,
        freight,
        gmsStock: {
          // number: stockNum,
          originalStock: stockNum, // 原始库存
          unit: stockUnit,
        },

        // 商品规格
        specsList: newSpecsList,
        showList: newShowList,
        carouselList: newCarouselList,
        // detailPicList: newDetailPicList,
        detailPicMap,
        coverImage,

        shelfLabel: newLabels || undefined,
        ifStepPrice: ladderDisable ? 2 : 1,
        stepPriceList: uniformDisable ? newStepPriceList : undefined,
      });
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('保存成功！');
      yield put({ type: 'redirect' });
    },
    *deleteGoods(_, { put, select, call }) {
      const { goodsId } = yield select(state => state.commodityListMutation);
      const { ok, msg } = yield call(deleteGoods, goodsId);
      if (!ok) {
        message.error(msg);
        return;
      }
      message.success('删除成功');
      yield put({ type: 'redirect' });
    },
    *redirect(_, { put }) {
      yield put({ type: 'brandCenterCommodity/release' });
      yield put({ type: 'brandCenterCommodity/fetch' });
      yield put(routerRedux.push('/center/brandcenter/commodity'));
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    updatePageStatus(
      state,
      {
        payload: { id },
      },
    ) {
      return {
        ...state,
        isAdd: false,
        goodsId: id,
      };
    },
    /**
     * 获取商品详情
     */
    //  规格详情
    updateSpecsDetail(
      state,
      {
        payload: {
          data,
          specificationOne,
          specificationParamsOne,
          specificationTwo,
          specificationParamsTwo,
          specificationThree,
          specificationParamsThree,
        },
      },
    ) {
      return {
        ...state,
        specificationOne: specificationOne || '',
        specificationParamsOne: specificationParamsOne || [
          { id: uuid(), paramValue: '', picture: '', images: [] },
        ],
        specificationTwo: specificationTwo || '',
        specificationParamsTwo: specificationParamsTwo || [
          { id: uuid(), paramValue: '', picture: '' },
        ],
        specificationThree: specificationThree || '',
        specificationParamsThree: specificationParamsThree || [
          { id: uuid(), paramValue: '', picture: '' },
        ],
        showList: data.showList,
        specPictuer: !!lodash.some(
          specificationParamsOne,
          it => it.picture && it.picture.length > 0,
        ),
      };
    },
    // 商品基本参数
    updateGoodsInfo(
      state,
      {
        payload: { data, labels },
      },
    ) {
      const newSellingPoint = data.sellingPoint.split('|');
      const newSellingPoints = newSellingPoint.map(it => ({
        id: uuid(),
        sellingPoint: it.length > 0 ? it : '',
      }));
      if (newSellingPoints.length < 2) {
        newSellingPoints.push({
          id: uuid(),
          sellingPoint: '',
        });
      }
      if (newSellingPoints.length < 3) {
        newSellingPoints.push({
          id: uuid(),
          sellingPoint: '',
        });
      }
      let newStepPriceList = [];
      if (data.ifStepPrice === 1 && data.stepPriceList && data.stepPriceList.length === 2) {
        newStepPriceList = data.stepPriceList.map(it => ({
          ...it,
          id: uuid(),
          areaPrice: displayYuan(it.areaPrice),
        }));
        newStepPriceList.splice(1, 0, {
          id: uuid(),
          minArea: null,
          maxArea: null,
          areaPrice: null,
        });
      }

      if (data.ifStepPrice === 1 && data.stepPriceList && data.stepPriceList.length === 3) {
        newStepPriceList = data.stepPriceList.map(it => ({
          ...it,
          id: uuid(),
          areaPrice: displayYuan(it.areaPrice),
        }));
      }
      if (!data.stepPriceList || data.ifStepPrice === 2 || data.stepPriceList.length === 0) {
        newStepPriceList = [
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
        ];
      }

      return {
        ...state,
        goodsName: data.goodsName,
        categoryAId: data.categoryAId,
        categoryBId: data.categoryBId,
        sellingPoints: newSellingPoints,
        currentPrice: displayYuan(data.currentPrice),
        advisePrice: displayYuan(data.advisePrice),
        minOrder: data.minOrder,
        minOrderUnit: data.minOrderUnit,
        freight: data.freight,
        // stockNum: data.gmsStock ? data.gmsStock.number : data.stockNum,
        stockNum: data.originalStock || data.stockNum,
        stockUnit: data.gmsStock ? data.gmsStock.unit : data.stockUnit,
        designer: data.designer,
        coverImages: [
          {
            id: uuid(),
            server: data.coverImage,
          },
        ],
        ladderDisable: data.ifStepPrice === 2,
        uniformDisable: data.ifStepPrice === 1,
        stepPriceList: newStepPriceList,
        radioState: data.ifStepPrice,
        goodsBrand: data.goodsBrand,
        // labels: data.shelfLabel
      };
    },
    // banner
    updateBannerList(
      state,
      {
        payload: { list },
      },
    ) {
      const bannerList = list.map(it => ({
        id: it.id,
        server: it.picture,
      }));
      return {
        ...state,
        carouselList: bannerList,
      };
    },
    // 详情图
    updateDetailPicMap(state, { payload: detailPicMap }) {
      return {
        ...state,
        detailPicMap: detailPicMap.detailPicMap,
      };
    },

    updatePictureDetail(
      state,
      {
        payload: { detailPicMap },
      },
    ) {
      // const detailPicList = list.map(it => ({
      //   id: it.id,
      //   server: it.picture,
      // }));
      return {
        ...state,
        // detailPicList,
        detailPicMap,
      };
    },
    // 标签
    updateLabels(state, { payload }) {
      return {
        ...state,
        labels: payload.newLabels,
      };
    },
    changeLabelsChecked(
      state,
      {
        payload: { name, checked },
      },
    ) {
      const newLabels = state.labels.map(it => (it.name === name ? { ...it, checked } : it));
      return {
        ...state,
        labels: newLabels,
      };
    },
    /**
     * 上架设置
     */

    /**
     * 商品规格及详情
     */
    updateSpecificationOneName(
      state,
      {
        payload: { specificationOne },
      },
    ) {
      return {
        ...state,
        specificationOne,
      };
    },

    updateSpecPicture(
      state,
      {
        payload: { checked },
      },
    ) {
      let newItems;
      if (!checked) {
        newItems = state.specificationParamsOne.map(it =>
          (it.images && it.images.length > 0 ? { ...it, images: [] } : it),
        );
      } else {
        newItems = state.specificationParamsOne;
      }
      return {
        ...state,
        specPictuer: checked,
        specificationParamsOne: newItems,
      };
    },
    updateSpecPictuerValue(
      state,
      {
        payload: { images, item },
      },
    ) {
      const newItems = state.specificationParamsOne.map(it =>
        (it.id === item.id ? { ...it, images } : it),
      );
      return {
        ...state,
        specificationParamsOne: newItems,
      };
    },

    updateSpecificationOneValue(
      state,
      {
        payload: { id, paramValue },
      },
    ) {
      const newItems = state.specificationParamsOne.map(it =>
        (it.id === id ? { ...it, paramValue } : it),
      );
      return {
        ...state,
        specificationParamsOne: newItems,
      };
    },

    addSpecificationOneParam(state) {
      return {
        ...state,
        specificationParamsOne: [
          ...state.specificationParamsOne,
          {
            id: uuid(),
            paramValue: '',
            picture: '',
            images: [],
          },
        ],
      };
    },

    deleteSpecificationOneParam(
      state,
      {
        payload: { item },
      },
    ) {
      const list = [...state.specificationParamsOne];
      const newList = lodash.pull(list, item);
      return {
        ...state,
        specificationParamsOne: newList,
      };
    },

    updateSpecificationTwoName(
      state,
      {
        payload: { specificationTwo },
      },
    ) {
      return {
        ...state,
        specificationTwo,
      };
    },

    updateSpecificationTwoValue(
      state,
      {
        payload: { id, paramValue },
      },
    ) {
      const newItems = state.specificationParamsTwo.map(it =>
        (it.id === id ? { ...it, paramValue } : it),
      );
      return {
        ...state,
        specificationParamsTwo: newItems,
      };
    },

    addSpecificationTwoParam(state, { payload }) {
      return {
        ...state,
        ...payload,
        specificationParamsTwo: [
          ...state.specificationParamsTwo,
          {
            id: uuid(),
            paramValue: '',
          },
        ],
      };
    },

    deleteSpecificationTwoParam(
      state,
      {
        payload: { item },
      },
    ) {
      const list = [...state.specificationParamsTwo];
      const newList = lodash.pull(list, item);
      return {
        ...state,
        specificationParamsTwo: newList,
      };
    },

    updateSpecificationThreeName(
      state,
      {
        payload: { specificationThree },
      },
    ) {
      return {
        ...state,
        specificationThree,
      };
    },

    updateSpecificationThreeValue(
      state,
      {
        payload: { id, paramValue },
      },
    ) {
      const newItems = state.specificationParamsThree.map(it =>
        (it.id === id ? { ...it, paramValue } : it),
      );
      return {
        ...state,
        specificationParamsThree: newItems,
      };
    },

    addSpecificationThreeParam(state, { payload }) {
      return {
        ...state,
        ...payload,
        specificationParamsThree: [
          ...state.specificationParamsThree,
          {
            id: uuid(),
            paramValue: '',
          },
        ],
      };
    },

    deleteSpecificationThreeParam(
      state,
      {
        payload: { item },
      },
    ) {
      const list = [...state.specificationParamsThree];
      const newList = lodash.pull(list, item);
      return {
        ...state,
        specificationParamsThree: newList,
      };
    },

    // 展示参数
    updateParamsName(
      state,
      {
        payload: { id, paramName },
      },
    ) {
      const newItems = state.showList.map(it => (it.id === id ? { ...it, paramName } : it));
      return {
        ...state,
        showList: newItems,
      };
    },

    updateParamsValue(
      state,
      {
        payload: { id, paramValue },
      },
    ) {
      const newItems = state.showList.map(it => (it.id === id ? { ...it, paramValue } : it));
      return {
        ...state,
        showList: newItems,
      };
    },

    addParamsItem(state, { payload }) {
      return {
        ...state,
        ...payload,
        showList: [
          ...state.showList,
          {
            id: uuid(),
            paramName: '',
            paramValue: '',
          },
        ],
      };
    },
    deleteParamsItem(
      state,
      {
        payload: { item },
      },
    ) {
      const list = [...state.showList];
      const newList = lodash.pull(list, item);
      return {
        ...state,
        showList: newList,
      };
    },
    // 轮播图
    updateCarouselList(
      state,
      {
        payload: { carouselList },
      },
    ) {
      return {
        ...state,
        carouselList,
      };
    },
    // 详情图
    updateDetailPicList(
      state,
      {
        payload: { detailPicList },
      },
    ) {
      return {
        ...state,
        detailPicList,
      };
    },
    updateCoverImages(
      state,
      {
        payload: { coverImages },
      },
    ) {
      return {
        ...state,
        coverImages,
      };
    },

    /**
     * 商品基本信息
     */
    // 阶梯价
    radioChange(state, { payload }) {
      return {
        ...state,
        radioState: payload,
        uniformDisable: payload === RadioStates.ladderPrice,
        ladderDisable: payload === RadioStates.uniformPrice,
        stepPriceList: [
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
        ],
        currentPrice: '',
      };
    },

    changeMinArea(
      state,
      {
        payload: { minArea, item },
      },
    ) {
      const newItems = state.stepPriceList.map(it => (it.id === item.id ? { ...it, minArea } : it));

      return {
        ...state,
        stepPriceList: newItems,
      };
    },
    changeMaxArea(
      state,
      {
        payload: { maxArea, item },
      },
    ) {
      const newItems = state.stepPriceList.map(it => (it.id === item.id ? { ...it, maxArea } : it));
      return {
        ...state,
        stepPriceList: newItems,
      };
    },
    changeAreaPrice(
      state,
      {
        payload: { areaPrice, item },
      },
    ) {
      const newItems = state.stepPriceList.map(it =>
        (it.id === item.id ? { ...it, areaPrice } : it),
      );
      return {
        ...state,
        stepPriceList: newItems,
      };
    },

    // 更新类别
    updateCategoryA(state, { payload }) {
      return {
        ...state,
        categoryOne: payload.list,
      };
    },

    updateCategoryB(
      state,
      {
        payload: { data },
      },
    ) {
      return {
        ...state,
        categoryTwo: data.list || [],
      };
    },

    changeCategoryAId(
      state,
      {
        payload: { id },
      },
    ) {
      return {
        ...state,
        categoryAId: id,
        categoryBId: null,
      };
    },

    changeCategoryBId(
      state,
      {
        payload: { id },
      },
    ) {
      return {
        ...state,
        categoryBId: id,
      };
    },

    updateFreightTemplateList(
      state,
      {
        payload: { list },
      },
    ) {
      return {
        ...state,
        freightList: list || [],
      };
    },

    changeFreightId(
      state,
      {
        payload: { id },
      },
    ) {
      return {
        ...state,
        freight: id,
      };
    },

    // 商品名称
    updateGoodsName(
      state,
      {
        payload: { goodsName },
      },
    ) {
      return {
        ...state,
        goodsName,
      };
    },

    // 卖点
    updateSellingPoint(
      state,
      {
        payload: { index, sellingPoint },
      },
    ) {
      const newItems = state.sellingPoints.map((it, i) =>
        (index === i ? { ...it, sellingPoint } : it),
      );
      return {
        ...state,
        sellingPoints: newItems,
      };
    },

    updatePrice(
      state,
      {
        payload: { currentPrice },
      },
    ) {
      return {
        ...state,
        currentPrice,
      };
    },
    updateAdvisePrice(
      state,
      {
        payload: { advisePrice },
      },
    ) {
      return {
        ...state,
        advisePrice,
      };
    },
    updateMinOrder(
      state,
      {
        payload: { minOrder },
      },
    ) {
      return {
        ...state,
        minOrder,
      };
    },

    updateMinOrderUnit(
      state,
      {
        payload: { minOrderUnit },
      },
    ) {
      return {
        ...state,
        minOrderUnit,
      };
    },
    updateStockNum(
      state,
      {
        payload: { stockNum },
      },
    ) {
      return {
        ...state,
        stockNum,
      };
    },
    updateStockUnit(
      state,
      {
        payload: { stockUnit },
      },
    ) {
      return {
        ...state,
        stockUnit,
      };
    },

    release(state, { payload }) {
      return {
        ...state,
        ...payload,
        isAdd: true,
        goodsId: null,
        goodsName: '',
        categoryAId: null, // 一级类别id
        categoryBId: null, // 二级类别id
        currentPrice: '', // 当前售价
        advisePrice: '', // 建议临售价
        minOrder: null, // 起订量
        minOrderUnit: '件', // 起定量单位
        stockNum: null, // 库存数量
        stockUnit: '件', // 库存单位
        freight: null, // 运费id
        designerId: null, // 设计师
        freightList: [], // 运费模板list
        categoryOne: [], // 一级类别
        categoryTwo: [], // 二级类别
        sellingPoints: [
          { id: uuid(), sellingPoint: '' },
          { id: uuid(), sellingPoint: '' },
          { id: uuid(), sellingPoint: '' },
        ],
        // 规格及详情
        specsList: [], // 规格数组
        specificationOne: '', // 规格名称1
        specPictuer: false, // 规格1图片
        specificationParamsOne: [{ id: uuid(), paramValue: '', picture: '', images: [] }], // 规格1的参数值
        specificationTwo: '', // 规格名称2
        specificationParamsTwo: [{ id: uuid(), paramValue: '', picture: '' }], // 规格2的参数值
        specificationThree: '', // 规格名称3
        specificationParamsThree: [{ id: uuid(), paramValue: '', picture: '' }], // 规格3的参数值
        showList: [{ id: uuid(), paramName: '', paramValue: '' }], // 展示参数
        carouselList: [], // 轮播图
        detailPicList: [], // 详情图
        coverImages: [], // 封面图
        coverImage: '', // 封面图
        labels: [
          {
            name: '本店热销',
            checked: false,
            value: '1',
          },
          {
            name: '本店上新',
            checked: false,
            value: '2',
          },
        ],
        status: null,

        radioState: RadioStates.uniformPrice,
        uniformDisable: false,
        ladderDisable: true,
        stepPriceList: [
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
          { id: uuid(), minArea: null, maxArea: null, areaPrice: null },
        ], // 阶梯价
        detailPicMap: '', // 商品详情图富文本
      };
    },
  },
};
