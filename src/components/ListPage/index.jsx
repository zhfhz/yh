// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import { Table, Card, Col, Row, Button, Icon } from 'antd';
import PageHeaderWrapper from '../PageHeaderWrapper';
import './index.less';

/**
 * 表格通用页面
 *
 * @param {Array<Object>} dataSource 表格数据源
 * @param {Array<ColumnProps>} columns 表格列配置， 详见 https://git.io/vMMXC
 * @param {Array<ReactNode>} filterRender 列表过滤条件
 * @param {ReactNode} addonRender 搜索底部的添加区块
 * @param {Object} pagination 分页器 参数详见 https://ant.design/components/pagination-cn/
 * @param {Boolean} loading 是表格否加载中
 */
const ListPageComponent = ({
  dataSource,
  columns,
  pagination,
  loading,
  children,
  filterRender = [],
  addonRender = null,
  className = '',
  onSearch,
  onChange,
  rowKey,
  searchSpan = { xxl: 3, md: 6, span: 24 },
  bordered,
}) => {
  if (children) {
    return <div className={className}>{children}</div>;
  }

  // 获取用于条件过滤的节点数组
  let filterRenders = filterRender.type === Fragment ? filterRender.props.children : filterRender;
  // 排列过滤组件
  if (filterRenders.$$typeof) {
    filterRenders = [filterRenders];
  }
  const filterSection = filterRenders.length ? (
    <Row type="flex" justify="start" gutter={10} align="middle">
      {filterRenders.map((it, index) => (
        <Col className="search-line" key={index} {...searchSpan}>
          {it}
        </Col>
      ))}
      <Col className="search-line" xxl={3} md={4} span={24}>
        <Button type="primary" className="search-btn" onClick={onSearch}>
          <Icon type="search" /> 查询
        </Button>
      </Col>
    </Row>
  ) : null;
  // 显示搜索控件
  const title = (filterSection || addonRender) && (
    <div>
      {filterSection}
      <div className="addon-section">{addonRender}</div>
    </div>
  );

  const actualPagination = pagination && { ...pagination, showQuickJumper: true };
  const body = (
    <Card bordered={bordered}>
      <div>
        {title}
        <Table
          loading={loading}
          pagination={actualPagination}
          rowKey={rowKey}
          dataSource={dataSource}
          columns={columns}
          onChange={onChange}
        />
      </div>
    </Card>
  );
  return <div className={`list-page-component-container ${className}`}>{body}</div>;
};

export default ListPageComponent;
