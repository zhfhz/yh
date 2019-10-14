import React from 'react';
import { Avatar } from 'antd';
import router from 'umi/router';
import { FlexRow, FlexDivider } from '@/components/Flex';
import styles from './style.less';

const Tags = ({ className = '', data = [], theme = 'gray', ...rest }) => (
    <ul {...rest} className={`${styles.tags} ${className}`}>
        {
            data.filter(tag => !!tag).map(tag => <li key={tag} className={`${styles.tag} ${styles[theme]}`}>{tag}</li>)
        }
    </ul>
);

const UserInfo = ({
    enterpriseId,
    enterpriseName,
    companyProfile,
    companyLogo,
    labelList = [],
    industryName,
}) => (
    <div className={styles.info}>
        <FlexRow>
            <Avatar
                style={{ flex: 'none' }}
                size={100}
                shape="square"
                src={companyLogo || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
            <section className={styles.detail}>
                <div className={`${styles.name} GMLL-1`}>
                    {enterpriseName}
                </div>
                <div className={styles.addr}>
                    已入住淮安市都市智造谷
                </div>
                <article className={`${styles.note} GMLL-2`}>
                    {companyProfile}
                </article>
                <Tags className={styles.tags} data={['千年老店']} theme="blue" style={{ fontSize: 12 }} />
            </section>
            <button className={styles.followBtn} type="button">
                关注
            </button>
        </FlexRow>
    </div>
);

export default ({ data = [], ...rest }) =>
(<UserInfo {...data} {...rest} />);
