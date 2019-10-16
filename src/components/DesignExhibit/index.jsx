import React from 'react';
import { Icon } from 'antd';
import router from 'umi/router';
import { FlexClomn, FlexDivider } from '@/components/Flex';
import CoverImage from '@/components/CoverImage';
import styles from './style.less';

// /**
//  * 作品封面
//  * @param {*} props
//  */
// const CoverImg = props => <img className={styles.coverImg} src={props.src} alt="" />;
/**
 * 作品标题
 */
const Title = props => <div className={`${styles.title} GMLL-1`}>{props.children}</div>;
/**
 * 设计师名
 */
const Author = props => {
    const { children, className = '' } = props;
    return (
        <div className={`${styles.author} ${className} GMLL-1`}>
            {children}
        </div>
    )
}
/**
 * 点击数| 查看数
 * @param {*} props
 */
const ClickNum = props => <div className={styles.clickNum}><Icon type="eye" />{props.children}</div>;
/**
 * 点赞数
 * @param {*} props
 */
const LikeNum = props => <div className={styles.likeNum}><Icon type="like" />{props.children}</div>;
/**
 * 收藏数
 * @param {*} props
 */
const FavNum = props => <div className={styles.favNum}><Icon type="star" />{props.children}</div>;
/**
 * 小标签
 * @param {*} props
 */
const Tags = props => {
    const { data = [], className = '' } = props;
    return (
        <ul className={`${styles.tags} ${className}  GMLL-1`}>
            {
                data.filter(tag => !!tag).map(tag => <li key={tag} className={styles.tag}>{tag}</li>)
            }
        </ul>
    )
}
/**
 * 卡片脚和封面中间
 * @param {*} props
 */
const Content = props => {
    const { children, className = '' } = props;
    return (
        <article className={className}>
            {children}
        </article>
    )
}
/**
 * 卡片脚
 * @param {*} props
 */
const Footer = props => {
    const { children, className = '' } = props;
    return (
        <footer className={className}>
            {children}
        </footer>
    )
}
/**
 * 审核状态
 * @param {*} props
 */
const ReviewStatus = props => <div className={styles.reviewStatus}>{props.children}</div>;
/**
 * 审核未通过原因
 * @param {*} props
 */
const ReviewFailMessage = props => <div className={styles.reviewFailMessage}>{props.children}</div>;
/**
 * 操作
 * @param {*} props
 */
const Menus = props => <div className={styles.menus}></div>;
export const DesignListItem = ({ children, className = '', ...rest }) => {
    const coverImg = children.find(child => child.type === CoverImage);
    const reviewFailMessage = children.find(child => child.type === ReviewFailMessage);
    const content = children.find(child => child.type === Content);
    const contentChild = children.filter(child =>
        child.type === Title || child.type === Author || child.type === Tags);
    const footer = children.find(child => child.type === Footer);
    return (
        <li className={`${className} ${styles.item}`} {...rest}>
            <header>
                {coverImg}
                {reviewFailMessage}
            </header>
            {content || <article>{contentChild}</article>}
            {footer}
        </li>
    )
};
Object.assign(DesignListItem, {
    CoverImg: CoverImage,
    Title,
    Author,
    Tags,
    Footer,
    Content,
    ClickNum,
    LikeNum,
    FavNum,
    ReviewStatus,
    ReviewFailMessage,
})
const ReviewStatusMap = ['未审核', '已通过', '未通过'];
export default function DesignList ({ children, data = [], isMyHome = false }) {
    return (
        <div className={styles.container}>
            <ul className={styles[`remain-${data.length % 5}`]}>
                {children || data.map(item => (
                    <DesignListItem key={item.worksId} onClick={() => router.push(`/production/detail/${item.worksId}`)}>
                        <CoverImage className={styles.coverImg} src={item.coverImage} display="fit" />
                        {isMyHome && item.auditStatus === 2 &&
                        <ReviewFailMessage>{item.rejectReason}</ReviewFailMessage>}
                        <Content>
                            {isMyHome && <ReviewStatus>{ReviewStatusMap[item.auditStatus]}</ReviewStatus>}
                            <Title>{item.worksName}</Title>
                            <Author>
                                {/* <Avatar size={22}
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
                                {item.authorName}
                            </Author>
                            <Tags data={[item.categoryName]} />
                        </Content>
                        <Footer>
                            <FlexClomn>
                                <ClickNum>{item.pv}</ClickNum>
                                <FlexDivider type="vertical" />
                                <LikeNum>{item.fabulousNo}</LikeNum>
                            </FlexClomn>
                        </Footer>
                    </DesignListItem>
                ))}
            </ul>
        </div>
    )
}
DesignList.DesignItem = DesignListItem;
