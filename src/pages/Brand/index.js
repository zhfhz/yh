import React from 'react';
import { connect } from 'dva';
import CompanyList from '@/components/CompanyList';
import BaseCatelogPage from '@/pages/BaseCatelogPage';

@connect(({ brand }) => brand)
class Page extends BaseCatelogPage {
  namespace = 'brand';

  renderDataList = dataList => <CompanyList data={dataList} />;
}

export default Page;
