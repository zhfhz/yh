import React from 'react';
import styles from './index.less';
import logo from '../../assets/logo@2x.png';

const Footer = props => (
  <div className={styles.box}>
    <div className={styles.boxMain}>
      <div className={styles.center}>
        <div className={styles.img}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.title}>我是设计师</div>
            <div>
              <div className={styles.des}>
                <span>发布作品</span>
                <span>参加大赛</span>
              </div>
              <div className={styles.des}>
                <span>出售版权</span>
                <span>互动交流</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>我是设计师</div>
            <div>
              <div className={styles.des}>
                <span>发布作品</span>
                <span>参加大赛</span>
              </div>
              <div className={styles.des}>
                <span>出售版权</span>
                <span>互动交流</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>我是设计师</div>
            <div>
              <div className={styles.des}>
                <span>发布作品</span>
                <span>参加大赛</span>
              </div>
              <div className={styles.des}>
                <span>出售版权</span>
                <span>互动交流</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        @ Emake Tech Co.Ltd AII RIghts Reserved @1.1.6 苏ICP备18051566号-1
      </div>
    </div>
  </div>
);

export default Footer;
