import _ from 'lodash';
import uuid from 'uuid/v1';
import request from '@/utils/request';
import { displayFen } from '@/utils/utils';

export const RadioStates = {
  /**
   * 统一价
   */
  get uniformPrice() { return 2; },
  /**
   * 阶梯价
   */
  get ladderPrice() { return 1; },
};

export function getCategoryA() {
  return request('/gms/commodity/categoryA');
}

export function getCategoryB(params) {
  return request('/gms/commodity/categoryB', { method: 'get', params });
}

export function getFreightList() {
  return request('/sys/freight/freightTemplate', { method: 'get' });
}

export function saveGoodsInfo(isAdd, params) {
  if (!isAdd) {
    return request('/gms/info/goodsInfo', { method: 'put', data: params });
  }
  return request('/gms/info/goodsInfo', { method: 'post', data: params });
}

export function getCardList() {
  return request('/rcequitycard/card/0');
}

export function deleteGoods(goodsId) {
  return request(`/gms/info/goodsInfo/${goodsId}`, { method: 'delete' });
}

// 获取商品详情
export function getGoodsInfo(params) {
  return request(`/gms/info/goodsinfo/${params.id}/1.2`);
}

export function getBannerList(params) {
  return request(`/gms/picture/carousel/${params.goodsId}`);
}

export function getPictureDetail(params) {
  return request(`/gms/picture/details/${params.goodsId}`);
}

export function getLabels(params) {
  return request(`/gms/upper/labels/${params.goodsId}`);
}

export function getSpecsDetail(params) {
  return request(`/gms/specs/details/${params.goodsId}`);
}

export function getSellingPoint(data) {
  const newList = [];
  data.sellingPoints.forEach(it => {
    if (it.sellingPoint !== '') {
      newList.push(it);
    }
  });
  const sellingPoint = _.join(newList.map(it => (it.sellingPoint)), '|');
  return sellingPoint;
}

export function getSpecsList(data) {
  const newSpecsList = [];
  if (data.specificationOne.length > 0) {
    newSpecsList.push(
      {
        paramName: data.specificationOne,
        valueList: data.specificationParamsOne.map((it, index) =>
          (
            it.images && it.images.length > 0
              ?
              ({
                paramValue: it.paramValue,
                picture: it.images[0].server,
                valueSort: index + 1,
              })
              :
              ({
                paramValue: it.paramValue,
                valueSort: index + 1,
              })
          )),
      },
    );
  }

  if (data.specificationTwo.length > 0) {
    newSpecsList.push(
      {
        paramName: data.specificationTwo,
        valueList: data.specificationParamsTwo.map((it, index) => (
          {
            paramValue: it.paramValue,
            valueSort: index + 1,
          }
        )),
      },
    );
  }
  if (data.specificationThree.length > 0) {
    newSpecsList.push(
      {
        paramName: data.specificationThree,
        valueList: data.specificationParamsThree.map((it, index) => (
          {
            paramValue: it.paramValue,
            valueSort: index + 1,
          }
        )),
      },
    );
  }
  const list = newSpecsList.map((it, index) => (
    { ...it, keySort: index + 1 }
  ));
  return list;
}

export function conversionSpecsList(data) {
  const newSpecsList = data.data.specsList;
  let specificationOne;
  let specificationParamsOne;
  let specificationTwo;
  let specificationParamsTwo;
  let specificationThree;
  let specificationParamsThree;

  newSpecsList.forEach(it => {
    if (it.keySort === 1) {
      specificationOne = it.paramName;
      specificationParamsOne = it.valueList.map(item => (
        { ...item, id: uuid(), images: item.picture ? [{ id: uuid(), server: item.picture }] : [] }
      ));
    }

    if (it.keySort === 2) {
      specificationTwo = it.paramName;
      specificationParamsTwo = it.valueList.map(item => (
        { ...item, id: uuid() }
      ));
    }

    if (it.keySort === 3) {
      specificationThree = it.paramName;
      specificationParamsThree = it.valueList.map(item => (
        { ...item, id: uuid() }
      ));
    }
  });

  return {
    specificationOne,
    specificationParamsOne,
    specificationTwo,
    specificationParamsTwo,
    specificationThree,
    specificationParamsThree,
  };
}

export function getCarouselList(data) {
  const carouselList = data.carouselList.map(it => ({ picture: it.server }));
  return carouselList;
}
export function getDetailPicList(data) {
  const detailPicList = data.detailPicList.map(it => ({ picture: it.server }));
  return detailPicList;
}

export function getCoverImage(data) {
  const coverImage = data.coverImages[0].server;
  return coverImage;
}


export function conversionLabels(data) {
  const newList = data.lablesList;
  if (newList && newList.length === 0) {
    return data.labels;
  }
  data.labels.forEach(it => {
    newList.forEach(item => {
      if (it.name === item.tagValue) {
        it.checked = true;
      }
    });
  });
  return data.labels;
}

export function conversionChannelList(data) {
  let TmallPrice = '';
  let JDPrice = '';
  let amazonPrice = '';

  data.channelList.forEach(it => {
    if (it.channelName === '天猫') {
      TmallPrice = it.channelPrice;
    } else if (it.channelName === '京东') {
      JDPrice = it.channelPrice;
    } else {
      amazonPrice = it.channelPrice;
    }
  });
  return { TmallPrice, JDPrice, amazonPrice };
}

export function conversionCards(data) {
  const cardList = data.cardIdList;
  if (cardList && cardList.length === 0) {
    return data.data;
  }
  const cardResultList = data.data.map(it => ({
    ...it,
    checked: false,
  }
  ));
  cardResultList.forEach(it => {
    cardList.forEach(item => {
      if (it.cardId === item.cardId) {
        it.checked = true;
      }
    });
  });
  return cardResultList;
}

export function conversionStepPrice(data) {
  const ladderOne = data.stepPriceList[0];
  const ladderTwo = data.stepPriceList[1];
  const ladderThree = data.stepPriceList[2];
  const list = [];
  list.push(
    { minArea: data.minOrder, maxArea: ladderOne.maxArea, areaPrice: displayFen(ladderOne.areaPrice) },
  );
  if (ladderTwo.minArea > 0 && ladderTwo.maxArea > 0 && ladderTwo.areaPrice > 0) {
    list.push(
      { minArea: ladderTwo.minArea, maxArea: ladderTwo.maxArea, areaPrice: displayFen(ladderTwo.areaPrice) },
    );
  }
  list.push(
    { minArea: ladderThree.minArea, maxArea: -1, areaPrice: displayFen(ladderThree.areaPrice) },
  );
  return list;
}
