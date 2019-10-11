import React, { Component } from 'react';
import { Button, Select, Table, TreeSelect, Modal } from 'antd';
import { connect } from 'dva';
import FormItem from '@/components/FormItem';
import InputNumber from '@/components/InputNumber';

import styles from '../less/style.less';
import mStyles from './style.less';
import { billingMethod as billingMethodType, packageMethod as PM } from './service';

const columnWidget = (title, key, columnIndex, that, realRegionData) => ({
  title,
  key,
  width: columnIndex === 0 ? 300 : 100,
  render: (___, __, index) => {
    const { dispatch, regionData, regionalFreightList, disableList } = that.props;
    return realRegionData && regionalFreightList ? (
      <TreeSelect
        // allowClear
        treeData={realRegionData}
        value={regionalFreightList[index][columnIndex]}
        onClick={() => {
          dispatch({
            type: 'brandCenterFreightMutation/handleDisabledRegion',
            rowIndex: index,
            regionData,
            disableList,
          });
        }}
        onChange={value =>
          dispatch({
            type: 'brandCenterFreightMutation/updateRegionalFreightList',
            rowIndex: index,
            columnIndex,
            value,
            isTreeSelect: true,
          })
        }
        treeCheckable
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
        searchPlaceholder="选择地区"
      />
    ) : (
      <InputNumber
        value={regionalFreightList && regionalFreightList[index][columnIndex]}
        onChange={e =>
          dispatch({
            type: 'brandCenterFreightMutation/updateRegionalFreightList',
            rowIndex: index,
            columnIndex,
            value: e,
          })
        }
      />
    );
  },
});

@connect(({ brandCenterFreightMutation, brandCenterFreight }) => ({
  ...brandCenterFreightMutation,
  data: brandCenterFreight.data,
  regionData: brandCenterFreight.regionData,
  page: brandCenterFreight.page,
}))
class Page extends Component {
  componentDidMount() {
    this.resetData();
  }

  resetData = () => {
    const { dispatch, match, data, regionData } = this.props;
    let tableData;
    let pageData;
    if (match.params.id && data && data.length > 0) {
      const infos = data.filter(v => v.templateId === match.params.id.toString());
      if (!infos || infos.length !== 1) {
        return;
      }
      const {
        templateId,
        templateName,
        billingMethod,
        firstNumber,
        firstCharge,
        continueNumber,
        continueCharge,
        packageMethod,
        packageNumber,
        regionList,
      } = infos[0];
      tableData = regionList;
      pageData = {
        templateId,
        templateName,
        billingMethod,
        firstNumber,
        firstCharge,
        continueNumber,
        continueCharge,
        packageMethod,
        packageNumber,
      };
    }
    dispatch({
      type: 'brandCenterFreightMutation/fetch',
      pageData,
      tableData,
      regionData,
    });
  };

  columns = realRegionData => [
    columnWidget('适用地区', 'region', 0, this, realRegionData),
    columnWidget(
      this.props.billingMethod === billingMethodType.WEIGHT ? '首重(Kg)' : '首件(个)',
      'firstNumber',
      1,
      this,
    ),
    columnWidget('运费(元)', 'firstCharge', 2, this),
    columnWidget(
      this.props.billingMethod === billingMethodType.WEIGHT ? '续重(Kg)' : '续件(个)',
      'continueNumber',
      3,
      this,
    ),
    columnWidget('续费(元)', 'continueCharge', 4, this),
  ];

  onClickSave = () => {
    const { dispatch, match, page } = this.props;
    dispatch({
      type: 'brandCenterFreightMutation/postTemplate',
      templateId: match.params.id,
      page,
    });
  };

  onClickCancel = () => {
    this.props.history.push('/system/fare');
  };

  onClickReset = () => {
    this.resetData();
  };

  onClickDelete = () => {
    const { dispatch, match } = this.props;
    Modal.confirm({
      title: '操作确认',
      content: (
        <>
          确认要删除此模板吗？
          <br />
          注意: 若存在关联了此运费模板的商品，则此模板不允许删除
        </>
      ),
      onOk() {
        dispatch({
          type: 'brandCenterFreightMutation/deleteTemplate',
          templateId: match.params.id,
        });
      },
      okText: '确认',
      cancelText: '取消',
    });
  };

  onValueChange = (v, fn, sendDirectValue = true) => {
    this.props.dispatch({
      type: `brandCenterFreightMutation/${fn}`,
      payload: sendDirectValue ? v : v.target.value,
    });
  };

  renderWidget = (title, value, onChange) => (
    <div className={mStyles.widget}>
      <div>{title}</div>
      <InputNumber value={value} onChange={onChange} />
    </div>
  );

  renderPost = () => {
    const {
      templateName,
      billingMethod,
      firstNumber,
      firstCharge,
      continueNumber,
      continueCharge,
      packageMethod,
      packageNumber,
      billingMethodList,
      packageMethodList,
      tableSource,
      realRegionData,
    } = this.props;
    return (
      <div>
        <div className={styles.formItemsLong}>
          <div className={mStyles.shortWidget}>
            <FormItem
              label="模板名称"
              require
              value={templateName}
              onChange={e => this.onValueChange(e, 'updateTemplateName', false)}
            />
          </div>
          <div className={mStyles.shortWidget}>
            <FormItem label="计费方式" require>
              <Select
                className={styles.select}
                placeholder="-- 请选择 --"
                value={billingMethod}
                onChange={value => this.onValueChange(value, 'updateBillingMethod')}
              >
                {billingMethodList.map(v => (
                  <Select.Option key={v.id} value={v.id}>
                    {v.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </div>
          <div className={mStyles.shortWidget}>
            <FormItem label="缺省运费" require>
              <div>
                {this.renderWidget(
                  billingMethod === billingMethodType.WEIGHT ? '首重(Kg):' : '首件(个):',
                  firstNumber,
                  e => this.onValueChange(e, 'updateFirstNumber'),
                )}
                {this.renderWidget('运费(元):', firstCharge, e =>
                  this.onValueChange(e, 'updateFirstCharge'),
                )}
                {this.renderWidget(
                  billingMethod === billingMethodType.WEIGHT ? '续重(Kg):' : '续件(个):',
                  continueNumber,
                  e => this.onValueChange(e, 'updateContinueNumber'),
                )}
                {this.renderWidget('续费(元):', continueCharge, e =>
                  this.onValueChange(e, 'updateContinueCharge'),
                )}
              </div>
            </FormItem>
          </div>
          <FormItem label="地区运费">
            <Table
              rowKey="tableID"
              dataSource={tableSource}
              columns={this.columns(realRegionData)}
              pagination={false}
              size="middle"
              bordered
            />
          </FormItem>
          <div className={mStyles.veryShortWidget}>
            <FormItem label="包邮方式" require>
              <Select
                className={mStyles.halfWidget}
                placeholder="-- 请选择 --"
                value={packageMethod}
                onChange={value => this.onValueChange(value, 'updatePackageMethod')}
              >
                {packageMethodList.map(v => (
                  <Select.Option key={v.id} value={v.id}>
                    {v.name}
                  </Select.Option>
                ))}
              </Select>
              {packageMethod === PM.NONE ? null : (
                <InputNumber
                  className={mStyles.halfWidget}
                  placeholder="包邮数量/金额"
                  value={packageNumber}
                  onChange={value => this.onValueChange(value, 'updatePackageNumber')}
                />
              )}
            </FormItem>
          </div>
        </div>
        <div className={styles.bottomButtons}>
          <Button className={styles.bottomButton} type="primary" onClick={this.onClickSave}>
            提交
          </Button>
          {this.props.match.params.id && (
            <>
              <Button className={styles.bottomButton} onClick={this.onClickReset}>
                重置
              </Button>
              <Button className={styles.bottomButton} type="danger" onClick={this.onClickDelete}>
                删除
              </Button>
            </>
          )}
          <Button className={styles.bottomButton} onClick={this.onClickCancel}>
            取消
          </Button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className={styles.container}></div>
        <div className="ant-card ant-card-bordered">
          <div className="ant-card-body">{this.renderPost()}</div>
        </div>
      </div>
    );
  }
}

export default Page;
