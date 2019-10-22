import React, { Component } from 'react';
import { Button, Pagination } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import Info from '../../Components/Info';
import { UserType, FollowState } from '../../Const';
import PageLoading from '@/components/PageLoading';
import Empty from '../../Components/Empty';

const keyArr = [0, 1, 2, 3, 4];

@connect(({ designerCenterFollow, user }) => ({ ...designerCenterFollow, userId: user }))
class Page extends Component {
  componentDidMount() {
    console.log(this.props);
    const { dispatch, isPersonalSelect, userId, pageIndex1, pageIndex2, pageSize } = this.props;

    dispatch({
      type: 'designerCenterFollow/switch',
      isPersonalSelect,
      userId,
      pageIndex: isPersonalSelect ? pageIndex1 : pageIndex2,
      pageSize,
    })
  }

  onTabClick = isPersonal => {
    const { dispatch, isPersonalSelect, userId, pageIndex1, pageIndex2, pageSize } = this.props;
    if (isPersonal === isPersonalSelect) {
      return;
    }

    dispatch({
      type: 'designerCenterFollow/switch',
      isPersonalSelect: isPersonal,
      userId,
      pageIndex: isPersonal ? pageIndex1 : pageIndex2,
      pageSize,
    })
  }

  onPageChange = index => {
    const { dispatch, isPersonalSelect, userId, pageSize } = this.props;

    dispatch({
      type: 'designerCenterFollow/switch',
      isPersonalSelect,
      userId,
      pageIndex: index,
      pageSize,
    });
  }

  onClickFollow = (userId, isFollow = true) => {
    const { dispatch, isPersonalSelect, pageIndex1, pageIndex2, pageSize } = this.props;
    dispatch({
      type: 'designerCenterFollow/follow',
      userId,
      isFollow,
      isPersonalSelect,
      pageIndex: isPersonalSelect ? pageIndex1 : pageIndex2,
      pageSize,
    });
  }

  onClickCancelFollow = userId => {
    this.onClickFollow(userId, false);
  }

  onClickWorks = worksId => {
    if (worksId) {
      const { dispatch } = this.props;
      dispatch({
        type: 'designerCenter/jumpTo',
        path: `/production/detail/${worksId}`,
      });
    }
  }

  renderFansList = (data, isPersonalSelect, loading) => (
    <div>
      {loading && <PageLoading />}
      {
        data && !loading &&
        data.map((v, i) => (
          <div key={keyArr[i]}>
            <Info
              isDesigner={isPersonalSelect}
              headImage={isPersonalSelect ? v.headImage : v.companyLogo}
              name={isPersonalSelect ? v.nickName : v.enterpriseName}
              info={isPersonalSelect ? v.autograph : v.companyProfile}
              worksNum={isPersonalSelect ? v.worksNo : v.goodsNum}
              fansNum={isPersonalSelect ? v.fansNo : v.beFollowNum}
              followNum={isPersonalSelect ? v.followNo : v.followNum}
              picList={isPersonalSelect ? v.worksList : v.elegantList}
              isVerified={isPersonalSelect && v.userType === UserType.DESIGNER}
              followState={FollowState.YES}
              onClickFollow={() => this.onClickFollow(isPersonalSelect ? v.userId : v.enterpriseId)}
              onClickCancelFollow={() => this.onClickCancelFollow(isPersonalSelect ? v.userId : v.enterpriseId)}
              onClickWorks={this.onClickWorks}
            />
            <div className={styles.line} />
          </div>
        ))
      }
    </div>
  )

  render() {
    const { isPersonalSelect, listData, loading, pageIndex1, pageIndex2, resultCount } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.tabs}>
          <div
            className={isPersonalSelect ? styles['tab-selected'] : styles.tab}
            onClick={() => { this.onTabClick(true); }}
          >
            个人
            {isPersonalSelect && <div className={styles.mark} />}
          </div>
          <div
            className={isPersonalSelect ? styles.tab : styles['tab-selected']}
            onClick={() => { this.onTabClick(false); }}
          >
            企业
            {!isPersonalSelect && <div className={styles.mark} />}
          </div>
        </div>
        {
          (listData && listData.length !== 0) || loading ?
            <div className={styles.list}>
              {this.renderFansList(listData, isPersonalSelect, loading)}
              <div className={styles.page}>
                <Pagination
                  showQuickJumper
                  current={isPersonalSelect ? pageIndex1 : pageIndex2}
                  total={resultCount}
                  onChange={this.onPageChange}
                />
              </div>
            </div> :
            <Empty />
        }
      </div>
    );
  }
}

export default Page;
