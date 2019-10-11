/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';

/**
 * use Authorized check all menu item
 * @param {Array<String>|undefined} matches
 * @param {Array<MenuDataItem>} menuList
 */
const menuDataRender = matches => menuList =>
  menuList.map(item => {
    const needExact = item.menuKey.split('.').length <= 2;
    const authorized = matches
      ? _.some(matches, it => (needExact ? it === item.menuKey : item.menuKey.startsWith(it)))
      : true;
    const localItem = {
      ...item,
      children: item.children && authorized ? menuDataRender(matches)(item.children) : [],
    };
    return Authorized.check(authorized, localItem, null);
  });

const menuItemRender = (menuItemProps, defaultDom) => (
  <Link to={menuItemProps.path}>{defaultDom}</Link>
);

const breadcrumbRender = (routers = []) => [
  {
    path: '/',
    breadcrumbName: formatMessage({
      id: 'menu.home',
      defaultMessage: 'Home',
    }),
  },
  ...routers,
];

const rightContentRender = rightProps => <RightContent {...rightProps} />;

const footerRender = (/** _, defaultDom */) => <div>脚表</div>;

const BasicLayout = props => {
  const { dispatch, children, settings } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={menuItemRender}
      breadcrumbRender={breadcrumbRender}
      footerRender={footerRender}
      menuDataRender={menuDataRender(props.authorizedMenus)}
      formatMessage={formatMessage}
      rightContentRender={rightContentRender}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  authorizedMenus: user.authorizedMenus,
  settings,
}))(BasicLayout);
