import React, { Component } from 'react';
import { Col, Row, Select, Card, Checkbox, Button, Modal, Radio } from 'antd';
import { connect } from 'dva';
import RadioGroup from 'antd/lib/radio/group';
import FormItem from '@/components/FormItem';
import ImageView from '@/components/ImageView';
import LInput from '@/components/LimitInput';
import InputNumber from '@/components/InputNumber';
import { RadioStates } from './service';
import UEditor from '@/components/Ueditor';

import styles from './style.less';

@connect(({ commodityListMutation }) => ({ ...commodityListMutation }))
class Page extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const goodsId = match.params.id;
    if (goodsId) {
      dispatch({
        type: 'commodityListMutation/fetch',
        payload: goodsId,
      });
    } else {
      dispatch({
        type: 'commodityListMutation/fetch',
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/release',
    });
  }

  changeGoodsName = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateGoodsName',
      payload: { goodsName: e.target.value },
    });
  };

  changeSellingPoint = index => e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSellingPoint',
      payload: { index, sellingPoint: e.target.value },
    });
  };

  changePrice = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updatePrice',
      payload: { currentPrice: value },
    });
  };

  updateAdvisePrice = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateAdvisePrice',
      payload: { advisePrice: value },
    });
  };

  changeMinOrder = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateMinOrder',
      payload: { minOrder: value },
    });
  };

  changeMinOrderUnit = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateMinOrderUnit',
      payload: { minOrderUnit: value },
    });
  };

  changeStockNum = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateStockNum',
      payload: { stockNum: value },
    });
  };

  changeStockUnit = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateStockUnit',
      payload: { stockUnit: value },
    });
  };

  changeCategoryB = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/changeCategoryA',
      payload: { id },
    });
  };

  changeCategoryBId = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/changeCategoryBId',
      payload: { id },
    });
  };

  changeFreightId = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/changeFreightId',
      payload: { id },
    });
  };

  changeSpecificationOne = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSpecificationOneName',
      payload: { specificationOne: e.target.value },
    });
  };

  changeSpecPictuer = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSpecPicture',
      payload: { checked: e.target.checked },
    });
  };

  updateSpecPictuerValue = (images, item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSpecPictuerValue',
      payload: { images, item },
    });
  };

  changeSpecificationParamsOneValue = id => e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSpecificationOneValue',
      payload: { id, paramValue: e.target.value },
    });
  };

  addSpecificationParamsOne = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/addSpecParamOne',
    });
  };

  deleteSpecificationParamsOne = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/deleteSpecParamOne',
      payload: { item },
    });
  };

  changeSpecificationTwo = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSpecificationTwoName',
      payload: { specificationTwo: e.target.value },
    });
  };

  changeSpecificationParamsTwoValue = id => e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSpecificationTwoValue',
      payload: { id, paramValue: e.target.value },
    });
  };

  addSpecificationParamsTwo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/addSpecParamTwo',
    });
  };

  deleteSpecificationParamsTwo = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/deleteSpecParamTwo',
      payload: { item },
    });
  };

  changeSpecificationThree = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSpecificationThreeName',
      payload: { specificationThree: e.target.value },
    });
  };

  changeSpecificationParamsThreeValue = id => e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateSpecificationThreeValue',
      payload: { id, paramValue: e.target.value },
    });
  };

  addSpecificationParamsThree = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/addSpecParamThree',
    });
  };

  deleteSpecificationParamsThree = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/deleteSpecParamThree',
      payload: { item },
    });
  };

  // 展示参数
  changeParamsName = id => e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateParamsName',
      payload: { id, paramName: e.target.value },
    });
  };

  changeParamsValue = id => e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateParamsValue',
      payload: { id, paramValue: e.target.value },
    });
  };

  addParamsItem = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/addParams',
    });
  };

  deleteParams = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/deleteParams',
      payload: { item },
    });
  };

  updateLabels = name => e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/changeLabelsChecked',
      payload: { name, checked: e.target.checked },
    });
  };

  updateCarouselList = images => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateCarouselList',
      payload: { carouselList: images },
    });
  };

  updateDetailPicList = images => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateDetailPicList',
      payload: { detailPicList: images },
    });
  };

  updateCoverImages = images => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateCoverImages',
      payload: { coverImages: images },
    });
  };

  saveGoods = status => {
    const content = this.editor.getContent();
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/updateDetailPicMap',
      payload: { detailPicMap: content },
    });
    dispatch({
      type: 'commodityListMutation/saveGoods',
      payload: { status },
    });
  };

  handleRadioChange = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/radioChange',
      payload: e.target.value,
    });
  };

  changeMinArea = item => value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/changeMinArea',
      payload: { minArea: value, item },
    });
  };

  changeMaxArea = item => value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/changeMaxArea',
      payload: { maxArea: value, item },
    });
  };

  changeAreaPrice = item => value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commodityListMutation/changeAreaPrice',
      payload: { areaPrice: value, item },
    });
  };

  onClickDelete = () => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '操作确认',
      content: (
        <>
          确认要删除此商品吗？
          <br />
          注意: 若该商品存在关联的订单，则此商品不允许删除
        </>
      ),
      onOk() {
        dispatch({ type: 'commodityListMutation/deleteGoods' });
      },
      okText: '确认',
      cancelText: '取消',
    });
  };

  attachEditor = ref => {
    this.editor = ref;
  };

  onReady = () => {
    const { detailPicMap } = this.props;
    if (this.editor && detailPicMap.length > 0) {
      this.editor.setContent(detailPicMap);
    }
  };

  // deleteGoods = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'commodityListMutation/deleteGoods',
  //   });
  // }

  renderGoodsNormalDetail = () => (
    <Row type="flex" justify="start" gutter={10}>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="商品名称" require>
          <LInput max={20} placeholder="请输入商品名称" value={this.props.goodsName} onChange={this.changeGoodsName} />
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="商品类别" require>
          <Select
            style={{ width: '45%' }}
            placeholder="-- 请选择 --"
            value={this.props.categoryAId}
            onChange={this.changeCategoryB}
          >
            {this.props.categoryOne.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.cateName}
              </Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: '45%', marginLeft: '10%' }}
            placeholder="-- 请选择 --"
            value={this.props.categoryBId}
            onChange={this.changeCategoryBId}
          >
            {this.props.categoryTwo.map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.cateName}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>

      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="卖点" require>
          <Row type="flex">
            {this.props.sellingPoints.map((it, index) => (
              <div
                key={it.id}
                style={
                  index === 2
                    ? { width: '30%', marginRight: '0' }
                    : { width: '30%', marginRight: '3%' }
                }
              >
                <LInput
                  max={6}
                  placeholder={`卖点${index + 1}`}
                  value={it.sellingPoint}
                  onChange={this.changeSellingPoint(index)}
                />
              </div>
            ))}
          </Row>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="商品品牌">
          <LInput
            max={20}
            placeholder="请输入商品品牌"
            value={this.props.goodsBrand}
            onChange={e =>
              this.props.dispatch({
                type: 'commodityListMutation/updateState',
                payload: { goodsBrand: e.target.value },
              })
            }
          />
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="起订量" require>
          <InputNumber
            style={{ width: '50%' }}
            min={0}
            precision={0}
            maxLength={9}
            value={this.props.minOrder}
            onChange={this.changeMinOrder}
          />
          <Select
            style={{ width: '47%', marginLeft: '3%' }}
            placeholder="-- 请选择 --"
            value={this.props.minOrderUnit}
            onChange={this.changeMinOrderUnit}
          >
            {this.props.unitList.map(item => (
              <Select.Option key={item.value} value={item.unit}>
                {item.unit}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="总库存" require>
          <InputNumber
            style={{ width: '50%' }}
            min={0}
            precision={0}
            maxLength={9}
            value={this.props.stockNum}
            onChange={this.changeStockNum}
          />
          <Select
            style={{ width: '47%', marginLeft: '3%' }}
            placeholder="-- 请选择 --"
            value={this.props.stockUnit}
            onChange={this.changeStockUnit}
          >
            {this.props.unitList.map(item => (
              <Select.Option key={item.value} value={item.unit}>
                {item.unit}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="售价(元)" require>
          <RadioGroup value={this.props.radioState} onChange={this.handleRadioChange}>
            <Radio value={RadioStates.uniformPrice}>统一价：</Radio>
            <Radio value={RadioStates.ladderPrice}>阶梯价：</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="建议零售价" require>
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            precision={2}
            maxLength={16}
            value={this.props.advisePrice}
            onChange={this.updateAdvisePrice}
          />
        </FormItem>
      </Col>
      <Col span={24} className={styles.goodsNormal}>
        <InputNumber
          style={{ width: '85%', marginLeft: '15%' }}
          disabled={this.props.uniformDisable}
          placeholder="请输入价格"
          min={0}
          precision={2}
          maxLength={16}
          value={this.props.currentPrice}
          onChange={this.changePrice}
        />
        <div className={styles['ladder-price']}>
          {this.props.stepPriceList.map((item, index) => (
            <div key={item.id} className={styles['ladder-price-item']}>
              {index === 0 && (
                <InputNumber
                  style={{ width: '30%' }}
                  placeholder="起订量"
                  disabled={this.props.ladderDisable}
                  min={0}
                  precision={0}
                  maxLength={9}
                  value={this.props.minOrder}
                  onChange={this.changeMinOrder}
                />
              )}
              {index === 1 && (
                <InputNumber
                  style={{ width: '30%' }}
                  disabled={this.props.ladderDisable}
                  min={0}
                  precision={0}
                  maxLength={9}
                  value={item.minArea}
                  onChange={this.changeMinArea(item)}
                />
              )}
              {index === 2 && <span style={{ width: '30%', textAlign: 'right' }}>超过</span>}
              <span>~</span>
              <InputNumber
                style={{ width: '30%' }}
                disabled={this.props.ladderDisable}
                min={0}
                precision={0}
                maxLength={9}
                value={index === 2 ? item.minArea : item.maxArea}
                onChange={index === 2 ? this.changeMinArea(item) : this.changeMaxArea(item)}
              />
              <InputNumber
                style={{ width: '30%', marginLeft: '10px' }}
                disabled={this.props.ladderDisable}
                placeholder="价格"
                min={0}
                precision={2}
                maxLength={16}
                value={item.areaPrice}
                onChange={this.changeAreaPrice(item)}
              />
            </div>
          ))}
        </div>
      </Col>
      <Col md={12} span={24} className={styles.goodsNormal}>
        <FormItem label="运费模板" require>
          <Select
            style={{ width: '100%' }}
            placeholder="-- 请选择 --"
            value={this.props.freight}
            onChange={this.changeFreightId}
          >
            {this.props.freightList.map(item => (
              <Select.Option key={item.templateId} value={item.templateId}>
                {item.templateName}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
    </Row>
  );

  renderSpecification = () => (
    <>
      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="下单规格" require>
            <></>
          </FormItem>
        </Col>
      </Row>
      <Row className={styles['specification-detail']}>
        <div className={styles['specification-item']}>
          <div
            style={{
              width: '30%',
              marginLeft: '2%',
            }}
          >
            <LInput
              max={20}
              placeholder="规格参数一的名称"
              value={this.props.specificationOne}
              onChange={this.changeSpecificationOne}
            />
          </div>
          <span style={{ marginLeft: '5px', marginTop: '5px' }}>:</span>
          <div className={styles['specification-item-detail']}>
            {this.props.specificationParamsOne.map(item => (
              <div key={item.id} className={styles.item}>
                <LInput
                  max={20}
                  after={this.props.specificationParamsOne.length > 1}
                  addonAfter={
                    this.props.specificationParamsOne.length !== 1 ? (
                      <span
                        style={{ color: 'red' }}
                        onClick={() => this.deleteSpecificationParamsOne(item)}
                      >
                        删除
                      </span>
                    ) : null
                  }
                  key={item.id}
                  style={{ width: '220px', marginLeft: '10px' }}
                  placeholder="请填写规格参数"
                  value={item.paramValue}
                  onChange={this.changeSpecificationParamsOneValue(item.id)}
                />
                {this.props.specPictuer ? (
                  <div style={{ marginTop: '10px' }}>
                    <ImageView
                      size={100}
                      crop
                      images={item.images}
                      onChange={images => this.updateSpecPictuerValue(images, item)}
                      total={1}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
          <div className={styles['add-params-item']}>
            {this.props.specificationParamsOne.length !== 10 ? (
              <Button className={styles['add-button']} onClick={this.addSpecificationParamsOne}>
                添加参数
              </Button>
            ) : null}
            <Checkbox
              style={{ marginLeft: '10px' }}
              checked={this.props.specPictuer}
              onChange={this.changeSpecPictuer}
            >
              规格图片
            </Checkbox>
          </div>
        </div>

        <div className={styles['specification-item']} style={{ marginTop: '10px' }}>
          <div
            style={{
              width: '30%',
              marginLeft: '2%',
            }}
          >
            <LInput
              max={20}
              placeholder="规格参数二的名称"
              value={this.props.specificationTwo}
              onChange={this.changeSpecificationTwo}
            />
          </div>
          <span style={{ marginLeft: '5px', marginTop: '5px' }}>:</span>
          <div className={styles['specification-item-detail']}>
            {this.props.specificationParamsTwo.map(item => (
              <div key={item.id} className={styles.item}>
                <LInput
                  max={20}
                  after={this.props.specificationParamsTwo.length > 1}
                  addonAfter={
                    this.props.specificationParamsTwo.length !== 1 ? (
                      <span
                        style={{ color: 'red' }}
                        onClick={() => this.deleteSpecificationParamsTwo(item)}
                      >
                        删除
                      </span>
                    ) : null
                  }
                  style={{ width: '220px', marginLeft: '10px' }}
                  placeholder="请填写规格参数"
                  value={item.paramValue}
                  onChange={this.changeSpecificationParamsTwoValue(item.id)}
                />
              </div>
            ))}
          </div>
          <div className={styles['add-params-item']}>
            {this.props.specificationParamsTwo.length !== 10 ? (
              <Button className={styles['add-button']} onClick={this.addSpecificationParamsTwo}>
                添加参数
              </Button>
            ) : null}
          </div>
        </div>
        <div className={styles['specification-item']} style={{ marginTop: '10px' }}>
          <div
            style={{
              width: '30%',
              marginLeft: '2%',
            }}
          >
            <LInput
              max={20}
              placeholder="规格参数三的名称"
              value={this.props.specificationThree}
              onChange={this.changeSpecificationThree}
            />
          </div>

          <span style={{ marginLeft: '5px', marginTop: '5px' }}>:</span>
          <div className={styles['specification-item-detail']}>
            {this.props.specificationParamsThree.map(item => (
              <div key={item.id} className={styles.item}>
                <LInput
                  max={20}
                  after={this.props.specificationParamsThree.length > 1}
                  addonAfter={
                    this.props.specificationParamsThree.length !== 1 ? (
                      <span
                        style={{ color: 'red' }}
                        onClick={() => this.deleteSpecificationParamsThree(item)}
                      >
                        删除
                      </span>
                    ) : null
                  }
                  style={{ width: '220px', marginLeft: '10px' }}
                  placeholder="请填写规格参数"
                  value={item.paramValue}
                  onChange={this.changeSpecificationParamsThreeValue(item.id)}
                />
              </div>
            ))}
          </div>
          <div className={styles['add-params-item']}>
            {this.props.specificationParamsThree.length !== 10 ? (
              <Button className={styles['add-button']} onClick={this.addSpecificationParamsThree}>
                添加参数
              </Button>
            ) : null}
          </div>
        </div>
      </Row>

      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="展示参数" require>
            <></>
          </FormItem>
        </Col>
      </Row>

      <Row>
        {this.props.showList.map((item, index) => (
          <Col key={item.id} md={12} span={24} className={styles.specification}>
            <div
              className={styles['specification-item']}
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <div style={{ width: '28%', marginLeft: '8%' }}>
                <LInput
                  max={20}
                  placeholder="参数名称"
                  value={item.paramName}
                  onChange={this.changeParamsName(item.id)}
                />
              </div>
              <span style={{ marginLeft: '1%', marginTop: '1%' }}>:</span>
              <div style={{ width: '28%', marginLeft: '1%' }}>
                <LInput
                  max={20}
                  placeholder="参数值"
                  value={item.paramValue}
                  onChange={this.changeParamsValue(item.id)}
                />
              </div>
              {this.props.showList.length === 1 ? (
                <div
                  style={{ display: 'flex', flexDirection: 'row', marginLeft: '1%', width: '10%' }}
                >
                  <Button
                    style={{ fontSize: '0.875em', marginLeft: '1%' }}
                    onClick={this.addParamsItem}
                  >
                    添加参数
                  </Button>
                </div>
              ) : (
                <>
                  {index === this.props.showList.length - 1 ? (
                    <>
                      {index !== 4 ? (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginLeft: '1%',
                            width: '10%',
                          }}
                        >
                          <Button
                            style={{ fontSize: '0.875em', marginRight: '1%' }}
                            onClick={() => this.deleteParams(item)}
                          >
                            删除参数
                          </Button>
                          <Button
                            style={{ fontSize: '0.875em', marginLeft: '1%' }}
                            onClick={this.addParamsItem}
                          >
                            添加参数
                          </Button>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginLeft: '1%',
                            width: '10%',
                          }}
                        >
                          <Button
                            style={{ fontSize: '0.875em', marginRight: '1%' }}
                            onClick={() => this.deleteParams(item)}
                          >
                            删除参数
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: '1%',
                        width: '10%',
                      }}
                    >
                      <Button
                        style={{ fontSize: '0.875em', marginRight: '1%' }}
                        onClick={() => this.deleteParams(item)}
                      >
                        删除参数
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );

  renderGoodsDetail = () => (
    <>
      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="轮播图" require>
            <></>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} push={1} className={styles.specification}>
          <ImageView
            fixed="800x800"
            images={this.props.carouselList}
            onChange={images => this.updateCarouselList(images)}
            total={5}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} push={1} className={styles.specification}>
          <span>**说明：建议宽度800*高度800px</span>
        </Col>
      </Row>

      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="详情图" require>
            <></>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={20} push={1} className={styles.specification}>
          <UEditor onReady={this.onReady()} ref={this.attachEditor} />
        </Col>
      </Row>

      <Row>
        <Col md={12} span={24} className={styles.specification}>
          <FormItem label="封面图" require>
            <></>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24} push={1} className={styles.specification}>
          <ImageView
            fixed="710x316"
            images={this.props.coverImages}
            onChange={images => this.updateCoverImages(images)}
            total={1}
          />
        </Col>
      </Row>
    </>
  );

  renderShelvesSet = () => (
    <>
      <Row>
        <Col pull={4} span={24} className={styles['shelves-set']}>
          <FormItem label="上架位置">
            <div>觅货APP</div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col pull={4} span={24} className={styles['shelves-set']}>
          <FormItem label="上架标签">
            <div>
              {this.props.labels.map(it => (
                <Checkbox key={it.name} checked={it.checked} onChange={this.updateLabels(it.name)}>
                  {it.name}
                </Checkbox>
              ))}
            </div>
          </FormItem>
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
    const { isAdd } = this.props;
    return (
      <Card className={styles.container}>
        {isAdd ? (
          <div className={styles.title}>新建商品</div>
        ) : (
          <div className={styles.title}>编辑商品</div>
        )}

        {this.renderHeader('基本信息')}
        {this.renderGoodsNormalDetail()}
        {this.renderHeader('规格及详情')}
        {this.renderSpecification()}
        {this.renderHeader('商品詳情')}
        {this.renderGoodsDetail()}
        {this.renderHeader('上架设置')}
        {this.renderShelvesSet()}
        <div className={styles.buttons}>
          <Button type="primary" className={styles.btn} onClick={() => this.saveGoods(3)}>
            保存并上架
          </Button>
          <Button type="primary" className={styles.btn} onClick={() => this.saveGoods(0)}>
            保存暂不上架
          </Button>
          {!isAdd ? (
            <Button type="danger" className={styles.btn} onClick={() => this.onClickDelete()}>
              删除
            </Button>
          ) : null}
          <Button className={styles.btn} onClick={() => this.props.history.push('/center/brandcenter/commodity')}>
            返回
          </Button>
        </div>
      </Card>
    );
  }
}

export default Page;
