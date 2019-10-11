import React, { Component } from 'react';
import { Button, Menu, Icon, Layout } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './style.less';
import homeImage from '@/assets/brand-home.png';
import goodsImage from '@/assets/brand-goods.png';
import orderImage from '@/assets/brand-order.png';
import financeImage from '@/assets/brand-finance.png';
import freightImage from '@/assets/brand-freight.png';
import registerImage from '@/assets/brand-register.png';
import setImage from '@/assets/brand-set.png';
import showImage from '@/assets/brand-show.png';

const { Sider, Content } = Layout;

@connect(({ brandCenter }) => brandCenter)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandCenter/fetch',
    });
  }

  handleClick = e => {
    console.log('click ', e);
  };

  renderHeader = () => {
    const { companyInfo, amountInfo } = this.props;
    return (
      <div className={styles['brand-header']}>
        <div className={styles['header-image-background']}>
          <img className={styles['header-image']} alt="avatar" src={companyInfo.companyLogo} />
        </div>
        <div className={styles['header-brand-info']}>
          <div className={styles['brand-info-title']}>
            <div className={styles['brand-info-name']}>{companyInfo.enterpriseName}</div>
            <div className={styles['brand-info-edit']}>编辑资料</div>
          </div>
          <div className={styles['brand-info-enter']}>{companyInfo.platformName}</div>
          <div className={styles['brand-info-show']}>
            <img
              className={styles['show-image']}
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1022109268,3759531978&fm=26&gp=0.jpg"
              alt="edit"
            />
            <span className={styles['show-detail']}>{companyInfo.companySlogan}</span>
          </div>
          <div className={styles['brand-info-tag']}>
            <span className={styles.tag}>诚信工厂诚信工厂诚信工厂</span>
            <span className={styles.tag}>诚信工厂</span>
            <span className={styles.tag}>诚信工厂</span>
            <span className={styles.tag}>诚信工厂</span>
            <span className={styles.tag}>诚信工厂</span>
          </div>
        </div>
        <div className={styles['header-information']}>
          <div className={styles['header-information-sale']}>
            <span className={styles.title}>商品销售总额</span>
            <span className={styles.content}>￥{amountInfo.salesAmount}</span>
          </div>
          <div className={styles['header-information-num']}>
            <span className={styles.title}>在售商品数</span>
            <span className={styles.content}>￥{amountInfo.goodsNum}</span>
          </div>
          <div className={styles['header-information-tax']}>
            <span className={styles.title}>累计返税</span>
            <span className={styles.content}>￥{amountInfo.refundAmount}</span>
          </div>
        </div>
      </div>
    );
  };

  renderMenu = () => {
    const { history } = this.props;
    const rank = history.location.pathname.split('/');
    return (
      <Layout style={{ marginTop: 10, marginBottom: 10 }}>
        <Sider width={162} style={{ minHeight: '100vh' }}>
          <Menu
            style={{ width: 162 }}
            theme="dark"
            onClick={this.handleClick}
            defaultSelectedKeys={[rank.slice(0, 4).join('/')]}
          >
            <Menu.Item key="/center/brandcenter/home">
              <Link to="/center/brandcenter/home">
                <Icon type="home" />
                工厂首页
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/commodity">
              <Link to="/center/brandcenter/commodity">
                <Icon type="mail" />
                商品管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/order">
              <Link to="/center/brandcenter/order">
                <Icon type="mail" />
                订单管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/finance">
              <Link to="/center/brandcenter/finance">
                <Icon type="mail" />
                财务管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/freight">
              <Link to="/center/brandcenter/freight">
                <Icon type="mail" />
                运费管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/material">
              <Link to="/center/brandcenter/material">
                <Icon type="mail" />
                展示资料
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/registermaterial">
              <Link to="/center/brandcenter/registermaterial">
                <Icon type="mail" />
                注册资料
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/config">
              <Link to="/center/brandcenter/config">
                <Icon type="mail" />
                账号设置
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ marginLeft: 10 }}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        {this.renderHeader()}
        {this.renderMenu()}
      </div>
    );
  }
}

export default Page;
