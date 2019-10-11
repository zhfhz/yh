import React from 'react';
import { PageHeader } from 'antd';
import { RouteContext, GridContent } from '@ant-design/pro-layout';
import { Link } from 'umi';
import './index.less';

const itemRender = route => (
  route.component && window.location.pathname !== route.path ?
    <Link to={route.path}>{route.breadcrumbName}</Link> :
    <span>{route.breadcrumbName}</span>
);

const PageHeaderWrapper = ({
  children,
  className = '',
}) => (
    <div className={`page-header-wrapper-container ${className}`}>
      <GridContent>
        <RouteContext.Consumer>
          {value => (
            <PageHeader
              className="page-header-wrapper-header"
              breadcrumb={{
                routes: value.breadcrumb.routes && value.breadcrumb.routes.slice(1),
                itemRender,
              }}
            />
          )}
        </RouteContext.Consumer>
      </GridContent>
      <div className="page-header-wrapper-children-content">
        {children}
      </div>
    </div>
  );

export default PageHeaderWrapper;
