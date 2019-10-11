import React from 'react';
import { connect } from 'dva';
import DesignerExhibit from '@/components/DesignerExhibit';
import BaseCatelogPage from '@/pages/BaseCatelogPage';

@connect(({ designer, loading }) => ({ ...designer, followLoading: loading.effects['designer/follow'] }))
class Page extends BaseCatelogPage {
  namespace = 'designer';

  renderDataList = dataList => {
    const { dispatch, followLoading } = this.props;
    return <DesignerExhibit data={dataList} onFollowBtnClick={(id, isFollow) => {
      if (followLoading) {
        return dispatch();
      }
      return dispatch({
        type: 'user/follow',
        userId: id,
        isFollow,
      })
    }} />;
  };
}

export default Page;
