import React from 'react';
import styles from './index.less';

const Breadcrumb = ({ title = '', subTitle = null }) => (
  <div className={styles['c-breadcrumb']}>
    <span className={styles.title}>{title}</span>
    {subTitle ? <span className={styles.explain}>{subTitle} </span> : ''}
  </div>
);

export default Breadcrumb;
