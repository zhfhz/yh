import React from 'react';
import { Carousel } from 'antd';
import styles from './style.less'

const Setting = {
    draggable: true,
    pauseOnHover: true,
    autoplay: true,
    dotPosition: 'bottom',
    dots: true,
}

export default props => {
    const { data = [] } = props;
    return (
        data.length > 0 && <Carousel {...Setting} className={styles.banner}>
        {
            data.map(item => (
            <div key={item} className={styles.item} title={item.title}>
                <a href={item.link}>
                    <img alt={item.title} src={item.picture} />
                </a>
            </div>
            ))
        }
    </Carousel>
    )
}
