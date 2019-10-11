import React from 'react';
import styles from './style.less';
import noDataUrl from '../../assets/search_no_data.png'

export default () => (
  <>
    <header>
        暂无相关信息
    </header>
    <div className={styles.noData}>
        <img src={noDataUrl} alt="" />
    </div>
  </>
)
