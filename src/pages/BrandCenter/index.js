import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './style.less';
import homeImage from '@/assets/brand-home.png';
import homeImageSelect from '@/assets/brand-home-select.png';
import goodsImage from '@/assets/brand-goods.png';
import goodsImageSelect from '@/assets/brand-goods-select.png';
import orderImage from '@/assets/brand-order.png';
import orderImageSelect from '@/assets/brand-order-select.png';
import financeImage from '@/assets/brand-finance.png';
import financeImageSelect from '@/assets/brand-finance-select.png';
import freightImage from '@/assets/brand-freight.png';
import freightImageSelect from '@/assets/brand-freight-select.png';
import registerImage from '@/assets/brand-register.png';
import registerImageSelect from '@/assets/brand-register-select.png';
import setImage from '@/assets/brand-set.png';
import setImageSelect from '@/assets/brand-set-select.png';
import showImage from '@/assets/brand-show.png';
import showImageSelect from '@/assets/brand-show-select.png';
import edit from '@/assets/brand_edit.png';

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
            <img className={styles['show-image']} src={edit} alt="edit" />
            <span className={styles['show-detail']}>{companyInfo.companySlogan}</span>
          </div>
          <div className={styles['brand-info-tag']}>
            {companyInfo.labelList.map(it => (
              <span key={it.tagId} className={styles.tag}>
                {it.tagName}
              </span>
            ))}
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
    const selectedKey = [rank.slice(0, 4).join('/')];
    return (
      <Layout style={{ marginTop: 10, marginBottom: 10 }}>
        <Sider width={162} style={{ minHeight: '100vh' }}>
          <Menu
            style={{ width: 162 }}
            theme="dark"
            onClick={this.handleClick}
            defaultSelectedKeys={selectedKey}
          >
            <Menu.Item key="/center/brandcenter/home">
              <Link to="/center/brandcenter/home">
                {JSON.stringify(selectedKey) === JSON.stringify(['/center/brandcenter/home']) && (
                  <img className={styles.img} src={homeImageSelect} alt="" />
                )}
                {JSON.stringify(selectedKey) !== JSON.stringify(['/center/brandcenter/home']) && (
                  <img className={styles.img} src={homeImage} alt="" />
                )}
                工厂首页
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/commodity">
              <Link to="/center/brandcenter/commodity">
                {JSON.stringify(selectedKey) ===
                  JSON.stringify(['/center/brandcenter/commodity']) && (
                  <img className={styles.img} src={goodsImageSelect} alt="" />
                )}
                {JSON.stringify(selectedKey) !==
                  JSON.stringify(['/center/brandcenter/commodity']) && (
                  <img className={styles.img} src={goodsImage} alt="" />
                )}
                商品管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/order">
              <Link to="/center/brandcenter/order">
                {JSON.stringify(selectedKey) === JSON.stringify(['/center/brandcenter/order']) && (
                  <img className={styles.img} src={orderImageSelect} alt="" />
                )}
                {JSON.stringify(selectedKey) !== JSON.stringify(['/center/brandcenter/order']) && (
                  <img className={styles.img} src={orderImage} alt="" />
                )}
                订单管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/finance">
              <Link to="/center/brandcenter/finance">
                {JSON.stringify(selectedKey) ===
                  JSON.stringify(['/center/brandcenter/finance']) && (
                  <img className={styles.img} src={financeImageSelect} alt="" />
                )}
                {JSON.stringify(selectedKey) !==
                  JSON.stringify(['/center/brandcenter/finance']) && (
                  <img className={styles.img} src={financeImage} alt="" />
                )}
                财务管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/freight">
              <Link to="/center/brandcenter/freight">
                {JSON.stringify(selectedKey) ===
                  JSON.stringify(['/center/brandcenter/freight']) && (
                  <img className={styles.img} src={freightImageSelect} alt="" />
                )}
                {JSON.stringify(selectedKey) !==
                  JSON.stringify(['/center/brandcenter/freight']) && (
                  <img className={styles.img} src={freightImage} alt="" />
                )}
                运费管理
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/material">
              <Link to="/center/brandcenter/material">
                {JSON.stringify(selectedKey) ===
                  JSON.stringify(['/center/brandcenter/material']) && (
                  <img className={styles.img} src={showImageSelect} alt="" />
                )}
                {JSON.stringify(selectedKey) !==
                  JSON.stringify(['/center/brandcenter/material']) && (
                  <img className={styles.img} src={showImage} alt="" />
                )}
                展示资料
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/registermaterial">
              <Link to="/center/brandcenter/registermaterial">
                {JSON.stringify(selectedKey) ===
                  JSON.stringify(['/center/brandcenter/registermaterial']) && (
                  <img className={styles.img} src={registerImageSelect} alt="" />
                )}
                {JSON.stringify(selectedKey) !==
                  JSON.stringify(['/center/brandcenter/registermaterial']) && (
                  <img className={styles.img} src={registerImage} alt="" />
                )}
                注册资料
              </Link>
            </Menu.Item>
            <Menu.Item key="/center/brandcenter/config">
              <Link to="/center/brandcenter/config">
                {JSON.stringify(selectedKey) ===
                  JSON.stringify(['/center/brandcenter/config']) && (
                  <img className={styles.img} src={setImageSelect} alt="" />
                )}
                {JSON.stringify(selectedKey) !==
                  JSON.stringify(['/center/brandcenter/config']) && (
                  <img className={styles.img} src={setImage} alt="" />
                )}
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
