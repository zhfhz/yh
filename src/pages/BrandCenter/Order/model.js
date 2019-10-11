import { message } from 'antd';
import {
  getData,
  getDetail,
  sentItemGood,
  changePayGoodsPrice,
  getAscriptionData,
  setGroupCancel,
} from './service';
import { displayFen } from '@/utils/utils';

export const orderSateList = [
  { label: '全部', value: null },
  { label: '待支付', value: 0 },
  { label: '待发货', value: 1 },
  { label: '已发货', value: 2 },
  { label: '已完成', value: 3 },
  { label: '已取消', value: 4 },
];
const initState = () => ({
  data: [],
  userSourceList: [],
  record: {},
  specsList: [],
  visible: false,
  goodsModalVisible: false,
  cancelModalVisible: false,
  changePriceModalVisible: false,
  id: '',
  remakes: '',
  searchObj: {
    goodsName: null, // 商品名称
    mobileNumber: null, // 下单人手机号
    orderState: null, // 状态
  },
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  express: {
    logisticsNo: '', // 快递单号
    expressName: '', // 快递公司
  },
  changePrice: {
    freight: '', // 现运费
    totalGoodsPrice: '', // 现商品总价
    totalFee: 0, // 现总价
  },
});
export default {
  namespace: 'brandCenterOrder',
  state: initState(),

  effects: {
    *getOrderList(_, { call, put, select }) {
      const record = yield select(state => state.brandCenterOrder);
      const obj = {
        pageIndex: record.pagination.current,
        pageSize: record.pagination.pageSize,
        goodsName: record.searchObj.goodsName === '' ? null : record.searchObj.goodsName,
        mobileNumber: record.searchObj.mobileNumber === '' ? null : record.searchObj.mobileNumber,
        orderState: record.searchObj.orderState,
        orderType: 1,
      };
      const { data, ok, msg } = yield call(getData, obj);
      if (ok) {
        yield put({
          type: 'save',
          payload: { data },
        });
      } else {
        message.error(msg);
      }
    },

    *changePageData({ payload }, { put }) {
      // 分页查询
      yield put({
        type: 'changePage',
        payload: { current: payload.current, pageSize: payload.pageSize },
      });
      yield put({ type: 'getOrderList' });
    },
    *getOrderDetail({ payload }, { call, put }) {
      // 详情
      const { data, ok, msg } = yield call(getDetail, { id: payload });
      if (ok) {
        yield put({
          type: 'setDetail',
          payload: { data, id: payload },
        });
      } else {
        message.error(msg);
      }
    },
    *sendGoods(_, { call, put, select }) {
      //  发货
      const record = yield select(state => state.brandCenterOrder);
      if (record.express.expressName === '') {
        message.error('快递公司不能为空!');
        return;
      }
      if (record.express.logisticsNo === '') {
        message.error('快递单号不能为空!');
        return;
      }
      const obj = {
        logisticsNo: record.express.logisticsNo,
        express: record.express.expressName,
        id: record.id,
      };
      const { ok, msg } = yield call(sentItemGood, obj);
      if (ok) {
        message.success('发货成功！');
        yield select(state => state.brandCenterOrder);
        yield put({
          type: 'closeModal',
        });
        yield put({ type: 'getOrderList' });
      } else {
        message.error(msg);
      }
    },
    *cancel(_, { call, put, select }) {
      //  取消
      const record = yield select(state => state.brandCenterOrder);
      if (!record.remakes) {
        message.error('请输入取消原因！');
        return;
      }
      const param = {
        orderNo: record.record.orderNo,
        remakes: record.remakes,
      };
      const { msg, ok } = yield call(setGroupCancel, param);
      if (ok) {
        message.success('取消成功！');
        yield put({
          type: 'closeModal',
        });
        yield put({ type: 'getOrderList' });
      } else {
        message.error(msg);
      }
    },
    *searchData(_, { put, select }) {
      // 查询
      const record = yield select(state => state.brandCenterOrder);
      yield put({
        type: 'upState',
        payload: {
          pagination: {
            ...record.pagination,
            current: 1,
          },
        },
      });
      yield put({ type: 'getOrderList' });
    },
    *changeGoodsPrice(_, { call, put, select }) {
      // 改价
      const { record, changePrice } = yield select(state => state.brandCenterOrder);
      if (
        record.currentPrice * record.goodsNumber === displayFen(changePrice.totalGoodsPrice) &&
        record.freight === displayFen(changePrice.freight)
      ) {
        message.error('现商品总价和现运费至少修改一项！');
        return;
      }
      if (displayFen(changePrice.totalGoodsPrice) === 0) {
        message.error('现商品总价不能为0！');
        return;
      }
      const param = {
        freight: displayFen(changePrice.freight),
        totalGoodsPrice: displayFen(changePrice.totalGoodsPrice),
        id: record.id,
      };
      const { ok, msg } = yield call(changePayGoodsPrice, param);
      if (ok) {
        yield put({ type: 'closeModal' });
        yield put({ type: 'getOrderList' });
        message.success('改价成功！');
      } else {
        message.error(msg);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.data.list,
        pagination: {
          ...state.pagination,
          total: payload.data.resultCount,
        },
      };
    },
    userSource(state, { payload }) {
      return {
        ...state,
        userSourceList: payload.data,
      };
    },

    changeGoodsName(state, { payload }) {
      // 商品名称
      return {
        ...state,
        searchObj: {
          ...state.searchObj,
          goodsName: payload,
        },
      };
    },
    changeUserState(state, { payload }) {
      // 状态
      return {
        ...state,
        searchObj: {
          ...state.searchObj,
          orderState: payload,
        },
      };
    },
    changePage(state, { payload }) {
      // 分页
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current: payload.current,
          pageSize: payload.pageSize,
        },
      };
    },
    setDetail(state, { payload }) {
      //  详情
      return {
        ...state,
        visible: true,
        record: payload.data,
        id: payload.id,
        specsList: payload.data.specsList,
      };
    },
    closeModal(state) {
      return {
        ...state,
        visible: false,
        goodsModalVisible: false,
        cancelModalVisible: false,
        changePriceModalVisible: false,
        remakes: '',
        express: {
          logisticsNo: '',
          expressName: '',
        },
        changePrice: {
          freight: '',
          totalGoodsPrice: '',
          totalFee: 0,
        },
      };
    },
    sentGoods(state) {
      // 发货
      return {
        ...state,
        visible: false,
        goodsModalVisible: true,
      };
    },
    changeExpress(state, { payload }) {
      // 快递公司
      return {
        ...state,
        express: {
          ...state.express,
          expressName: payload,
        },
      };
    },
    changeLogisticsNo(state, { payload }) {
      // 快递单号
      return {
        ...state,
        express: {
          ...state.express,
          logisticsNo: payload,
        },
      };
    },
    openGoodsModel(state, { payload }) {
      // 打开发货模态框
      return {
        ...state,
        goodsModalVisible: true,
        id: payload,
      };
    },
    openCancelModel(state, { payload }) {
      // 打开取消模态框
      return {
        ...state,
        cancelModalVisible: true,
        record: payload,
      };
    },
    changeTotalPrice(state, { payload }) {
      // 现商品总价
      const freight = state.changePrice.freight ? parseFloat(state.changePrice.freight) : 0;
      const totalGoodsPrice = payload ? parseFloat(payload) : 0;
      return {
        ...state,
        changePrice: {
          ...state.changePrice,
          totalGoodsPrice: payload,
          totalFee: Math.round((freight + totalGoodsPrice) * 100) / 100,
        },
      };
    },
    changeFreight(state, { payload }) {
      // 现运费
      const totalGoodsPrice = state.changePrice.totalGoodsPrice
        ? parseFloat(state.changePrice.totalGoodsPrice)
        : 0;
      const freight = payload ? parseFloat(payload) : 0;
      return {
        ...state,
        changePrice: {
          ...state.changePrice,
          freight: payload,
          totalFee: Math.round((freight + totalGoodsPrice) * 100) / 100,
        },
      };
    },
    upState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    reset() {
      return initState();
    },
  },
};
