import React, { Component } from 'react';
import { Modal, Pagination } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import Work from '../../Components/Work';
import Empty from '../../Components/Empty';
import PageLoading from '@/components/PageLoading';

@connect(({ designerCenterFav, designerCenter }) => ({ ...designerCenterFav, userId: designerCenter.userId }))
class Page extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = index => {
    const { dispatch, userId, pageSize, pageIndex } = this.props;
    dispatch({
      type: 'designerCenterFav/fetch',
      userId,
      pageSize,
      pageIndex: index || pageIndex,
    });
  }

  onPageChange = index => {
    this.fetchData(index);
  }

  renderWorks = () => {
    const { listData, dispatch, userId, pageIndex, pageSize, loading } = this.props;
    return (
      <div className={styles.worksList}>
        {
          loading ? <PageLoading /> :
            listData && listData.map(
              v => (
                <Work
                  key={v.worksId}
                  pic={v.coverImage}
                  name={v.worksName}
                  tag={v.labels}
                  viewCount={v.pv}
                  likeCount={v.fabulousNo}
                  favCount={v.collectionNo}
                  date={v.releaseTime}
                  isProtected={v.copyrightProtect}
                  verifyState={null}
                  showUserOption={!userId}
                  isFav
                  onClickCancelFav={() => {
                    dispatch({
                      type: 'designerCenterFav/cancelFav',
                      worksId: v.worksId,
                      userId,
                      pageIndex,
                      pageSize,
                    });
                  }}
                />
              ))
        }
      </div>
    )
  }

  render() {
    const { listData, resultCount, pageIndex, loading } = this.props;

    if ((!listData || listData.length === 0) && !loading) {
      return <Empty />
    }

    return (
      <div className={styles.container} >
        {this.renderWorks()}
        <div className={styles.page}>
          <Pagination
            showQuickJumper
            current={pageIndex}
            total={resultCount}
            onChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default Page;
