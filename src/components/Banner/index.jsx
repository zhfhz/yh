import React from 'react';
import { Carousel } from 'antd';
import CoverImage from '@/components/CoverImage';
import styles from './style.less'

const Setting = {
    draggable: true,
    pauseOnHover: true,
    autoplay: true,
    dotPosition: 'bottom',
    dots: true,
}

export default props => {
    const { data = [], fieldMap = { key: 'picture', title: 'title', link: 'link', picture: 'picture' } } = props;
    return (
        data.length > 0 && <Carousel {...Setting} className={styles.banner}>
        {
            data.map(item => (
            <div key={item[fieldMap.key]} className={styles.item} title={item[fieldMap.title]}>
                <a href={item.link}>
                    <CoverImage src={item[fieldMap.picture]} display="fit" style={{ height: '100%', width: '100%' }} />
                </a>
            </div>
            ))
        }
    </Carousel>
    )
}
