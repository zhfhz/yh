import React from 'react';
import styles from './style.less';
import emptyImg from '@/assets/empty_box.png';

const Empty = () => (
  <div className={styles.container}>
    <div className={styles.text}>
      暂无相关内容
    </div>
    <img src={emptyImg} alt="" />
  </div>
)


export default Empty;
