import React from 'react';
import router from 'umi/router';
import DesignList from '@/components/DesignExhibit';
import { FlexClomn } from '@/components/Flex';
import { timeParse } from '@/utils/utils';
import styles from './style.less';

const { DesignItem } = DesignList;
const {
    CoverImg,
    Title,
    // Author,
    Tags,
    Footer,
    Content,
    ClickNum,
    LikeNum,
    FavNum,
} = DesignItem;

export default ({ data = [] }) => (
    <DesignList>
        {
            data.map(item => (
                <DesignItem className={styles.productionItem} key={item.worksId} onClick={() => router.push(`/production/detail/${item.worksId}`)}>
                <CoverImg className={styles.coverImg} display="fit" src={item.coverImage} />
                <Content>
                    <Title>{item.worksName}</Title>
                    <Tags className={styles.productionItemTags} data={[item.categoryName]} />
                    <FlexClomn>
                        <ClickNum>{item.pv || 0}</ClickNum>
                        <LikeNum>{item.fabulousNo || 0}</LikeNum>
                        <FavNum>{item.collectionNo || 0}</FavNum>
                    </FlexClomn>
                </Content>
                <Footer className={styles.productionItemFooter}>
                    <div style={{ textAlign: 'right' }}>
                        {
                            timeParse(item.releaseTime)
                        }
                    </div>
                </Footer>
            </DesignItem>
            ))
        }
    </DesignList>
);
