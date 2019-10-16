import React, { useState, useRef, useEffect } from 'react';
import styles from './style.less';

export const ItemCard = ({ children, className = '', ...rest }) => (
    <li className={`${className} ${styles.item}`} {...rest}>
        {
            children
        }
    </li>
);
export default function CardList ({ renderItem = () => {}, data = [] }) {
    const [emptyWidth, setEmptyWdith] = useState(0);
    const [colSpan, setColspan] = useState(0);
    const ulContainer = useRef();
    useEffect(() => {
        const computeWidth = ulContainer.current.clientWidth;
        const computeCss = window.getComputedStyle(ulContainer.current);
        const contentWidth = computeWidth - Number(computeCss.paddingLeft.replace('px', '')) - Number(computeCss.paddingRight.replace('px', ''));
        const { firstChild } = ulContainer.current;
        const itemWidth = firstChild.clientWidth;
        const rowLen = Math.floor(contentWidth / itemWidth);
        const span = (contentWidth - rowLen * itemWidth) / (rowLen - 1);
        const EmptyLen = rowLen - (data.length % rowLen);
        const EmptyWidth = itemWidth * EmptyLen + (EmptyLen - 1) * span;
        setEmptyWdith(EmptyWidth);
        setColspan(span);
    });
    return (
        <div className={styles.container}>
            <ul ref={ulContainer}>
                {
                   data.map(item => <ItemCard style={{ marginBottom: colSpan }}>{renderItem(item)}</ItemCard>)
                }
                <li key="suffix" style={emptyWidth > 0 ? { visibility: 'hidden', width: emptyWidth } : { display: 'none' }} />
            </ul>
        </div>
    )
}
CardList.Card = ItemCard;
