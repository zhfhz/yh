import React from 'react';
import CheckAbleList from '../CheckAbleList';
import styles from './style.less';

export default props =>
(<CheckAbleList
    useDiliver
    checkedClassName={styles.checked}
    className={styles.container}
    itemClassName={styles.item}
    {...props}
/>)
