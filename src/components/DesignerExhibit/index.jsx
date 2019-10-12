import React, { useState } from 'react';
import { Avatar } from 'antd';
import router from 'umi/router';
import { FlexClomn, FlexDivider } from '@/components/Flex';
import styles from './style.less';

const Tags = ({ data = [], className }) => (
    <ul className={`${styles.tags} ${className}`}>
        {
            data.filter(tag => !!tag).map(tag => <li className={styles.tag}>{tag}</li>)
        }
    </ul>
);

const HAS_FOLLOWED = 1;
const HAS_NOT_FOLLOWED = 0;

const DesignerItem = ({
    headImage,
    userId,
    nickName,
    // sex,
    // birthday,
    // occupationName,
    province,
    city,
    // createTime,
    onFollowBtnClick = () => {},
    tagList = [{ tagId: '', tagName: '' }],
    // fieldList = { fieldId: '', fieldName: '' },
    autograph,
    isFollow,
    worksNo,
    fansNo,
    // auditStatus
}) => {
    const [hasFollowed, setHasFollowed] = useState(Number(isFollow) === HAS_FOLLOWED)
    return (
    <li className={styles.item} onClick={() => router.push({ pathname: '/center/designercenter/home', query: { id: userId } })}>
        <header>
            <FlexClomn>
                <Avatar style={{ flex: 'none' }} size={90} src={headImage || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
                <div className={styles.detail}>
                    <div className={`${styles.name} GMLL-1`}>{nickName}</div>
                    <div className={styles.addr}>{province} {city}</div>
                    <Tags className={`${styles.tags}  GMLL-1`} data={tagList.map(item => item.tagName)} />
                </div>
            </FlexClomn>
        </header>
        <article className="GMLL-2">
            {autograph}
        </article>
        <footer>
            <FlexClomn>
                <div><span>作品</span> {worksNo}</div>
                <FlexDivider type="vertical" />
                <div><span>粉丝</span> {fansNo}</div>
                <button
                    className={styles.followBtn}
                    onClick={evt => {
                        evt.stopPropagation();
                        onFollowBtnClick(userId, !hasFollowed).then(result => {
                            if (result.ok) {
                                setHasFollowed(result.isFollow);
                            }
                        });
                    }}
                    type="button"
                >
                        {hasFollowed ? '已关注' : '关注'}
                </button>
            </FlexClomn>
        </footer>
    </li>
);
}

export default ({ data = [], ...rest }) =>
(<div className={styles.container}>
    <ul className={styles[`remain-${data.length % 4}`]}>
        {
            data.map(item => <DesignerItem {...item } {...rest} />)
        }
    </ul>
</div>);
