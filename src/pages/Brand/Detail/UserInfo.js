import React from 'react';
import { Avatar } from 'antd';
import router from 'umi/router';
import { FlexRow, FlexDivider } from '@/components/Flex';
import styles from './style.less';

const Tags = ({ className = '', data = [], theme = 'gray', ...rest }) => (
    <ul {...rest} className={`${styles.tags} ${className}`}>
        {
            data.filter(tag => !!tag).map(tag => <li className={`${styles.tag} ${styles[theme]}`}>{tag}</li>)
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
    <li className={styles.info}>
        <FlexRow>
            <Avatar
                style={{ flex: 'none' }}
                size={145}
                shape="square"
                src={companyLogo || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
            <FlexDivider type="vertical" style={{ height: '100%', margin: 0 }} />
            <section className={styles.detail}>
                <div className={styles.name}>
                    {enterpriseName}
                </div>
                <Tags className="GMLL-1" data={labelList.map(item => item.tagName)} theme="blue" style={{ fontSize: 12 }} />
                <article className="GMLL-3">
                    {companyProfile}
                </article>
                <Tags data={[industryName]} theme="gray" style={{ fontSize: 10 }} />
            </section>
        </FlexRow>
    </li>
);

export default ({ data = [], ...rest }) =>
(<UserInfo {...data} {...rest} />);
