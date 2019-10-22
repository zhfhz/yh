import React from 'react';
import styles from './style.less';
import addImg from '@/assets/add_green.png';

const AuthHead = ({
  title,
  required,
  onAdd,
}) => (
    <div className={styles.head}>
      <div className={styles.title}>
        <div className={styles.text}>{title}</div>
        {required && <div className={styles.required}>*</div>}
      </div>
      {
        onAdd &&
        <div className={styles.add} onClick={onAdd}>
          <img src={addImg} alt="" />
          <div className={styles['add-text']}>添加</div>
        </div>
      }
    </div>
  )


export default AuthHead;
