import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

import styles from './style.less';
import { CenterRoute, UserType, FollowState } from './Const';
import blankUserImg from '@/assets/blank_user.png';
import maleImg from '@/assets/gender_male.png';
import femaleImg from '@/assets/gender_female.png';
import editImg from '@/assets/edit2.png';
import verifiedImg from '@/assets/verified.png';

@connect(({ designerCenter }) => ({ ...designerCenter }))
class Page extends Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'designerCenter/fetch',
      userId: location.query.id,
    });
  }

  getPage = index => {
    const { children } = this.props;
    return children && children.props.children[index];
  };

  onClickTab = tabIndex => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenter/save',
      payload: {
        tabSelectIndex: tabIndex,
      },
    });
  };

  onClickEditInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenter/jumpTo',
      path: '/center/designercenter/personal',
    });
  };

  onClickUploadWork = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'designerCenter/jumpTo',
      path: '/center/designercenter/uploadwork',
    });
  };

  onClickFollow = () => {
    const { userId, dispatch } = this.props;
    dispatch({
      type: 'designerCenter/follow',
      userId,
      isFollow: true,
    });
  }

  onClickCancelFollow = () => {
    const { userId, dispatch } = this.props;
    dispatch({
      type: 'designerCenter/follow',
      userId,
      isFollow: false,
    });
  }

  renderBanner = () => (
    <div className={styles.banner}>
      <div className={styles['banner-round1']} />
      <div className={styles['banner-round2']} />
      <div className={styles['banner-round3']} />
    </div>
  )

  renderInfoCard = (userId, userInfo) => {
    const {
      headImage,
      nickName,
      sex,
      birthday,
      province,
      city,
      occupationName,
      userType,
      autograph,
      isFollow,
    } = userInfo;
    const follow = isFollow === FollowState.YES ?
      (
        <Button className={styles['left-top-single']} onClick={this.onClickCancelFollow}>
          已关注
        </Button>
      ) :
      (
        <Button className={styles['left-top-single']} onClick={this.onClickFollow}>
          关注
        </Button>
      )
    return (
      <div className={styles.left}>
        <div className={styles['left-top']}>
          <div className={styles['left-top-pic']}>
            <img src={headImage || blankUserImg} alt="" />
          </div>
          <div className={styles['left-name']}>
            <span>{nickName}</span>
            {userType === UserType.DESIGNER && <img className={styles['icon-normal2']} src={verifiedImg} alt="" />}
          </div>
          <div className={styles['left-sign']}>
            <img className={styles['icon-normal2']} src={editImg} alt="" />
            <span>{autograph}</span>
          </div>
          <div className={styles['left-opt']}>
            {
              userId ?
                follow :
                (
                  <>
                    <Button className={styles['left-top-btn']} onClick={this.onClickEditInfo}>
                      编辑资料
                    </Button>
                    <Button className={styles['left-top-primary']} onClick={this.onClickUploadWork}>
                      上传作品
                    </Button>
                  </>
                )
            }
          </div>
        </div >
        <div className={styles['left-line']} />
        <div className={styles['left-item']}>
          <div className={styles['left-item-title']}>个人信息</div>
          <div className={styles['left-item-pair']}>
            <div>性别</div>
            {sex !== 3 && (
              <img
                className={styles['pair-right-img']}
                src={sex === 1 ? maleImg : femaleImg}
                alt=""
              />
            )}
          </div>
          <div className={styles['left-item-pair']}>
            <div>生日</div>
            <div className={styles['pair-right']}>{birthday}</div>
          </div>
          <div className={styles['left-item-pair']}>
            <div>职业</div>
            <div className={styles['pair-right']}>{occupationName}</div>
          </div>
          <div className={styles['left-item-pair']}>
            <div>所在地</div>
            <div className={styles['pair-right']}>
              {province} {city}
            </div>
          </div>
        </div>
      </div >
    );
  };

  renderTab = (index, title) => {
    const { tabSelectIndex } = this.props;

    return (
      <div className={tabSelectIndex === index ? styles['tab-selected'] : styles['top-tab']} onClick={() => this.onClickTab(index)}>
        <div className={tabSelectIndex === index ? styles['tab-selected-text'] : styles['tab-text']}>{title}</div>
        {tabSelectIndex === index && <div className={styles['tab-selected-mark']} />}
      </div>
    );
  };

  renderTabs = (userId, userInfo) => {
    const { worksNo, fansNo, followNo, collectionNo, dynamicNo } = userInfo;
    return (
      <div className={userId ? styles['top-tabs-fix'] : styles['top-tabs']}>
        {this.renderTab(CenterRoute.Work, `作品（${worksNo}）`)}
        <div className={styles['tab-line']} />
        {this.renderTab(CenterRoute.Fans, `粉丝（${fansNo}）`)}
        <div className={styles['tab-line']} />
        {this.renderTab(CenterRoute.Follow, `关注（${followNo}）`)}
        <div className={styles['tab-line']} />
        {this.renderTab(CenterRoute.Favorite, `收藏（${collectionNo}）`)}
        {
          !userId &&
          (
            <>
              <div className={styles['tab-line']} />
              {this.renderTab(CenterRoute.Msg, `动态（${dynamicNo}）`)}
            </>
          )
        }
      </div>
    );
  };

  renderMain = index => <div className={styles.right}>{this.getPage(index)}</div>;

  render() {
    const { tabSelectIndex, userId, userInfo } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles['bg-fix']} />
        <div className={styles.top}>
          {this.renderBanner()}
          {this.renderTabs(userId, userInfo || {})}
        </div>
        <div className={styles.bottom}>
          <div className={styles['left-fix']}>{this.renderInfoCard(userId, userInfo || {})}</div>
          {this.renderMain(tabSelectIndex)}
        </div>
      </div>
    );
  }
}

export default Page;
