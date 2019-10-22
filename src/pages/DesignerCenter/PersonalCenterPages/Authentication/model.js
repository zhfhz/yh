import { message } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { verify, getVerifyState, getVerifyInfo } from './service';

export default {
  namespace: 'designerCenterAuthentication',
  state: {
    text: 'loading...',
    eduList: [{}],
    awardList: [],
    fieldList: [{}],
    verifyState: null,
    goToEdit: false,
  },

  effects: {
    *fetch(__, { call, put }) {
      const { ok, data } = yield call(getVerifyState);
      if (!ok) {
        message.error('获取审核状态失败');
        return;
      }
      yield put({
        type: 'save',
        payload: {
          goToEdit: false,
          verifyState: data.auditStatus,
          rejectReason: data.rejectReason,
        },
      });
      yield put({
        type: 'fetchInfo',
      });
    },
    *fetchInfo(__, { call, put }) {
      const { ok, data } = yield call(getVerifyInfo);
      if (!ok) {
        message.error('获取审核信息失败');
        return;
      }

      const fieldsInfo = data.fieldList.reduce(
        (pre, cur) => `${pre.fieldName}、${cur.fieldName}`)

      yield put({
        type: 'save',
        payload: {
          verifyInfo: data,
          fieldsInfo,
        },
      });
    },
    *verify({ params }, { call, put }) {
      const { teachList, prizeList } = params;
      const newTeachList = teachList.map(v => {
        const v2 = { ...v };
        v2.educationStartTime = v.educationStartTime.format('YYYY-MM-DD HH:mm:ss');
        v2.educationEndTime = v.educationEndTime.format('YYYY-MM-DD HH:mm:ss');
        return v2;
      })
      const newPrizeList = prizeList.map(v => {
        const v2 = { ...v };
        v2.winTime = v.winTime.format('YYYY-MM-DD HH:mm:ss');
        return v2;
      })
      const newParams = {
        ...params,
        teachList: newTeachList,
        prizeList: newPrizeList,
      }
      const { ok } = yield call(verify, newParams);
      if (!ok) {
        message.error('认证提交失败');
      } else {
        message.success('认证提交成功');
      }
      yield put({
        type: 'fetch',
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
    goEdit(state) {
      const { verifyInfo } = state;

      const eduList = verifyInfo.teachList.map(v => {
        const v2 = { ...v }
        v2.educationStartTime = moment(v.educationStartTime);
        v2.educationEndTime = moment(v.educationEndTime);
        return v2;
      })

      const awardList = verifyInfo.prizeList.map(v => {
        const v2 = { ...v }
        v2.winTime = moment(v.winTime);
        return v2;
      })

      return {
        ...state,
        goToEdit: true,
        name: verifyInfo.fullName,
        idCard: verifyInfo.idCardNo,
        frontImages: [{ server: verifyInfo.idCardImageFront }],
        backImages: [{ server: verifyInfo.idCardImageBack }],
        eduList,
        awardList,
        fieldList: verifyInfo.fieldList,
      };
    },
    addEdu(state) {
      const { eduList } = state;
      eduList.push({});
      return {
        ...state,
        eduList: [...eduList],
      };
    },
    addAward(state) {
      const { awardList } = state;
      awardList.push({});
      return {
        ...state,
        awardList: [...awardList],
      };
    },
    addField(state) {
      const { fieldList } = state;
      fieldList.push({});
      return {
        ...state,
        fieldList: [...fieldList],
      };
    },
    delEdu(state, { index, decoratorList, setFieldsValue }) {
      const { eduList } = state;
      _.pull(eduList, eduList[index]);

      if (eduList.length === 0) {
        eduList.push({});
      }

      // handle decorator values
      _.pull(decoratorList, decoratorList[index]);
      if (decoratorList.length === 0) {
        decoratorList.push({
          educationStartTime: null,
          educationEndTime: null,
          schoolName: null,
          majorName: null,
        });
      }
      setFieldsValue({
        eduList: [...decoratorList],
      })

      return {
        ...state,
        eduList: [...eduList],
      };
    },
    delAward(state, { index, decoratorList, setFieldsValue }) {
      const { awardList } = state;
      _.pull(awardList, awardList[index]);

      // handle decorator values
      _.pull(decoratorList, decoratorList[index]);
      if (decoratorList.length === 0) {
        decoratorList.push({
          winTime: null,
          awardsName: null,
          awardsTitleName: null,
        });
      }
      setFieldsValue({
        awardList: [...decoratorList],
      })

      return {
        ...state,
        awardList: [...awardList],
      };
    },
    delField(state, { index, decoratorList, setFieldsValue }) {
      const { fieldList } = state;
      _.pull(fieldList, fieldList[index]);

      if (fieldList.length === 0) {
        fieldList.push({});
      }

      // handle decorator values
      _.pull(decoratorList, decoratorList[index]);
      if (decoratorList.length === 0) {
        decoratorList.push({
          fieldName: null,
        });
      }
      setFieldsValue({
        fieldList: [...decoratorList],
      })

      return {
        ...state,
        fieldList: [...fieldList],
      };
    },
  },
};
