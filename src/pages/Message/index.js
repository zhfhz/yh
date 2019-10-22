import React, { Component } from 'react';
import { Button, Pagination } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import emptyImg from '@/assets/post_letter.png'

@connect(({ message }) => message)
class Page extends Component {
  componentDidMount() {
    const { dispatch, pageIndex, pageSize } = this.props;
    dispatch({
      type: 'message/fetch',
      pageIndex,
      pageSize,
    });
  }

  onPageChange = index => {
    const { dispatch, pageSize } = this.props;

    dispatch({
      type: 'message/fetch',
      pageIndex: index,
      pageSize,
    });
  }

  renderEmpty = () => (
    <div className={styles.empty}>
      <div className={styles.text}>暂无相关消息</div>
      <div className={styles.pic}>
        <img src={emptyImg} alt="" />
      </div>
    </div>
  )

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
    const { dataList, resultCount } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles['bg-fix']} />
        <div className={styles.main}>
          {this.renderEmpty()}
          {/* {
            !dataList || dataList.length === 0 ? this.renderEmpty() :
              <>
                <div className={styles.list}>
                  {
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
              </>
          } */}
        </div>
      </div>
    );
  }
}

export default Page;
