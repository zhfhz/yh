import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { connect } from 'dva';
import ListPage from '@/components/ListPage';
import { displayYuan } from '@/utils/utils';
import { ShelfType, SortType } from './service';
import Breadcrumb from '@/components/Breadcrumb';

import styles from './style.less';

const columns = page => [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    render: (val, record, index) => <span>{index + 1}</span>,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
    align: 'center',
  },
  {
    title: '类别',
    dataIndex: 'category',
    key: 'category',
    align: 'center',
  },
  {
    title: '当前售价（元）',
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    align: 'center',
    width: 150,
    render: (val, record, i) => (
      <>
        {record.ifStepPrice !== 1 && <span>{displayYuan(record.currentPrice)}元</span>}
        {record.ifStepPrice === 1 && (
          <span style={{ marginLeft: '10px' }}>
            {displayYuan(record.stepPriceList[record.stepPriceList.length - 1].areaPrice)}~
            {displayYuan(record.stepPriceList[0].areaPrice)}元
          </span>
        )}
      </>
    ),
    // render: (_, row) => displayYuan(row.currentPrice),
  },
  {
    title: '当前总库存',
    dataIndex: 'stockNum',
    key: 'stockNum',
    align: 'center',
  },
  {
    title: '当前已售',
    dataIndex: 'salesVolume',
    key: 'salesVolume',
    align: 'center',
  },
  {
    title: '展示状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: val => (
      <>
        <span>{val === ShelfType.draft ? '草稿' : null}</span>
        <span>{val === ShelfType.putAway ? '已上架' : null}</span>
        <span>{val === ShelfType.soldOut ? '已下架' : null}</span>
        <span>{val === ShelfType.audit ? '审核中' : null}</span>
      </>
    ),
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    render(_, record) {
      return (
        <>
          {// 草稿的状态
          record.status === ShelfType.draft && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                type="link"
                size="small"
                onClick={() =>
                  page.props.history.push(`/center/brandcenter/commodity/edit/${record.id}`)
                }
              >
                编辑
              </Button>
              <Button type="link" size="small" onClick={() => page.openModal(record.id, '上架')}>
                上架
              </Button>
            </div>
          )}
          {// 已上架的状态
          record.status === ShelfType.putAway && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                type="link"
                size="small"
                onClick={() => page.props.history.push(`/center/brandcenter/commodity/detail/${record.id}`)}
              >
                详情
              </Button>
              <Button type="link" size="small" onClick={() => page.openModal(record.id, '下架')}>
                下架
              </Button>
              <Button type="link" size="small" onClick={() => page.goodsStick(record.id)}>
                置顶
              </Button>
            </div>
          )}
          {// 已下架的状态
          record.status === ShelfType.soldOut && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                type="link"
                size="small"
                onClick={() =>
                  page.props.history.push(`/center/brandcenter/commodity/edit/${record.id}`)
                }
              >
                编辑
              </Button>
              <Button type="link" size="small" onClick={() => page.openModal(record.id, '上架')}>
                上架
              </Button>
            </div>
          )}
          {// 审核中的状态
          record.status === ShelfType.audit && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button type="link" size="small" onClick={() => page.openRelationModal()}>
                联系我们
              </Button>
            </div>
          )}
        </>
      );
    },
  },
];

@connect(({ brandCenterCommodity }) => brandCenterCommodity)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterCommodity/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterCommodity/release',
    });
  }

  openModal = (id, modalTitle) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterCommodity/openModal',
      payload: { id, modalTitle },
    });
  };

  openRelationModal = () => {
    Modal.info({
      title: '联系我们',
      content: (
        <div>
          <p>联系电话：4008670211</p>
        </div>
      ),
      onOk() {},
    });
  };

  goodsStick = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterCommodity/setTop',
      payload: { goodsId: id },
    });
  };

  onClickSort = type => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterCommodity/updateState',
      payload: { sort: type },
    });
    dispatch({
      type: 'brandCenterCommodity/fetch',
    });
  };

  handleChangePagination = pagination => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterCommodity/fetch',
      payload: {
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  renderAddonSection = () => (
    <div className={styles.buttons}>
      <Button
        style={{ backgroundColor: '#FA7114', color: 'white' }}
        onClick={() => this.props.history.push('/center/brandcenter/commodity/add')}
      >
        新建商品
      </Button>

      <div className={styles['sort-buttons']}>
        <Button
          style={
            this.props.sort === SortType.time
              ? { backgroundColor: '#CFDEFF', borderColor: '#597EF7', color: '#597EF7' }
              : { backgroundColor: '#F5F5F5', borderColor: '#D9D9D9', color: '#D9D9D9' }
          }
          size="small"
          className={styles['time-button']}
          onClick={() => this.onClickSort(SortType.time)}
        >
          更新时间
        </Button>
        <Button
          style={
            this.props.sort === SortType.show
              ? { backgroundColor: '#CFDEFF', borderColor: '#597EF7', color: '#597EF7' }
              : { backgroundColor: '#F5F5F5', borderColor: '#D9D9D9', color: '#D9D9D9' }
          }
          size="small"
          className={styles['show-button']}
          onClick={() => this.onClickSort(SortType.show)}
        >
          展示顺序
        </Button>
      </div>
    </div>
  );

  render() {
    const {
      commodityList,
      children,
      route,
      location,
      visible,
      dispatch,
      pagination,
      modalTitle,
      goodsId,
      loading,
    } = this.props;
    if (route.path !== location.pathname) return children;

    return (
      <div className={styles.container}>
        <Breadcrumb title="商品管理" />
        <ListPage
          rowKey="id"
          dataSource={commodityList}
          columns={columns(this)}
          addonRender={this.renderAddonSection()}
          onChange={this.handleChangePagination}
          pagination={pagination}
          loading={loading}
        />
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={() => {
            dispatch({
              type: 'brandCenterCommodity/saveShelf',
              payload: {
                id: goodsId,
                status: modalTitle === '上架' ? 1 : 2,
              },
            });
          }}
          onCancel={() => {
            dispatch({ type: 'brandCenterCommodity/closeModal' });
          }}
        >
          <span>确定要{modalTitle}吗?</span>
        </Modal>
      </div>
    );
  }
}

export default Page;
