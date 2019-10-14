import React from 'react';
import CheckAbleList from '../CheckAbleList';
import styles from './style.less';

export default props => {
    const { className = '', checkedClassName = '', itemClassName = '', ...rest } = props;
    return (<CheckAbleList
        checkedClassName={`${styles.checked} ${checkedClassName}`}
        className={`${styles.container} ${className}`}
        itemClassName={`${styles.item} ${itemClassName}`}
        {...rest}
    />)
}
