import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PersonalRoute } from '../Const';
import styles from './style.less';
import infoImg1 from '@/assets/tab_personal_info1.png';
import infoImg2 from '@/assets/tab_personal_info2.png';
import securityImg1 from '@/assets/tab_personal_security1.png';
import securityImg2 from '@/assets/tab_personal_security2.png';
import verifyImg1 from '@/assets/tab_personal_verify1.png';
import verifyImg2 from '@/assets/tab_personal_verify2.png';

@connect(({ designerPersonalCenter }) => ({ ...designerPersonalCenter }))
class Page extends Component {
  getPage = index => {
    const { children } = this.props;
    return children && children.props.children[index];
  };

  onClickTab = tabIndex => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerPersonalCenter/save',
      payload: {
        tabSelectIndex: tabIndex,
      },
    });
  };

  renderTab = (index, title) => {
    const { tabSelectIndex } = this.props;
    const isSelected = tabSelectIndex === index;
    let icon;
    switch (index) {
      case 0:
        icon = isSelected ? infoImg2 : infoImg1;
        break;
      case 1:
        icon = isSelected ? securityImg2 : securityImg1;
        break;
      case 2:
        icon = isSelected ? verifyImg2 : verifyImg1;
        break;
      default:
        icon = verifyImg1;
    }
    return (
      <div className={isSelected ? styles['tab-selected'] : styles.tab} onClick={() => this.onClickTab(index)}>
        {isSelected && <div className={styles['tab-selected-mark']} />}
        <div className={isSelected ? styles['tab-selected-text'] : styles['tab-text']}>
          <img src={icon} alt="" />
          {title}
        </div>
      </div>
    )
  };

  renderTabs = () => (
    <div className={styles.tabs}>
      {this.renderTab(PersonalRoute.Info, '资料维护')}
      {this.renderTab(PersonalRoute.Security, '安全设置')}
      {this.renderTab(PersonalRoute.Authority, '设计师认证')}
    </div>
  );

  render() {
    const { tabSelectIndex } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles['bg-fix']} />
          <div className={styles.left}>
            {this.renderTabs()}
          </div>
          <div className={styles.right}>
            {this.getPage(tabSelectIndex)}
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
