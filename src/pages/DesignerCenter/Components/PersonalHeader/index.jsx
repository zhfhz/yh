import React from 'react';
import styles from './style.less';

const PersonalHeader = ({
  title,
  info,
}) => (
    <div className={styles.head}>
      <div className={styles.main}>
        <div className={styles.title}>
          <div className={styles.text}>{title}</div>
          <div className={styles.line2} />
        </div>
        {info && <div className={styles.info}>{info}</div>}
      </div>
      <div className={styles.line1} />
    </div>
  )


export default PersonalHeader;
