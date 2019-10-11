import React, { Component } from 'react';
import { Modal, Pagination } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import Work from '../../Components/Work';

@connect(({ designerCenterWorks, designerCenter }) => ({ ...designerCenterWorks, userId: designerCenter.userId }))
class Page extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = index => {
    const { dispatch, userId, pageSize, pageIndex } = this.props;
    dispatch({
      type: 'designerCenterWorks/fetch',
      userId,
      pageSize,
      pageIndex: index || pageIndex,
    });
  }

  onPageChange = index => {
    this.fetchData(index);
  }

  renderWorks = () => {
    const { listData, dispatch, userId, pageIndex, pageSize } = this.props;
    return (
      <div className={styles.worksList}>
        {
          listData && listData.map(
            v => (
              <Work
                key={v.worksId}
                pic={v.coverImage}
                name={v.worksName}
                tag={v.categoryName}
                viewCount={v.pv}
                likeCount={v.fabulousNo}
                favCount={v.collectionNo}
                date={v.releaseTime}
                isProtected={v.copyrightProtection}
                verifyState={userId ? null : v.auditStatus}
                rejectReason={v.rejectReason}
                onClickEdit={() => {
                  dispatch({
                    type: 'designerCenter/jumpTo',
                    path: '/center/designercenter/uploadwork',
                    userId: v.worksId,
                  });
                }}
                onClickDel={() => {
                  Modal.confirm({
                    title: '警告',
                    content: '确认删除此作品？',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                      dispatch({
                        type: 'designerCenterWorks/delWork',
                        worksId: v.worksId,
                        userId,
                        pageIndex,
                        pageSize,
                      });
                    },
                  });
                }}
                showUserOption={!userId}
              />
            ))
        }
      </div>
    )
  }

  render() {
    const { resultCount, pageIndex } = this.props;
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
