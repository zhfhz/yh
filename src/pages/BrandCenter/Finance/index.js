import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, Input, Button } from 'antd';
import ListPage from '@/components/ListPage';
import FormItem from '@/components/FormItem';
import { financeType, financeWay, financeStatus } from './model';
import Breadcrumb from '@/components/Breadcrumb';

import styles from './style.less';
import { displayYuan } from '@/utils/utils';
import financeIcon from '@/assets/finance_icon.png';

const { Option } = Select;

const columns = [
  {
    title: '序号',
    key: 'idx',
    render: (val, reocrd, index) => <span>{index + 1}</span>,
  },
  {
    title: '交易流水号',
    dataIndex: 'transactionNo',
    key: 'transactionNo',
  },
  {
    title: '交易类型',
    dataIndex: 'transactionType',
    key: 'transactionType',
    render: (val, record) => (
      <span>{record.transactionType === 0 ? '商品订单收入' : '资金提现'}</span>
    ),
  },
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
  },
  {
    title: '第三方交易流水号',
    key: 'thirdPartyPipelineNo',
    dataIndex: 'thirdPartyPipelineNo',
  },
  {
    title: '交易金额（元）',
    key: 'transactionAmount',
    render: (_, row) => displayYuan(row.transactionAmount),
  },
  {
    title: '交易方式',
    dataIndex: 'transactionWay',
    key: 'transactionWay',
    render: (val, record) => <span>{record.transactionType === 0 ? '线上支付' : '线下打款'}</span>,
  },
  {
    title: '交易时间',
    dataIndex: 'transactionTime',
    key: 'transactionTime',
  },
  {
    title: '状态',
    dataIndex: 'transactionStatus',
    key: 'transactionStatus',
    render: (val, record) => (
      <>
        <span>{record.transactionStatus === 0 ? '冻结中' : null}</span>
        <span>{record.transactionStatus === 1 ? '已到账' : null}</span>
        <span>{record.transactionStatus === 2 ? '已退款' : null}</span>
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render(_, record) {
      return (
        <>
          <Button type="link" size="small">
            详情
          </Button>
        </>
      );
    },
  },
];

@connect(({ brandCenterFinance }) => brandCenterFinance)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterFinance/getList',
    });
    dispatch({
      type: 'brandCenterFinance/getFinanceInfo',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterFinance/release',
    });
  }

  // 点击查询按钮
  handleSearch = () => {
    const { dispatch, pagination } = this.props;
    dispatch({
      type: 'brandCenterFinance/getList',
      payload: {
        current: 1,
        pageSize: pagination.pageSize,
      },
    });
  };

  // 分页查询
  handleChange = pagination => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterFinance/getList',
      payload: pagination,
    });
  };

  renderFilterSection = () => {
    const { searchObj, dispatch } = this.props;
    return (
      <>
        <FormItem label="交易类型" fixLabel={false}>
          <Select
            value={searchObj.transactionType}
            onChange={e => dispatch({ type: 'brandCenterFinance/changeFinanceType', payload: e })}
          >
            {financeType.map(it => (
              <Option key={it.value} value={it.value}>
                {it.label}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="交易方式" fixLabel={false}>
          <Select
            value={searchObj.transactionWay}
            onChange={e => dispatch({ type: 'brandCenterFinance/changeFinanceWay', payload: e })}
          >
            {financeWay.map(it => (
              <Option key={it.value} value={it.value}>
                {it.label}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="状态" fixLabel={false}>
          <Select
            value={searchObj.transactionStatus}
            onChange={e => dispatch({ type: 'brandCenterFinance/changeFinanceState', payload: e })}
          >
            {financeStatus.map(it => (
              <Option key={it.value} value={it.value}>
                {it.label}
              </Option>
            ))}
          </Select>
        </FormItem>
      </>
    );
  };

  render() {
    const { data, pagination, financeInfo, route, location, children } = this.props;
    if (route.path !== location.pathname) return children;

    return (
      <div className={styles.container}>
        <Breadcrumb title="财务管理" />
        <div className={styles['finance-info']}>
          <div className={styles.balance}>
            <div style={{ marginLeft: '14px', display: 'table-cell', verticalAlign: 'bottom' }}>
              <span className={styles.title}>当前账户余额：￥{financeInfo.accountBalances}</span>
              <span className={styles.subtitle}>
                (可提现金额￥{financeInfo.withdrawableBalance})
              </span>
              <Button
                type="primary"
                className={styles.button}
                onClick={() => this.props.history.push('/center/brandcenter/finance/withdraw')}
              >
                我要提现
              </Button>
            </div>
            <div style={{ marginRight: '14px' }}>
              <span
                className={styles.record}
                onClick={() => this.props.history.push('/center/brandcenter/finance/draw')}
              >
                提现记录
              </span>
              <span
                className={styles.record}
                onClick={() => this.props.history.push('/center/brandcenter/finance/tax')}
              >
                返税明细
              </span>
            </div>
          </div>
          <div className={styles.balance}>
            <span style={{ marginLeft: '14px' }} className={styles.title}>
              税收返税总计：￥{financeInfo.taxRefundAmount}
            </span>
            <img src={financeIcon} className={styles.picture} alt="" />
          </div>
        </div>
        <ListPage
          bordered={false}
          rowKey="id"
          dataSource={data}
          columns={columns}
          pagination={pagination}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          filterRender={this.renderFilterSection()}
        />
      </div>
    );
  }
}

export default Page;
