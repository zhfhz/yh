import React, { Component } from 'react';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import uuid from 'uuid/v1';
import Breadcrumb from '@/components/Breadcrumb';
import { ChartsType } from './commons';


import styles from './style.less';

@connect(({ brandCenterHome }) => brandCenterHome)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterHome/fetch',
    });
  }

  onChangeTimeType = type => {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenterHome/updateState',
      payload: { timeType: type },
    });
    dispatch({
      type: 'brandCenterHome/getOrderTrade',
    });
  };

  getOption = (chartList, times, amounts) => ({
    // title: {
    //   text: '商品交易额',
    //   subtext: '近一周订单统计',
    //   align: 'left',
    //   x: '15px',
    // },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'white',
      color: 'black',
      shadowColor: '#000000',
      shadowBlur: 8,
      textStyle: {
        color: 'black',
      },
      formatter(params) {
        let result = '';
        params.forEach(item => {
          result +=
            // eslint-disable-next-line no-useless-concat
            '总成交 : ' + `<span style="color:#597EF7">${item.data.num}</span>单<br>`;
          // eslint-disable-next-line no-useless-concat
          result += '总交易额 : ' + `<span style="color:#597EF7">￥${item.data.value}</span><br>`;
        });
        return result;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: times,
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
          show: true,
        },
      },
    ],
    series: [
      {
        name: '总交易额',
        type: 'line',
        stack: '总交易额',
        smooth: true,
        symbolSize: 6,
        itemStyle: {
          normal: {
            color: '#597EF7',
            lineStyle: {
              color: '#597EF7',
            },
          },
        },
        areaStyle: {
          normal: {
            color: 'rgba(223,229,251,0.8)',
          },
        },
        data: amounts,
      },
    ],
  });

  renderCharts = () => {
    const { timeType, chartList } = this.props;
    const times = [];
    const amounts = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < chartList.length; i++) {
      times.push(chartList[i].orderTime);
      amounts.push({ value: chartList[i].orderAmount, num: chartList[i].orderNum });
    }
    return (
      <div>
        <div className={styles['charts-title']}>商品交易额</div>
        <div className={styles['charts-subtitle-item']}>
          <span className={styles['charts-subtitle']}>近一周订单统计</span>
          <div style={{ float: 'right' }}>
            <span
              className={styles['charts-buttons']}
              style={
                timeType === ChartsType.week
                  ? { color: '#19BC9C', marginRight: '25px' }
                  : { color: '#000000', marginRight: '25px' }
              }
              onClick={() => this.onChangeTimeType(ChartsType.week)}
            >
              本周
            </span>
            <span
              style={timeType === ChartsType.month ? { color: '#19BC9C' } : { color: '#000000' }}
              className={styles['charts-buttons']}
              onClick={() => this.onChangeTimeType(ChartsType.month)}
            >
              本月
            </span>
          </div>
        </div>
        <ReactEcharts
          option={this.getOption(chartList, times, amounts)}
          style={{ height: '350px', width: '100%' }}
          className="react_for_echarts"
        />
      </div>
    );
  };

  renderDynamicItem = () => {
    const { dynamicList } = this.props;
    return (
      <div className={styles.dynamic}>
        {dynamicList.map(it => (
          <div key={uuid()} className={styles['dynamic-item']}>
            <span className={styles['dynamic-item-content']}>{it.content}</span>
            <span className={styles['dynamic-item-time']}>{it.sendDate}</span>
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumb title="最新动态" />
        {this.renderDynamicItem()}
        <Breadcrumb title="统计图表" />
        {this.renderCharts()}
      </div>
    );
  }
}

export default Page;
