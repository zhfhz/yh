import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Select, Input, Modal, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import ListPage from '@/components/ListPage';
import FormItem from '@/components/FormItem';

import styles from './style.less';
import { PayMapper, ReivewStatus, StatusMessageMapper, StatusOptions, PayOptions } from './service';
import { displayYuan } from '@/utils/utils';

const { Option } = Select;
const { TextArea } = Input;

const columns = page => [
  {
    title: '序号',
    key: 'idx',
    render: (val, reocrd, index) => <span>{index + 1}</span>,
  },
  {
    title: '提现订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
  },
  {
    title: '提现金额（元）',
    key: 'withdrawAmount',
    render: (_, row) => displayYuan(row.withdrawAmount),
  },
  {
    title: '提现卡号',
    dataIndex: 'withdrawCardNo',
    key: 'withdrawCardNo',
  },
  {
    title: '银行名称',
    dataIndex: 'withdrawBankName',
    key: 'withdrawBankName',
  },
  {
    title: '开户行',
    dataIndex: 'depositBankName',
    key: 'depositBankName',
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    key: 'applyTime',
  },
  {
    title: '状态',
    key: 'withdrawStatus',
    render: (_, row) => StatusMessageMapper[row.withdrawStatus],
  },
  {
    title: '打款时间',
    dataIndex: 'paymentTime',
    key: 'paymentTime',
  },
];

@connect(({ financeDraw }) => financeDraw)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeDraw/getList',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeDraw/destory',
    });
  }

  handleChange = pagination => {
    const { dispatch } = this.props;
    dispatch({
      type: 'financeDraw/getList',
      payload: pagination,
    });
  };

  render() {
    const {
      data,
      pagination,
      children,
      route,
      location,
    } = this.props;
    if (route.path !== location.pathname) return children;

    return (
      <div className={styles.container}>
        <div style={{ fontSize: '18px', marginLeft: '22px', marginTop: '30px' }}>提现记录</div>
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
