import React, { Component } from 'react';
import { Pagination } from 'antd';
import CatelogSelect from '@/components/CatelogSelect';
import OptionSelect from '@/components/OptionSelect';
import Banner from '@/components/Banner';
import styles from './style.less';

class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { namespace } = this;
    dispatch({
      type: `${namespace}/fetchDataList`,
      payload: {},
    });
    dispatch({
      type: `${namespace}/fetchCatelogData`,
      payload: {},
    });
    // dispatch({
    //   type: `${namespace}/fetchBannerData`,
    //   payload: {},
    // });
  }

  /**
   * 列表由子类实现
   */
  renderDataList = dataList => {
    throw new Error('renderDataList 还没有实现');
  };

  onPagerChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.namespace}/changeParams`,
      payload: {
        pageIndex: page,
        pageSize,
      },
    })
  }

  onCatelogChange = (catelogId, data) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.namespace}/changeParams`,
      payload: {
        catelogId,
      },
    });
    dispatch({
      type: `${this.namespace}/save`,
      payload: {
        catelogData: data,
      },
    });
  }

  onSortChange = (sort, data) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.namespace}/changeParams`,
      payload: {
        sort,
      },
    });
    dispatch({
      type: `${this.namespace}/save`,
      payload: {
        sortOptions: data,
      },
    });
  }

  render() {
    const {
      dataList = [],
      pageSizeOptions,
      pageTotal,
      catelogData,
      bannerData,
      sortOptions,
    } = this.props;
    return (
      <div className={styles.container}>
          <section>
            <Banner data={bannerData} />
          </section>
          <section className={styles.bgWhite}>
            <article className={styles.bgWhite}>
              <CatelogSelect
                onChange={this.onCatelogChange}
                data={catelogData.map(item => ({ text: item.text, checked: item.checked, value: item.value }))} />
            </article>
          </section>
          <section>
            <header className={styles.sortTools}>
              <OptionSelect
                onChange={this.onSortChange}
                data={sortOptions.map(item => ({ text: item.text, checked: item.checked, value: item.value }))} />
            </header>
            <article>
              {
                this.renderDataList(dataList)
              }
            </article>
            <footer>
              <Pagination
                className={styles.pager}
                onChange={this.onPagerChange}
                total={Number(pageTotal)}
                pageSizeOptions={pageSizeOptions}
                showSizeChanger
                showQuickJumper
              />
            </footer>
          </section>
      </div>
    );
  }
}

export default Page;
