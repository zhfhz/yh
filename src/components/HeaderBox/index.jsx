import { Button, Input, Icon, Badge, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
// import { url } from 'inspector';
import menu from '../../locales/zh-CN/menu';
import styles from './index.less';
import logo from '../../assets/logo@2x.png';
import unloginUser from '../../assets/unlogin_user.png';
import config from '../../../config/config';
import messageImg from '../../assets/xiaoxi.png';
// const HeaderBox = props => {
//   console.log(config.routes);
//   const { type } = props;
//   const pageName = ''; // 如果是菜单状态则显示pageName
//   if (type === 1) {
//     // 如果是携带参数
//   }
// };
@connect(({ user }) => ({ user }))
class HeaderBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuKey: '', commonTitle: '', showPanel: false };
  }

  componentDidMount() {
    const { type } = this.props;
    if (type === 1) {
      this.activeKey();
    } else {
      this.getCoomonTitle();
    }
  }

  activeKey = async () => {
    const menuRoutes = config.routes.filter(item => item.menuKey === 'main')[0].routes; // 获取菜单入口路由
    const pathName = this.props.location.pathname;
    await this.getMenuRoute(pathName, menuRoutes);
    // console.log(menu['menu.system.version']);
  };

  getCoomonTitle = () => {
    const pathName = this.props.location.pathname;
    if (pathName.indexOf('/login') > -1) {
      this.setState({ commonTitle: '登录' });
      return;
    }
    if (pathName.indexOf('/register') > -1) {
      this.setState({ commonTitle: '注册' });
      return;
    }
    if (pathName.indexOf('/register/complete') > -1) {
      this.setState({ commonTitle: '完善资料' });
      return;
    }
    if (pathName.indexOf('/center/designercenter') > -1) {
      this.setState({ commonTitle: '个人中心' });
      return;
    }
    if (pathName.indexOf('/center/brandcenter') > -1) {
      this.setState({ commonTitle: '企业管理中心' });
      return;
    }
    if (pathName.indexOf('/center/message') > -1) {
      this.setState({ commonTitle: '系统消息' });
    }
  };

  // 获取路由
  getMenuRoute = (pathName, menuRoutes, menuKey) => {
    menuRoutes.forEach(item => {
      if (pathName === item.path) {
        this.setState({ menuKey: menuKey || item.menuKey });
      }
      if (item.routes && item.routes.length > 0) {
        this.getMenuRoute(pathName, item.routes, menuKey || item.menuKey);
      }
    });
  };

  handleRedirect = (path, menuKey) => () => {
    router.push(path);
    this.setState({ menuKey });
  };

  handleRedirectLogin = () => {
    router.push('/login');
  };

  handleRedirectRegister = () => {
    router.push('/register');
  };

  handleSeacher = e => {
    if (e.target.value.trim()) {
      router.push({ pathname: '/search', query: { key: e.target.value } });
    }
  };

  handleSetRedict = () => {
    router.push('/center/designercenter/home');
  };

  handleSwitchPanel = () => {
    this.setState({ showPanel: !this.state.showPanel });
    console.log(this.state);
  };

  checkedLoginStatus = () => {
    const { user } = this.props;
    // return Object.keys(user.currentUser).length !== 0;
    return true;
  };

  render() {
    const { type, user } = this.props;
    const { showPanel } = this.state;
    const userName = user && user.currentUser && user.currentUser.name ? user.currentUser.name : '';
    const renderNavLogin = (
      <div className={styles.navLogin}>
        已注册，
        <Button type="link" size="small" onClick={this.handleRedirectLogin}>
          立即登录
        </Button>
      </div>
    );
    const renderNavRegister = (
      <div className={styles.navRegisterBox}>
        <div className={styles.navRegist} onClick={this.handleRedirectRegister}>
          注册
        </div>
        <div className={styles.navRegist} onClick={this.handleRedirectLogin}>
          <img src={unloginUser} alt="" />
          登录
        </div>
      </div>
    );
    const renderSearch = (
      <div className={styles.inputSearch}>
        <Input
          size="large"
          placeholder="搜索关键词 "
          width="330"
          allowClear
          onPressEnter={this.handleSeacher}
          prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </div>
    );
    const renderMessage = (
      <div className={styles.messageBox}>
        <Badge dot>
          <img src={messageImg} className={styles.message} alt="" />
        </Badge>
      </div>
    );
    const renderHeaderImg = (
      <>
        <div
          className={styles.headerImg}
          style={{
            backgroundImage: `url(${
              user && user.currentUser && user.currentUser.headImage
                ? user.currentUser.headImage
                : ''
            })`,
          }}
          onClick={this.handleSwitchPanel}
        ></div>

        {showPanel && (
          <div className={styles.panel}>
            <div className={styles.header}>
              <div className={styles.herder}>
                <div
                  className={styles.headerBigImg}
                  style={{
                    backgroundImage: `url(${
                      user && user.currentUser && user.currentUser.headImage
                        ? user.currentUser.headImage
                        : ''
                    })`,
                  }}
                ></div>
                <div className={styles.headerName}>
                  {userName.length > 12 ? (
                    <Tooltip title={userName}>{`${userName.substring(0, 12)}...`}</Tooltip>
                  ) : (
                    userName
                  )}
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.bottomItem} onClick={this.handleSetRedict}>
                账号设置
              </div>
              <div className={styles.bottomItem}>退出登录</div>
            </div>
          </div>
        )}
      </>
    );

    return (
      <div className={styles.box}>
        <div className={styles.boxMain}>
          <div className={styles.left}>
            <div className={styles.headerimg}>
              <img src={logo} alt="" onClick={this.handleRedirect('/', 'main')} />
            </div>
            {type === 1 && (
              <div className={styles.menus}>
                <span
                  className={
                    this.state.menuKey === 'home' ? styles.munuItemActive : styles.munuItem
                  }
                  onClick={this.handleRedirect('/', 'home')}
                >
                  首页
                </span>
                <span
                  className={
                    this.state.menuKey === 'production' ? styles.munuItemActive : styles.munuItem
                  }
                  onClick={this.handleRedirect('/production', 'production')}
                >
                  原创作品
                </span>
                <span
                  className={
                    this.state.menuKey === 'designer' ? styles.munuItemActive : styles.munuItem
                  }
                  onClick={this.handleRedirect('/designer', 'designer')}
                >
                  设计师
                </span>
                <span
                  className={
                    this.state.menuKey === 'brand' ? styles.munuItemActive : styles.munuItem
                  }
                  onClick={this.handleRedirect('/brand', 'brand')}
                >
                  企业&品牌
                </span>
              </div>
            )}

            {type === 2 && <div className={styles.centerName}>{this.state.commonTitle}</div>}
          </div>
          <div className={styles.right}>
            <div className={styles.account}>
              {type === 1 && (
                <>
                  {this.checkedLoginStatus() && renderHeaderImg}
                  {this.checkedLoginStatus() && renderMessage}
                  {!this.checkedLoginStatus() && renderNavRegister}
                  {renderSearch}
                </>
              )}
              {type === 2 && (
                <>
                  {this.checkedLoginStatus() && renderMessage}
                  {renderNavLogin}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    );
  }
}
export default HeaderBox;
