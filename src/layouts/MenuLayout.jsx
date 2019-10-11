/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import HeaderBox from '@/components/HeaderBox';
import Footer from '@/components/Footer';
import styles from './layout.less';

const BasicLayout = props => {
  const { dispatch, children, settings } = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);

  return (
    <div>
      <HeaderBox {...props} type={1}></HeaderBox>
      <div className={styles.minHeight}>{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  authorizedMenus: user.authorizedMenus,
  settings,
}))(BasicLayout);
