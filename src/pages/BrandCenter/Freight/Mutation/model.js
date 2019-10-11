import { message } from 'antd';
import { routerRedux } from 'dva/router';
import _ from 'lodash';
import {
  postTemplate,
  deleteTemplate,
  putTemplate,
  packageMethod as PM,
  generalState,
} from './service';
import { validate, moneyInputRegex } from './validate';
import { displayYuan, displayFen } from '@/utils/utils';

export default {
  namespace: 'brandCenterFreightMutation',
  state: {
    templateName: '',
    billingMethod: undefined,
    firstNumber: '',
    firstCharge: '',
    continueNumber: '',
    continueCharge: '',
    packageMethod: undefined,
    packageNumber: '',
    regionalFreightList: [][generalState.FARE_TEMPLATE_MAX],
    // location selector
    checkedValues: [],
    disableList: [5],
    billingMethodList: [
      {
        id: 1,
        name: '按件计费',
      },
      // {
      //   id: 2,
      //   name: '按重计费',
      // },
    ],
    packageMethodList: [
      {
        id: PM.NONE,
        name: '无',
      },
      {
        id: PM.COUNT,
        name: '数量达标',
      },
      {
        id: PM.MONEY,
        name: '金额达标',
      },
    ],
    tableSource: [
      {
        tableID: 1,
      },
      {
        tableID: 2,
      },
      {
        tableID: 3,
      },
      {
        tableID: 4,
      },
      {
        tableID: 5,
      },
    ],
  },

  effects: {
    *fetch({ pageData, tableData, regionData }, { put }) {
      yield put({
        type: 'resetData',
        regionData,
      });
      yield put({
        type: 'initRegionalFreightList',
        payload: generalState.FARE_TEMPLATE_MAX, // 写死5个地区运费选项
      });
      if (pageData) {
        yield put({
          type: 'loadData',
          data: pageData,
        });
      }
      if (tableData) {
        yield put({
          type: 'loadTableData',
          data: tableData,
        });
      }
    },
    *postTemplate({ templateId, page }, { call, put, select }) {
      // 生成发送数据
      const state = yield select(s => s.brandCenterFreightMutation);
      const { realRegionData } = state;

      const regionalFreightList = state.regionalFreightList.map(e => {
        const [region, firstNumber, firstCharge, continueNumber, continueCharge] = e;
        const modifiedRegion = region
          ? _.flatten(
              region.map(v => {
                const findData = realRegionData.find(v2 => v2.dataName === v);
                return findData ? findData.children.map(v3 => v3.dataName) : v;
              }),
            )
          : undefined;

        const obj = {
          dataIds: modifiedRegion,
          firstNumber,
          firstCharge,
          continueNumber,
          continueCharge,
        };
        return obj;
      });

      const {
        templateName,
        billingMethod,
        firstNumber,
        firstCharge,
        continueNumber,
        continueCharge,
        packageMethod,
        packageNumber,
      } = state;

      let modifyNumber;
      if (packageMethod === PM.MONEY) {
        modifyNumber = displayFen(packageNumber);
      } else if (packageMethod === PM.COUNT) {
        modifyNumber = packageNumber;
      }

      const data = {
        templateId, // can be undefined
        templateName: templateName.trim(),
        billingMethod,
        firstNumber,
        firstCharge: displayFen(firstCharge),
        continueNumber,
        continueCharge: displayFen(continueCharge),
        packageMethod,
        packageNumber: modifyNumber,
      };

      data.regionList = regionalFreightList.map(v => {
        const v2 = v;
        v2.firstCharge =
          v2.firstCharge === '' || v2.firstCharge === null || v2.firstCharge === undefined
            ? null
            : displayFen(v2.firstCharge);
        v2.continueCharge =
          v2.continueCharge === '' || v2.continueCharge === null || v2.continueCharge === undefined
            ? null
            : displayFen(v2.continueCharge);
        return v2;
      });

      let pmVali;
      let pmVali0 = {
        value: packageNumber,
        info: '请输入包邮数量/金额',
      };
      if (packageMethod === PM.MONEY) {
        pmVali = {
          value: packageNumber,
          info: '请输入正确的包邮金额(小数点后最多两位)',
          regex: moneyInputRegex,
        };
      } else if (packageMethod === PM.COUNT) {
        pmVali = {
          value: packageNumber,
          info: '请输入正确的包邮数量',
          regex: '^\\d*$',
        };
      } else {
        pmVali = null;
        pmVali0 = null;
      }

      // 校验
      if (
        !validate([
          {
            value: data.templateName,
            info: '请输入模板名称',
          },
          {
            value: data.templateName,
            info: '请输入20字以内的模板名称',
            regex: '^.{1,20}$',
          },
          {
            value: billingMethod,
            info: '请选择计费方式',
          },
          {
            value: firstNumber,
            info: '请输入缺省运费-首件（个）',
          },
          {
            value: firstNumber,
            info: '请输入正确的缺省运费-首件（个）',
            regex: '^\\d*$',
          },
          {
            value: firstNumber,
            info: '缺省运费-首件（个）不能为0',
            regex: '[^0]+',
          },
          {
            value: firstCharge,
            info: '请输入缺省运费-运费（元）',
          },
          {
            value: firstCharge,
            info: '请输入正确的缺省运费-运费（元）(小数点后最多两位)',
            regex: moneyInputRegex,
          },
          {
            value: continueNumber,
            info: '请输入缺省运费-续件（个）',
          },
          {
            value: continueNumber,
            info: '请输入正确的缺省运费-续件（个）',
            regex: '^\\d*$',
          },
          {
            value: continueNumber,
            info: '缺省运费-续件（个）不能为0',
            regex: '[^0]+',
          },
          {
            value: continueCharge,
            info: '请输入缺省运费-续费（元）',
          },
          {
            value: continueCharge,
            info: '请输入正确的缺省运费-续费（元）(小数点后最多两位)',
            regex: moneyInputRegex,
          },
          {
            value: packageMethod,
            info: '请选择包邮方式',
          },
          pmVali0,
          pmVali,
        ])
      ) {
        return;
      }

      for (let i = 0; i < regionalFreightList.length; i += 1) {
        const v = regionalFreightList[i];
        const index = i + 1;
        if (
          (!v.dataIds || v.dataIds.length === 0) &&
          !v.firstNumber &&
          !v.firstCharge &&
          !v.continueNumber &&
          !v.continueCharge
        ) {
          break;
        }
        if (v.dataIds && v.dataIds.length === 0) {
          message.error(`请选择第${index}个地区运费的适用地区`);
          return;
        }
        if (
          !validate([
            {
              value: v.dataIds,
              info: `请选择第${index}个地区运费的适用地区`,
            },
            {
              value: v.firstNumber,
              info: `请输入第${index}个地区运费的缺省运费-首件（个）`,
            },
            {
              value: v.firstNumber,
              info: `请正确输入第${index}个地区运费的缺省运费-首件（个）`,
              regex: '^\\d*$',
            },
            {
              value: v.firstNumber,
              regex: '[^0]+',
              info: `第${index}个地区运费的缺省运费-首件（个）不能为0`,
            },
            {
              value: v.firstCharge,
              info: `请输入第${index}个地区运费的缺省运费-运费（元）`,
            },
            {
              value: v.firstCharge,
              info: `请正确输入第${index}个地区运费的缺省运费-运费（元）(小数点后最多两位)`,
              regex: moneyInputRegex,
            },
            {
              value: v.continueNumber,
              info: `请输入第${index}个地区运费的缺省运费-续件（个）`,
            },
            {
              value: v.continueNumber,
              info: `请正确输入第${index}个地区运费的缺省运费-续件（个）`,
              regex: '^\\d*$',
            },
            {
              value: v.continueNumber,
              regex: '[^0]+',
              info: `第${index}个地区运费的缺省运费-续件（个）不能为0`,
            },
            {
              value: v.continueCharge,
              info: `请输入第${index}个地区运费的缺省运费-续费（元）`,
            },
            {
              value: v.continueCharge,
              info: `请正确输入第${index}个地区运费的缺省运费-续费（元）(小数点后最多两位)`,
              regex: moneyInputRegex,
            },
          ])
        ) {
          return;
        }
      }

      data.regionList = _.pull(regionalFreightList, [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ]);

      // 发送
      let ok1;
      let msg1;
      let msg2;
      if (data.templateId) {
        const { ok, msg } = yield call(putTemplate, data);
        ok1 = ok;
        msg1 = '编辑成功';
        msg2 = msg;
      } else {
        const { ok, msg } = yield call(postTemplate, data);
        ok1 = ok;
        msg1 = '新增成功';
        msg2 = msg;
      }

      // 处理结果
      if (ok1) {
        message.success(msg1);
        yield put({
          type: 'systemFare/fetch',
          page,
        });
        yield put(routerRedux.push('/system/fare'));
      } else {
        message.error(msg2);
      }
    },
    *deleteTemplate({ templateId }, { call, put }) {
      const { ok } = yield call(deleteTemplate, templateId);
      if (ok) {
        message.success('删除成功');
        yield put({
          type: 'systemFare/fetch',
        });
        yield put(routerRedux.push('/system/fare'));
      } else {
        message.error('删除失败');
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    resetData(state, { regionData }) {
      return {
        ...state,
        templateName: '',
        billingMethod: undefined,
        firstNumber: '',
        firstCharge: '',
        continueNumber: '',
        continueCharge: '',
        packageMethod: undefined,
        packageNumber: '',
        regionalFreightList: [][generalState.FARE_TEMPLATE_MAX],
        disableList: new Array(5),
        realRegionData: regionData,
      };
    },
    loadData(state, { data }) {
      const data2 = { ...data };
      data2.firstCharge = displayYuan(data.firstCharge);
      data2.continueCharge = displayYuan(data.continueCharge);
      data2.packageNumber =
        data2.packageMethod === PM.MONEY ? displayYuan(data2.packageNumber) : data2.packageNumber;
      return {
        ...state,
        ...data2,
      };
    },
    loadTableData(state, { data }) {
      const { regionalFreightList, disableList } = state;
      const list = regionalFreightList.map((__, index) => {
        const v = [];
        if (data.length > index) {
          const items =
            data[index].dataIds && data[index].dataIds.length !== 0
              ? data[index].dataIds.split(',')
              : undefined;
          v.push(items);
          v.push(data[index].firstNumber);
          v.push(
            data[index].firstCharge === null ? undefined : displayYuan(data[index].firstCharge),
          );
          v.push(data[index].continueNumber);
          v.push(
            data[index].continueCharge === null
              ? undefined
              : displayYuan(data[index].continueCharge),
          );
          v.push(data[index].regionId);
          disableList[index] = items;
        }
        return v;
      });
      return {
        ...state,
        regionalFreightList: [...list],
        disableList: [...disableList],
      };
    },
    initRegionalFreightList(state, { payload: count }) {
      const regionalFreightList = new Array(count);
      for (let i = 0; i < count; i += 1) {
        regionalFreightList[i] = new Array(generalState.FARE_TEMPLATE_MAX); // 写死 5列
      }
      return {
        ...state,
        regionalFreightList: [...regionalFreightList],
      };
    },
    updateTableCheck(state, { rowIndex, columnIndex, value }) {
      const { regionalFreightList } = state;
      regionalFreightList[rowIndex][columnIndex] = value;
      return {
        ...state,
        regionalFreightList: [...regionalFreightList],
      };
    },
    updateRegionalFreightList(state, { rowIndex, columnIndex, value, isTreeSelect }) {
      const { regionalFreightList, disableList } = state;
      regionalFreightList[rowIndex][columnIndex] = value;

      const newList = [...disableList];
      if (isTreeSelect) {
        newList[rowIndex] = [...value];
      }
      return {
        ...state,
        regionalFreightList: [...regionalFreightList],
        disableList: newList,
      };
    },
    handleDisabledRegion(state, { regionData, rowIndex, disableList }) {
      if (!regionData) {
        return { ...state };
      }
      let cut = [...disableList];
      if (cut.length > rowIndex) {
        cut[rowIndex] = null;
        cut = _.compact(cut);
      }
      const dList = _.flatten(cut);
      const newList = _.cloneDeep(regionData).map(v => {
        const nv = v;
        let allDisable = false;
        if (dList.includes(nv.dataName)) {
          nv.disabled = true;
          allDisable = true;
        }
        if (v.sonList && v.sonList.length !== 0) {
          nv.sonList = v.sonList.map(v2 => {
            const nv2 = v2;
            if (allDisable || dList.includes(nv2.dataName)) {
              nv2.disabled = true;
              nv.disabled = true;
            }
            return nv2;
          });
        }
        return nv;
      });
      return {
        ...state,
        realRegionData: newList,
      };
    },
    updateTemplateName(state, { payload: templateName }) {
      return {
        ...state,
        templateName,
      };
    },
    updateBillingMethod(state, { payload: billingMethod }) {
      return {
        ...state,
        billingMethod,
      };
    },
    updateFirstNumber(state, { payload: firstNumber }) {
      return {
        ...state,
        firstNumber,
      };
    },
    updateFirstCharge(state, { payload: firstCharge }) {
      return {
        ...state,
        firstCharge,
      };
    },
    updateContinueNumber(state, { payload: continueNumber }) {
      return {
        ...state,
        continueNumber,
      };
    },
    updateContinueCharge(state, { payload: continueCharge }) {
      return {
        ...state,
        continueCharge,
      };
    },
    updatePackageMethod(state, { payload: packageMethod }) {
      return {
        ...state,
        packageMethod,
      };
    },
    updatePackageNumber(state, { payload: packageNumber }) {
      return {
        ...state,
        packageNumber,
      };
    },
  },
};
