import React, { Component } from 'react';
import { Pagination } from 'antd';
import { connect } from 'dva';
import DesignExhibit from '@/components/DesignExhibit';
import DesignerExhibit from '@/components/DesignerExhibit';
import CompanyList from '@/components/CompanyList';
import OptionSelect from '@/components/OptionSelect';
import NoData from './NoData';


import styles from './style.less';

@connect(({ search }) => search)
class Page extends Component {
  componentWillMount() {
    const { options } = this.props;
    const curOption = options.find(item => item.checked);
    this.tabTpye = curOption.value;
  }

  componentDidMount() {
    const { location } = this.props;
    this.refresh(location.query.key);
  }

  componentWillReceiveProps(nextProps) {
    const preKey = this.props.location.query.key;
    const nextKey = nextProps.location.query.key;
    if (preKey !== nextKey) {
      this.refresh(nextKey);
    }
  }

  refresh = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'search/getSearchResultTotal',
      payload: {
        keyword: key,
      },
    }).then(total => {
      if (total > 0) {
        dispatch({
          type: `search/getDataList${this.tabTpye}`,
          payload: {
            keyword: key,
          },
        });
      }
    });
  }

  onTabsChange = (tabTpye, data) => {
    this.tabTpye = tabTpye;
    const { dispatch, location } = this.props;
    dispatch({
      type: `search/getDataList${this.tabTpye}`,
      payload: {
        pageIndex: 1,
        keyword: location.query.key,
      },
    });
    dispatch({
      type: 'search/save',
      payload: {
        options: data,
      },
    });
  }

  onPagerChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'search/changeParams',
      payload: {
        pageIndex: page,
        pageSize,
      },
    })
  }

  renderList = () => {
    const { dataList, dispatch } = this.props;
    switch (this.tabTpye) {
      case '0':
        return (
          <DesignExhibit
            data={dataList}
          />
        )
      case '1':
        return (
          <DesignerExhibit
            data={dataList}
            onFollowBtnClick={(id, isFollow) => dispatch({
              type: 'user/follow',
              userId: id,
              isFollow,
            })}
          />
        )
      case '2':
        return (
          <CompanyList
            data={dataList}
          />
        )
      default:
        return null;
    }
  };

  render() {
    const { options = [], location, totalCount, pageSizeOptions, pageTotal } = this.props;
    return (
      <div className={styles.container}>
        {
          totalCount <= 0 && <NoData />
        }
        {
          totalCount > 0 && (
            <>
              <header>
                为您搜索到 <span>{location.query.key}</span> 相关信息<span> {totalCount} </span>条
              </header>
              <div className={styles.tabs}>
                <OptionSelect
                  useDiliver
                  onChange={this.onTabsChange}
                  scrollAble={false}
                  data={options}
                />
              </div>
              <div className={styles.content}>
                {
                  this.renderList()
                }
              </div>
              <footer>
                <Pagination
                  className={styles.pager}
                  onChange={this.onPagerChange}
                  total={pageTotal}
                  pageSizeOptions={pageSizeOptions}
                  showSizeChanger
                  showQuickJumper
                />
              </footer>
            </>
          )
        }
      </div>
    );
  }
}

export default Page;
