import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import DesignList from './DesignList';
import styles from './style.less';


const HAS_COLLECT = 1;
const NOT_COLLECT = 0;

@connect(({ productionDetail, loading }) => ({
  ...productionDetail,
  contentLoading: loading.effects['productionDetail/fetch'],
  collectLoading: loading.effects['productionDetail/toggleCollect'],
  likeLoading: loading.effects['productionDetail/likeThis'],
}))
class Page extends Component {
  state = {
    isCollection: false,
  }

  componentDidMount() {
    const { computedMatch } = this.props;
    const { id } = computedMatch.params;
    this.refresh(id)
  }

  componentWillReceiveProps(nextProps) {
    const { computedMatch, data } = nextProps;
    const { id } = computedMatch.params;
    if (id !== this.props.computedMatch.params.id) {
      this.refresh(id);
    }
    this.setState({
      isCollection: data.isCollection,
    });
  }

  refresh = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productionDetail/fetch',
      payload: {
        id,
      },
    });
    dispatch({
      type: 'productionDetail/getDesignsList',
      payload: {
        id,
      },
    });
  }

  toggleCollect = isCollect => {
    const { dispatch, computedMatch, collectLoading } = this.props;
    if (collectLoading) {
      return;
    }
    dispatch({
      type: 'productionDetail/toggleCollect',
      payload: {
        id: computedMatch.params.id,
        isCollect,
      },
    }).then(res => {
      if (res.ok) {
        this.setState({
          isCollection: isCollect,
        })
      }
    });
  }

  likeThis = () => {
    const { dispatch, computedMatch, likeLoading } = this.props;
    if (likeLoading) {
      return;
    }
    dispatch({
      type: 'productionDetail/likeThis',
      payload: {
        id: computedMatch.params.id,
      },
    });
  }

  render() {
    const { data, dataList = [] } = this.props;
    const { isCollection } = this.state;
    const {
      worksName,
      coverImage = data.cover_image,
      categoryName,
      // releaseTime,
      headImage,
      updateTime,
      content,
      pv,
      fabulousNo,
      isFollow,
    } = data;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <aside>
            <header>
              作者信息
            </header>
            <div className={styles.asideTitle}>
              Ta的作品集
            </div>
            <DesignList data={dataList} />
          </aside>
          <div className={styles.main}>
            <header>
              <div className={styles.title}>
                <span className={styles.text}>{worksName}</span>
                {categoryName && <span className={styles.tag}>{categoryName}</span>}
              </div>
              <div className={styles.total}>
                <span><Icon type="eye" />{pv}</span>
                <span><Icon type="like" />{fabulousNo}</span>
              </div>
              <div className={styles.publishTime}>
                最后编辑于：  <span>{updateTime}</span>
              </div>
            </header>
            <article dangerouslySetInnerHTML={{ __html: data.content }} />
            <footer>
              <button
                className={`${isCollection ? styles.checked : ''}`}
                type="button"
                onClick={() => this.toggleCollect(!isCollection)}
              >
                <Icon type="star" />
                {isCollection === HAS_COLLECT ? '已收藏' : '收藏'}
              </button>
              <button
                type="button"
                onClick={this.likeThis}
              >
                <Icon type="like" />
                点赞
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
