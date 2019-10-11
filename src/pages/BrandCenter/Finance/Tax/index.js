import React, { Component } from 'react';
import { connect } from 'dva';
import ListPage from '@/components/ListPage';
import styles from './style.less';
import { displayYuan } from '@/utils/utils';

const columns = () => [
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
    title: '纳税额（元）',
    key: 'ratal',
    render: (_, row) => displayYuan(row.ratal),
  },
  {
    title: '返税比例',
    dataIndex: 'taxRefundRatio',
    key: 'taxRefundRatio',
  },
  {
    title: '返税金额（元）',
    dataIndex: 'taxRefundAmount',
    key: 'taxRefundAmount',
    render: (_, row) => displayYuan(row.taxRefundAmount),
  },
  {
    title: '返税方式',
    dataIndex: 'taxRefundWay',
    key: 'taxRefundWay',
    render: (val, record) => (
      <>
        <span>{record.taxRefundWay === 0 ? '线下打款' : null}</span>
        <span>{record.taxRefundWay === 1 ? '线上支付' : null}</span>
        <span>{record.taxRefundWay === 2 ? '后台充值' : null}</span>
      </>
    ),
  },
  {
    title: '返税说明',
    dataIndex: 'taxRefundExplain',
    key: 'taxRefundExplain',
  },
  {
    title: '到账日期',
    dataIndex: 'accountTime',
    key: 'accountTime',
  },
];

@connect(({ financeTax }) => financeTax)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeTax/getList',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeTax/destory',
    });
  }

  handleChange = pagination => {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeTax/getList',
      payload: pagination,
    });
  };

  render() {
    const { data, pagination, children, route, location } = this.props;
    if (route.path !== location.pathname) return children;

    return (
      <div className={styles.container}>
        <div style={{ fontSize: '18px', marginLeft: '22px', marginTop: '30px' }}>返税明细</div>
        <ListPage
          bordered={false}
          rowKey="id"
          dataSource={data}
          columns={columns(this)}
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Page;
