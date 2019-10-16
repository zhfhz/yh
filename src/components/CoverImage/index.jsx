import React, { useState, useRef, useEffect } from 'react';
import styles from './style.less';

/**
 * 作品封面
 * @param {*} props
 */
export default ({ src = '', display = 'fit', style = {}, className = '' }) => {
    const container = useRef();
    const [ndisplay, setDisplay] = useState(display);
    const [rate, setRate] = useState(1);
    useEffect(() => {
        const imgContainer = container.current;
        const width = imgContainer.clientWidth;
        const height = imgContainer.clientHeight;
        setRate(width / height);
    });
    const responsive = evt => {
        const image = evt.target;
        if (display === 'contain') {
            if (image.width >= image.height) {
                setDisplay('containWidth');
            } else {
                setDisplay('containHeight');
            }
        }
        if (display === 'fit') {
            if (image.width / image.height > rate) {
                setDisplay('containHeight');
            } else if (image.height / image.width > 1 / rate) {
                setDisplay('containWidth');
            } else {
                setDisplay('containWidth');
            }
        }
        if (display === 'cover') {
            setDisplay('cover');
        }
        // container.current.appendChild(image);
    };
    const Image = () => <img src={src} onLoad={responsive} alt=""/>
    return <div ref={container} className={`${className} ${styles.coverImg} ${styles[ndisplay]}`} style={{ ...style } }>{Image()}</div>;
};
