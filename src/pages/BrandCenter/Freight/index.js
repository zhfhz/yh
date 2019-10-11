import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
import ListPage from '@/components/ListPage';
import Breadcrumb from '@/components/Breadcrumb';

import styles from './style.less';
import { pageState } from './service';

@connect(({ brandCenterFreight }) => brandCenterFreight)
class Page extends Component {
  columns = [
    {
      title: '序号',
      dataIndex: 'fakeID',
      key: 'fakeID',
    },
    {
      title: '模板名称',
      dataIndex: 'templateName',
      key: 'templateName',
    },
    {
      title: '计费方式',
      dataIndex: 'billingMethodName',
      key: 'billingMethodName',
    },
    {
      title: '包邮方式',
      dataIndex: 'packageMethodName',
      key: 'packageMethodName',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: ({ templateId }) => (
        <Button type="link" size="small" onClick={() => this.onClickEdit(templateId)}>
          编辑
        </Button>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterFreight/fetch',
    });
  }

  onClickEdit = id => {
    this.props.history.push(`/center/brandcenter/freight/edit/${id}`);
  };

  onPageChange = page => {
    this.props.dispatch({
      type: 'brandCenterFreight/fetch',
      page: page.current,
    });
  };

  renderAddonSection = () => (
    <Button type="primary" onClick={() => this.props.history.push('/center/brandcenter/freight/add')}>
      <Icon type="plus" /> 新增
    </Button>
  );

  render() {
    const { data, children, route, location, pageCount, loading, page } = this.props;
    if (route.path !== location.pathname) return children;

    return (
      <div className={styles.container}>
        <Breadcrumb title="运费管理" />
        <ListPage
          bordered={false}
          rowKey="templateId"
          dataSource={data}
          columns={this.columns}
          addonRender={this.renderAddonSection()}
          onChange={this.onPageChange}
          loading={loading}
          pagination={{
            total: pageCount,
            pageSize: pageState.PAGESIZE,
            current: page,
          }}
        />
      </div>
    );
  }
}

export default Page;
