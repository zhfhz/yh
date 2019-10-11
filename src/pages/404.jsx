import { Button } from 'antd';
import React from 'react';
import router from 'umi/router'; // 这里应该使用 antd 的 404 result 组件，
import noFindPng from '../assets/404.png';
import noFindPngDes from '../assets/404_des.png';

const NoFoundPage = () => (
  <div
    style={{
      height: '100vh',
      padding: 80,
      paddingTop: 140,
      textAlign: 'center',
    }}
  >
    <br />
    <br />
    {/* <h1 style={{ fontSize: 30 }}>404</h1> */}
    <div style={{ width: 300, height: 200, margin: '0 auto', marginBottom: '40px' }}>
      <img src={noFindPngDes} alt="404" />
      <p style={{ color: '#666666', fontSize: 20, marginTop: 10 }}>糟糕！页面不见了！</p>
      <div style={{ marginLeft: 40 }}>
        <div
          style={{
            width: 104,
            height: 32,
            background: '#F78C24',
            borderRadius: 4,
            color: '#fff',
            float: 'left',
            marginRight: 10,
            lineHeight: '32px',
            cursor: 'pointer',
          }}
          onClick={() => window.location.reload()}
        >
          刷新
        </div>
        <div
          style={{
            width: 104,
            height: 32,
            background: ' rgba(89, 126, 247, 1)',
            borderRadius: 4,
            color: '#fff',
            float: 'left',
            marginRight: 10,
            lineHeight: '32px',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/')}
        >
          返回系统首页
        </div>
      </div>
    </div>
    <img src={noFindPng} alt="404" />
  </div>
);

export default NoFoundPage;
