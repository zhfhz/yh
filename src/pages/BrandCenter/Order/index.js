import React, { Component } from 'react';
import { connect } from 'dva';
import uuid from 'uuid/v1';
import { Button, Select, Input, Modal, Divider, Row, Col } from 'antd';
import ListPage from '@/components/ListPage';
import FormItem from '@/components/FormItem';
import { getOrderState, getInvoiceType, getPayType, getRefundStatus } from './service';
import { orderSateList } from './model';
import InputNumber from '@/components/InputNumber';
import { displayYuan } from '@/utils/utils';

import styles from './style.less';

const { Option } = { ...Select };
const { TextArea } = Input;
const columns = self => [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    render: (val, reocrd, index) => <span>{index + 1}</span>,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNo',
    key: 'orderNo',
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
  },
  {
    title: '数量',
    dataIndex: 'goodsNumber',
    key: 'goodsNumber',
  },
  {
    title: '运费（元）',
    dataIndex: 'freight',
    key: 'freight',
    render: (val, record) => (
      <span>{record.freightUpdate ? displayYuan(record.freightUpdate) : displayYuan(val)}</span>
    ),
  },
  {
    title: '订单总额（元）',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (val, record) => (
      <span>
        {record.totalPriceUpdate ? displayYuan(record.totalPriceUpdate) : displayYuan(val)}
      </span>
    ),
  },
  {
    title: '实付金额（元）',
    dataIndex: 'actualPrice',
    key: 'actualPrice',
    render: val => <span>{displayYuan(val)}</span>,
  },
  {
    title: '下单人电话',
    dataIndex: 'mobileNumber',
    key: 'mobileNumber',
  },
  {
    title: '下单时间',
    dataIndex: 'orderTime',
    key: 'orderTime',
  },
  {
    title: '状态',
    dataIndex: 'orderState',
    key: 'orderState',
    render: val => <span>{getOrderState(val)}</span>,
  },
  {
    title: '操作',
    key: 'action',
    render: (val, record) => (
      <div>
        {record.orderState === 1 ? (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button type="link" onClick={() => self.getDetail(record, 'order')} size="small">
              详情
            </Button>
            <Button type="link" onClick={() => self.openSendGoodsModal(record)} size="small">
              发货
            </Button>
            <Button type="link" onClick={() => self.openCancelModal(record)} size="small">
              取消
            </Button>
          </div>
        ) : (
          <>
            {record.orderState === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button type="link" onClick={() => self.getDetail(record, 'order')} size="small">
                  详情
                </Button>
                <Button type="link" onClick={() => self.openChangePriceModal(record)} size="small">
                  改价
                </Button>
              </div>
            ) : (
              <Button type="link" onClick={() => self.getDetail(record, 'order')} size="small">
                详情
              </Button>
            )}
          </>
        )}
      </div>
    ),
  },
];

@connect(({ brandCenterOrder }) => brandCenterOrder)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterOrder/getOrderList',
    });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'brandCenterOrder/reset' });
  }

  getDetail = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterOrder/getOrderDetail',
      payload: record.id,
    });
  };

  openSendGoodsModal = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterOrder/openGoodsModel',
      payload: record.id,
    });
  };

  openChangePriceModal = item => {
    const { dispatch } = this.props;
    const totalGoodspriceUpdate =
      item.orderUpdateStatus === 1
        ? displayYuan(item.totalGoodspriceUpdate)
        : displayYuan(item.currentPrice * item.goodsNumber);
    const freightUpdate =
      item.orderUpdateStatus === 1 ? displayYuan(item.freightUpdate) : displayYuan(item.freight);
    const totalGoodsMoney =
      item.orderUpdateStatus === 1
        ? parseFloat(item.totalGoodspriceUpdate)
        : parseFloat(item.currentPrice * item.goodsNumber);
    const freightMoney =
      item.orderUpdateStatus === 1 ? parseFloat(item.freightUpdate) : parseFloat(item.freight);
    const totalFeeMoney = displayYuan(totalGoodsMoney + freightMoney);
    dispatch({
      type: 'brandCenterOrder/upState',
      payload: {
        changePriceModalVisible: true,
        record: item,
        changePrice: {
          freight: freightUpdate,
          totalGoodsPrice: totalGoodspriceUpdate,
          totalFee: totalFeeMoney,
        },
      },
    });
  };

  openCancelModal = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterOrder/openCancelModel',
      payload: item,
    });
  };

  renderFilterSection = () => {
    const { searchObj, dispatch } = this.props;
    return (
      <>
        <FormItem label="商品名称" fixLabel={false}>
          <Input
            onChange={e =>
              dispatch({ type: 'brandCenterOrder/changeGoodsName', payload: e.target.value })
            }
            value={searchObj.goodsName}
            placeholder="商品名称"
          />
        </FormItem>
        <FormItem label="状态" fixLabel={false}>
          <Select
            value={searchObj.orderState}
            onChange={e => dispatch({ type: 'brandCenterOrder/changeUserState', payload: e })}
          >
            {orderSateList.map(it => (
              <Option key={it.value} value={it.value}>
                {it.label}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="下单用户" fixLabel={false}>
          <Input
            onChange={e =>
              dispatch({
                type: 'brandCenterOrder/upState',
                payload: { searchObj: { ...searchObj, mobileNumber: e.target.value } },
              })
            }
            value={searchObj.mobileNumber}
            placeholder="下单人电话号码"
          />
        </FormItem>
      </>
    );
  };

  render() {
    const {
      data,
      pagination,
      dispatch,
      record,
      visible,
      specsList,
      goodsModalVisible,
      express,
    } = this.props;
    const { cancelModalVisible, remakes, changePriceModalVisible, changePrice } = this.props;
    return (
      <div className={styles.container}>
        <ListPage
          rowKey="id"
          dataSource={data}
          columns={columns(this)}
          filterRender={this.renderFilterSection()}
          // addonRender={ this.renderAddonSection() }
          pagination={pagination}
          onChange={paginations =>
            dispatch({
              type: 'brandCenterOrder/changePageData',
              payload: { current: paginations.current, pageSize: paginations.pageSize },
            })
          }
          onSearch={() => dispatch({ type: 'brandCenterOrder/searchData' })}
        />
        {/* 订单详情 */}
        <Modal
          title="订单详情"
          visible={visible}
          onCancel={() => {
            dispatch({ type: 'brandCenterOrder/closeModal' });
          }}
          footer={
            record.orderState === 1
              ? [
                  <Button
                    key="back"
                    type="primary"
                    onClick={() => dispatch({ type: 'brandCenterOrder/sentGoods' })}
                  >
                    发货
                  </Button>,
                  <Button
                    key="submit"
                    onClick={() => {
                      dispatch({ type: 'brandCenterOrder/closeModal' });
                    }}
                  >
                    取消
                  </Button>,
                ]
              : [
                  <Button
                    key="submitok"
                    type="primary"
                    onClick={() => {
                      dispatch({ type: 'brandCenterOrder/closeModal' });
                    }}
                  >
                    我知道了
                  </Button>,
                ]
          }
        >
          <div style={{ textAlign: 'center' }}>订单状态：{getOrderState(record.orderState)}</div>
          {record.orderState === 4 ? (
            <>
              <div style={{ textAlign: 'center' }}>取消原因：{record.remarks}</div>
              <div style={{ textAlign: 'center' }}>
                退款状态：{getRefundStatus(record.refundStatus)}
              </div>
            </>
          ) : null}
          {record.orderState === 2 || record.orderState === 3 ? (
            <div style={{ textAlign: 'center' }}>
              物流单号：{record.logisticsNo}({record.express})
            </div>
          ) : null}
          <div style={{ marginTop: '20px' }}>
            <span>收货人：{record.receiver}</span>
            <span style={{ marginLeft: '20px' }}>{record.mobileNumber}</span>
            <br />
            <span>{record.address}</span>
          </div>
          <br />
          <div>{record.supplier}</div>
          <Divider style={{ margin: '3px 0' }} />
          <div>
            <span>{record.goodsName}</span>
            <span style={{ float: 'right' }}>
              {record.goodsPrice ? `￥${displayYuan(record.goodsPrice)}` : ''}
            </span>
          </div>
          <div>
            {specsList &&
              specsList.map(it => (
                <span
                  key={uuid()}
                  style={{ marginRight: '10px' }}
                >{`${it.paramName}-${it.paramValue}`}</span>
              ))}
            <span style={{ float: 'right' }}>
              {record.goodsNumber ? `x${record.goodsNumber}` : ''}
            </span>
          </div>
          <br />
          <div>
            商品总价：￥
            {record.totalGoodspriceUpdate
              ? displayYuan(record.totalGoodspriceUpdate)
              : displayYuan(record.totalGoodsprice)}
            {record.totalGoodspriceUpdate && (
              <span style={{ marginLeft: '10px' }}>
                (原￥{displayYuan(record.totalGoodsprice)})
              </span>
            )}
          </div>
          <div>
            运费：￥
            {record.freightUpdate !== record.freight
              ? displayYuan(record.freightUpdate)
              : displayYuan(record.freight)}
            {record.freightUpdate !== record.freight && record.freightUpdate !== null && (
              <span style={{ marginLeft: '10px' }}>(原￥{displayYuan(record.freight)})</span>
            )}
          </div>
          <div>实付款：{record.actualPrice ? `￥ ${displayYuan(record.actualPrice)}` : ''}</div>
          <div>发票信息：{getInvoiceType(record.whetherInvoice)}</div>
          {record.whetherInvoice !== 0 ? (
            <div>
              <div>发票类型：{record.invoiceType === 0 ? '增值税专用' : '增值税普通'}</div>
              <div>发票抬头：{record.invoiceRise}</div>
              <div>发票税号：{record.invoiceDuty}</div>
              <div>发票备注：{record.invoiceRemarks}</div>
            </div>
          ) : null}
          <br />
          {record.orderState === 0 ? (
            <div>
              <div>订单编号：{record.orderNo}</div>
              <div>下单时间：{record.orderTime}</div>
            </div>
          ) : (
            <div>
              <div>订单编号：{record.orderNo}</div>
              <div>支付流水号：{record.payNumber}</div>
              <div>支付方式：{getPayType(record.payType)}</div>
              <div>下单时间：{record.orderTime}</div>
              <div>支付时间：{record.payTime}</div>
              {record.orderState === 2 || record.orderState === 3 ? (
                <div>发货时间：{record.deliveryTime}</div>
              ) : null}
              {record.orderState === 4 ? (
                <>
                  <div>取消时间：{record.cancelTime}</div>
                  <div>退款流水号：{record.serialNo}</div>
                  <div>操作人：{record.initiator}</div>
                </>
              ) : null}
              {record.orderState === 3 ? <div>交易完成时间：{record.completeTime}</div> : null}
            </div>
          )}
        </Modal>
        {/* 发货 */}
        <Modal
          title="发货"
          visible={goodsModalVisible}
          onCancel={() => {
            dispatch({ type: 'brandCenterOrder/closeModal' });
          }}
          onOk={() => {
            dispatch({ type: 'brandCenterOrder/sendGoods' });
          }}
        >
          <Row>
            <Col span={18}>
              <FormItem label="快递公司">
                <Input
                  onChange={e =>
                    dispatch({ type: 'brandCenterOrder/changeExpress', payload: e.target.value })
                  }
                  value={express.expressName}
                />
              </FormItem>
              <br />
              <FormItem label="快递单号">
                <Input
                  onChange={e =>
                    dispatch({
                      type: 'brandCenterOrder/changeLogisticsNo',
                      payload: e.target.value,
                    })
                  }
                  value={express.logisticsNo}
                  maxLength={20}
                />
              </FormItem>
            </Col>
          </Row>
        </Modal>
        {/* 取消、退款 */}
        <Modal
          title="操作确认"
          visible={cancelModalVisible}
          onCancel={() => {
            dispatch({ type: 'brandCenterOrder/closeModal' });
          }}
          onOk={() => {
            dispatch({ type: 'brandCenterOrder/cancel' });
          }}
        >
          <div style={{ position: 'relative' }}>
            <p>是否确认要执行取消此订单操作？</p>
            <p style={{ color: '#b5b5b5' }}>取消后将款项原路退回至用户支付的账户中</p>
            <p>取消原因</p>
            <TextArea
              onChange={v =>
                dispatch({ type: 'brandCenterOrder/upState', payload: { remakes: v.target.value } })
              }
              value={remakes}
              maxLength={30}
              style={{ height: '100px' }}
            />
            <span style={{ position: 'absolute', right: '0', bottom: '0px' }}>
              {remakes.length}/30
            </span>
          </div>
        </Modal>
        {/* 改价 */}
        <Modal
          title="改价"
          visible={changePriceModalVisible}
          onCancel={() => {
            dispatch({ type: 'brandCenterOrder/closeModal' });
          }}
          onOk={() => {
            dispatch({ type: 'brandCenterOrder/changeGoodsPrice' });
          }}
        >
          <Row>
            <Col span={10}>
              <Row>
                <Col span={12} style={{ textAlign: 'right' }}>
                  原商品总价：
                </Col>
                <Col span={12}>￥{displayYuan(record.currentPrice * record.goodsNumber)}</Col>
              </Row>
            </Col>
            <Col span={14}>
              <Row>
                <Col span={9} style={{ textAlign: 'right' }}>
                  现商品总价：￥
                </Col>
                <Col span={15}>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    precision={2}
                    value={changePrice.totalGoodsPrice}
                    onChange={value =>
                      dispatch({ type: 'brandCenterOrder/changeTotalPrice', payload: value })
                    }
                    placeholder="现商品总价"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={10}>
              <Row>
                <Col span={12} style={{ textAlign: 'right' }}>
                  原运费：
                </Col>
                <Col span={12}>￥{displayYuan(record.freight)}</Col>
              </Row>
            </Col>
            <Col span={14}>
              <Row>
                <Col span={9} style={{ textAlign: 'right' }}>
                  现运费：￥
                </Col>
                <Col span={15}>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    precision={2}
                    value={changePrice.freight}
                    onChange={value =>
                      dispatch({ type: 'brandCenterOrder/changeFreight', payload: value })
                    }
                    placeholder="现运费"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={10}>
              <Row>
                <Col span={12} style={{ textAlign: 'right' }}>
                  原价合计：
                </Col>
                <Col span={12}>￥{displayYuan(record.totalPrice)}</Col>
              </Row>
            </Col>
            <Col span={14}>
              <Row>
                <Col span={9} style={{ textAlign: 'right' }}>
                  现价合计：￥
                </Col>
                <Col span={15}>
                  <span>{changePrice.totalFee}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Page;
