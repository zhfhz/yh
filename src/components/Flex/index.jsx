import React from 'react';
import { Divider } from 'antd';
import styles from './style.less';
/**
 * 处理水平布局
 * @param {*} props
 */
export const FlexClomn = props => {
    const { children } = props;
    return (
        <div className={styles.flexClomn}>
            {children}
        </div>
    )
};

/**
 * 处理水平布局
 * @param {*} props
 */
export const FlexRow = props => {
    const { children } = props;
    return (
        <div className={styles.flexRow}>
            {children}
        </div>
    )
};

export const FlexDivider = ({ type, ...rest }) => <Divider {...rest} type={type} />;
