import React, { Component } from 'react';
import { Button, Col, Row, Card } from 'antd';
import { connect } from 'dva';
import FormItem from '@/components/FormItem';
import Breadcrumb from '@/components/Breadcrumb';
import ImageView from '@/components/ImageView';
import { displayYuan } from '@/utils/utils';

import styles from './style.less';

@connect(({ commodityListDetail }) => ({ ...commodityListDetail }))
class Page extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const goodsId = match.params.id;
    if (goodsId) {
      dispatch({
        type: 'commodityListDetail/fetch',
        payload: goodsId,
      });
    }
  }

  onClickBack = () => {
    const { dispatch, history } = this.props;
    dispatch({
      type: 'commodityList/fetch',
    });
    history.push('/commodity/list');
  };

  renderGoodsNormalDetail = goodsInfo => (
    <Row type="flex" justify="start" gutter={10}>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="商品名称">
          <span>{goodsInfo.goodsName}</span>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="商品类别">
          <span>{goodsInfo.category}</span>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="卖点">
          <span>{goodsInfo.sellingPoint}</span>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="商品品牌">
          <span>{goodsInfo.goodsBrand}</span>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="起订量">
          <span>{goodsInfo.minOrder + goodsInfo.minOrderUnit}</span>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="实时库存">
          <span>{goodsInfo.stockNum + goodsInfo.stockUnit}</span>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="初始库存">
          <span>{goodsInfo.originalStock + goodsInfo.stockUnit}</span>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="售价">
          {goodsInfo.ifStepPrice !== 1 && <span>{displayYuan(goodsInfo.currentPrice)}元</span>}
          {goodsInfo.ifStepPrice === 1 && (
            <div className={styles['ladder-price']}>
              {goodsInfo.stepPriceList.map((item, index) => (
                <div key={item.id} className={styles['ladder-price-item']}>
                  {index !== goodsInfo.stepPriceList.length - 1 && (
                    <div style={{ marginBottom: '20px' }}>
                      <span style={{ marginLeft: '10px' }}>
                        {item.minArea + goodsInfo.minOrderUnit}
                      </span>
                      <span style={{ marginLeft: '10px' }}>-</span>
                      <span style={{ marginLeft: '10px' }}>
                        {item.maxArea + goodsInfo.minOrderUnit}
                      </span>
                      <span style={{ marginLeft: '10px' }}>{displayYuan(item.areaPrice)}元</span>
                    </div>
                  )}
                  {index === goodsInfo.stepPriceList.length - 1 && (
                    <>
                      <span style={{ marginLeft: '10px' }}>
                        {item.minArea + goodsInfo.minOrderUnit}及以上
                      </span>
                      <span style={{ marginLeft: '10px' }}>{displayYuan(item.areaPrice)}元</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="建议零售价">
          <span>{displayYuan(goodsInfo.advisePrice)}元</span>
        </FormItem>
      </Col>

      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="运费">
          <span>{goodsInfo.templateName}</span>
        </FormItem>
      </Col>
    </Row>
  );

  renderSpecification = () => (
    <>
      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="下单规格">
            <></>
          </FormItem>
        </Col>
      </Row>
      <Row>
        {this.props.specsList.map(item => (
          <Col key={item.id} span={24} className={styles.specification}>
            {item.paramName && item.paramName.length > 0 ? (
              <div className={styles['specification-label-item']}>
                <span className={styles.label}>{item.paramName}：</span>
                <div className={styles['specification-item']}>
                  {item.valueList.map(it => (
                    <div key={it.id} className={styles['picture-item']}>
                      {it.picture && it.picture.length > 0 ? (
                        <img src={it.picture} className={styles.picture} alt="" />
                      ) : null}
                      <span className={styles.title}>{it.paramValue}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </Col>
        ))}
      </Row>

      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="展示参数">
            <></>
          </FormItem>
        </Col>
      </Row>

      <Row>
        {this.props.showList.map(it => (
          <Col key={it.paramName} span={12} className={styles.specification}>
            <FormItem label={it.paramName} labelStyle={styles.labelStyle}>
              <span>{it.paramValue}</span>
            </FormItem>
          </Col>
        ))}
      </Row>
    </>
  );

  renderShelvesSet = goodsInfo => (
    <>
      <Row>
        <Col pull={4} span={24} className={styles.specification}>
          <FormItem label="上架位置">
            <span>觅货APP</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col pull={4} span={24} className={styles.specification}>
          <FormItem label="上架标签">
            {goodsInfo.shelfLabel.map(item => (
              <span key={item} style={{ marginLeft: '20px' }}>
                {item === '1' ? '本店热销' : '本店上新'}
              </span>
            ))}
          </FormItem>
        </Col>
      </Row>
    </>
  );

  renderGoodsDetail = () => (
    <>
      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="轮播图">
            <></>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} push={1} className={styles.specification}>
          <ImageView editable={false} images={this.props.bannerList} />
        </Col>
      </Row>
      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="详情图">
            <></>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={22} push={1} className={styles.specification}>
          {(!this.props.detailPicMap || this.props.detailPicMap.length <= 0) && (
            <ImageView editable={false} images={this.props.pictureDetailList} />
          )}
          {this.props.detailPicMap && this.props.detailPicMap.length > 0 && (
            <div
              className={styles['dangerouslySetInnerHTML-params']}
              dangerouslySetInnerHTML={{ __html: this.props.detailPicMap }}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="封面图">
            <></>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} push={1} className={styles.specification}>
          <ImageView editable={false} images={this.props.coverImages} />
        </Col>
      </Row>
    </>
  );

  renderHeader = name => (
    <div
      style={{
        marginLeft: '42px',
        height: '40px',
        backgroundColor: '#F2F2F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#666666',
      }}
    >
      &nbsp;&nbsp;{name}
    </div>
  );

  render() {
    const { goodsInfo } = this.props;
    return (
      <Card className={styles.container} bodyStyle={{ overflow: 'scroll' }}>
        <div className={styles.title}>商品详情</div>
        {this.renderHeader('商品信息')}
        {this.renderGoodsNormalDetail(goodsInfo)}
        {this.renderHeader('规格及详情')}
        {this.renderSpecification()}
        {this.renderHeader('商品詳情')}
        {this.renderGoodsDetail()}
        {this.renderHeader('上架设置')}
        {this.renderShelvesSet(goodsInfo)}
        <div className={styles['back-btn']}>
          <Button onClick={() => this.onClickBack()}>返回</Button>
        </div>
      </Card>
    );
  }
}

export default Page;
