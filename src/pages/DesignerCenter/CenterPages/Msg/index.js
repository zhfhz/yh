import React, { Component } from 'react';
import { Button, Pagination } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import Empty from '../../Components/Empty';
import PageLoading from '@/components/PageLoading';

@connect(({ designerCenterMsg }) => designerCenterMsg)
class Page extends Component {
  componentDidMount() {
    const { dispatch, pageIndex, pageSize } = this.props;
    dispatch({
      type: 'designerCenterMsg/fetch',
      pageIndex,
      pageSize,
    });
  }

  onPageChange = index => {
    const { dispatch, pageSize } = this.props;

    dispatch({
      type: 'designerCenterMsg/fetch',
      pageIndex: index,
      pageSize,
    });
  }

  renderMsg = (info, date) => (
    <div key={date}>
      <div className={styles.msg}>
        <div className={styles['msg-info']}>{info}</div>
        <div className={styles['msg-date']}>{date}</div>
      </div>
      <div className={styles.line} />
    </div>
  )

  render() {
    const { dataList, resultCount, loading } = this.props;

    if ((!dataList || dataList.length === 0) && !loading) {
      return <Empty />
    }

    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {
            loading ? <PageLoading /> :
              dataList &&
              dataList.map(v => this.renderMsg(v.content, v.sendDate))
          }
        </div>
        <div className={styles.page}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={resultCount}
            onChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default Page;
