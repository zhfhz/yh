import React from 'react';
import styles from './style.less';
import viewImg from '@/assets/view.png';
import favImg from '@/assets/heart.png';
import likeImg from '@/assets/like.png';
import editImg from '@/assets/edit.png';
import delImg from '@/assets/delete.png';
import lockImg from '@/assets/lock.png';
import { VerifyState, CopyrightProtect } from '../../Const';

const Work = ({
  pic,
  name,
  tag,
  viewCount,
  likeCount,
  favCount,
  isProtected,
  verifyState,
  rejectReason,
  showUserOption = false,
  isFav = false,
  onClickEdit,
  onClickDel,
  onClickCancelFav,
}) => (
    <div className={styles.work}>
      {
        showUserOption &&
        (
          isFav ?
            <div className={styles['opt-help1']}>
              <div className={styles['opt-help2']}>
                <div className={styles.opt2}>
                  <div className={styles['opt-item']} onClick={onClickCancelFav}>
                    取消收藏
                  </div>
                </div>
              </div>
            </div> :
            <div className={styles['opt-help1']}>
              <div className={styles['opt-help2']}>
                <div className={styles.opt}>
                  <div className={styles['opt-item']} onClick={onClickEdit}>
                    <img className={styles['info-icon']} src={editImg} alt="" />
                    <span className={styles['opt-btn']}>编辑</span>
                  </div>
                  <div className={styles.line} />
                  <div className={styles['opt-item']} onClick={onClickDel}>
                    <img className={styles['info-icon']} src={delImg} alt="" />
                    <span className={styles['opt-btn']}>删除</span>
                  </div>
                </div>
              </div>
            </div>
        )
      }
      {
        verifyState !== VerifyState.PASSED && verifyState !== null &&
        (
          verifyState === VerifyState.VERIFYING ?
            <div className={styles.state}>
              <div>审核中</div>
            </div>
            :
            <div className={styles.state2}>
              <div>审核未通过</div>
            </div>
        )
      }
      {
        rejectReason &&
        <div className={styles.reason}>{rejectReason}</div>
      }
      <div className={styles['pic-box']}>
        <img src={pic} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles['info-top']}>
          {name}
          {isProtected === CopyrightProtect.YES && <img className={styles['protect-icon']} src={lockImg} alt="" />}
        </div>
        {
          tag ? tag.split(',').map(v => <div className={styles['info-tag']} key={v}>{v}</div>) :
            <div className={styles['info-tag-empty']} />
        }
        <div className={styles.line} />
        <div className={styles['info-mid']}>
          <div>
            <img className={styles['info-icon']} src={viewImg} alt="" />
            <div className={styles['info-count']} title={viewCount} >{viewCount}</div>
          </div>
          <div>
            <img className={styles['info-icon']} src={likeImg} alt="" />
            <div className={styles['info-count']} title={likeCount} >{likeCount}</div>
          </div>
          <div>
            <img className={styles['info-icon']} src={favImg} alt="" />
            <div className={styles['info-count']} title={favCount} >{favCount}</div>
          </div>
        </div>
      </div>
    </div>
  )


export default Work;
