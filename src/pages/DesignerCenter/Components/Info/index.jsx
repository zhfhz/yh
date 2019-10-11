import React from 'react';
import { Button } from 'antd';
import styles from './style.less';
import verifiedImg from '@/assets/verified.png'
import blankUserImg from '@/assets/blank_user.png';
import PageLoading from '@/components/PageLoading';
import { FollowState } from '../../Const';

const pics = (picList, isDesigner, onClickWorks) => {
  if (!picList || picList.length === 0) {
    return null;
  }

  if (picList.length === 1) {
    return <img
      className={isDesigner && onClickWorks ? styles['show-clickable'] : styles.show}
      src={isDesigner ? picList[0] && picList[0].coverImage : picList[0]}
      onClick={isDesigner && onClickWorks ? () => onClickWorks(picList[0] && picList[0].worksId) : null}
      alt="" />
  }

  return (
    <>
      <img
        className={isDesigner && onClickWorks ? styles['show-clickable'] : styles.show}
        src={isDesigner ? picList[0] && picList[0].coverImage : picList[0]}
        onClick={isDesigner && onClickWorks ? () => onClickWorks(picList[0] && picList[0].worksId) : null}
        alt="" />
      <img
        className={isDesigner && onClickWorks ? styles['show-clickable'] : styles.show}
        src={isDesigner ? picList[1] && picList[1].coverImage : picList[1]}
        onClick={isDesigner && onClickWorks ? () => onClickWorks(picList[1] && picList[1].worksId) : null}
        alt="" />
    </>
  )
}

const Info = ({
  isDesigner = true,
  headImage,
  name,
  info,
  isVerified,
  followState,
  worksNum,
  fansNum,
  followNum,
  picList,
  onClickFollow,
  onClickCancelFollow,
  onClickWorks = null,
}) => (
    <div className={styles.info}>
      <div className={styles.left}>
        <div className={styles['left-top']}>
          <img className={isDesigner ? styles.pic : styles.pic2} src={headImage || blankUserImg} alt=""></img>
          <div className={styles['info-detail']}>
            <div className={styles['info-name']}>
              {name}
              {isVerified && <img className={styles.verified} src={verifiedImg} alt="" />}
            </div>
            <div className={styles['info-sign']}>{info}</div>
            {
              followState === FollowState.YES ?
                <Button className={styles['info-followed']} onClick={onClickCancelFollow}>已关注</Button> :
                <Button className={styles['info-follow']} onClick={onClickFollow}>关注</Button>
            }
          </div>
        </div>
        <div className={styles['left-bottom']}>
          <div className={styles['bottom-unit']}>
            <div>{isDesigner ? '作品' : '商品'}</div>
            <div className={styles.value} title={worksNum}>{worksNum}</div>
          </div>
          <div className={styles.line} />
          <div className={styles['bottom-unit']}>
            <div>粉丝</div>
            <div className={styles.value} title={fansNum}>{fansNum}</div>
          </div>
          <div className={styles.line} />
          <div className={styles['bottom-unit']}>
            <div>关注</div>
            <div className={styles.value} title={followNum}>{followNum}</div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {pics(picList, isDesigner, onClickWorks)}
      </div>
    </div>
  )

export default Info;
