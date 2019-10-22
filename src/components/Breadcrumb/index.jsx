import React from 'react';
import styles from './index.less';

const Breadcrumb = ({ title = '' }) => (
  <div className={styles.head}>
    <div className={styles.main}>
      <div className={styles.title}>
        <div className={styles.text}>{title}</div>
        <div className={styles.line2} />
      </div>
    </div>
  </div>
);

export default Breadcrumb;
