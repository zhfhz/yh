import React, { useState } from 'react';
import styles from './style.less';

export const ItemCard = ({ children, className = '', ...rest }) => {
    return (
        <li className={`${className} ${styles.item}`} {...rest}>
            {
                children
            }
        </li>
    )
};
export default function CardList ({ children, data = [] }) {
    const [emptyWidth, setEmptyWdith] = useState(0);
    const compute = ele => {
        if (ele) {
            const computeWidth = ele.clientWidth;
            const computePaddingLeft = window.getComputedStyle(ele, 'padding-left');
            const computePaddingRight = window.getComputedStyle(ele, 'padding-right');
            const contentWidth = computeWidth - computePaddingLeft - computePaddingRight;

            const { firstChild } = ele;
            const itemWidth = firstChild.clientWidth;

            const rowLen = Math.floor(contentWidth / itemWidth);
            const span = (contentWidth - rowLen * itemWidth) / (rowLen - 1);

            const EmptyLen = rowLen - (data.length % rowLen);

            const EmptyWidth = itemWidth * EmptyLen + (EmptyLen - 1) * span;
            setEmptyWdith(EmptyWidth);
        }
    }
    return (
        <div className={styles.container}>
            <ul ref={compute}>
                {children}
                <li key="suffix" style={{ visibility: 'hidden', width: emptyWidth }} />
            </ul>
        </div>
    )
}
CardList.Card = ItemCard;
