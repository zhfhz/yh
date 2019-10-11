import React from 'react';
import { connect } from 'dva';
import DesignExhibit from '@/components/DesignExhibit';
import BaseCatelogPage from '@/pages/BaseCatelogPage';

@connect(({ production }) => production)
class Page extends BaseCatelogPage {
  namespace = 'production';

  renderDataList = dataList => <DesignExhibit data={dataList} />;
}

export default Page;
