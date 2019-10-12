import React, { useState } from 'react';
import { Avatar } from 'antd';
import { FlexClomn, FlexDivider } from '@/components/Flex';
import { timeParse } from '@/utils/utils';
import styles from './style.less';

const HAS_FOLLOWED = 1;
const NOT_FOLLOWED = 0;

export default ({ releaseTime, authorName, isFollow, headImage, userId, onFollowBtnClick = () => {} }) => {
    const [hasFollowed, setHasFollowed] = useState(Number(isFollow) === HAS_FOLLOWED)
    return (
        <div className={styles.info}>
            <FlexClomn>
                <Avatar className={styles.left} size={90} shape="circle" src={headImage || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
                <div className={styles.right}>
                    <div className={`${styles.userName} GMLL-1`}>
                        {authorName}
                        <span className={styles.vipFlag} />
                    </div>
                    <button className={styles.followBtn} type="button" onClick={() => onFollowBtnClick(userId, !hasFollowed).then(res => {
                        if (res.ok) {
                            setHasFollowed(res.isFollow);
                        }
                    })}>
                        {
                            hasFollowed ? '已关注' : '关注'
                        }
                    </button>
                </div>
            </FlexClomn>
            <div className={styles.publishTime}>
                最初发布于 {timeParse(releaseTime)}
            </div>
        </div>
    )
};
