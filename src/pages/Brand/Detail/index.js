import React, { Component } from 'react';
import { Avatar } from 'antd';
import { connect } from 'dva';
import UserInfo from './UserInfo';
import OptionSelect from '@/components/OptionSelect';
import CardList from '@/components/CardList';
import styles from './style.less';

const { Card } = CardList;

@connect(({ brandDetail }) => brandDetail)
class Page extends Component {
  componentDidMount() {
    const { dispatch, options, computedMatch } = this.props;
    this.optionValue = options.find(item => item.checked).value;
    dispatch({
      type: 'brandDetail/fetch',
      payload: {
        id: computedMatch.params.id,
      },
    });
    this.refreshPage();
  }

  refreshPage = () => {
    const { dispatch, computedMatch } = this.props;
    dispatch({
      type: 'brandDetail/getCompanyInfo',
      payload: {
        id: computedMatch.params.id,
        optionValue: this.optionValue,
      },
    });
  }

  onTabsChanged = (value, data) => {
    const { dispatch } = this.props;
    this.optionValue = value;
    dispatch({
      type: 'brandDetail/save',
      payload: {
        options: data.slice(0),
      },
    });
    this.refreshPage();
  }

  render() {
    const { userInfo, options, content } = this.props;
    return (
      <div className={styles.container}>
        <section>
          <UserInfo {...userInfo} />
        </section>
        <section className={styles.tabsContainer}>
          <OptionSelect
            className={styles.tabs}
            checkedClassName={styles.checked}
            itemClassName={styles.tabItem}
            useDiliver
            onChange={this.onTabsChanged}
            scrollAble={false}
            data={options}
          />
        </section>
        <section className={styles.tabContent}>
          {
            ['0', '1', '2'].indexOf(this.optionValue) >= 0 && (
            <div dangerouslySetInnerHTML={{ __html: content }} />
            )
          }
          {
            this.optionValue === '3' && (
              <CardList>
                {
                  (content || []).map(item => (
                    <Card key={item.id} className={styles.imgItem}>
                      <img alt="" src={item.elegantUrl} />
                    </Card>
                  ))
                }
              </CardList>
            )
          }
        </section>
      </div>
    );
  }
}

export default Page;
