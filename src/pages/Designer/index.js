import React from 'react';
import { connect } from 'dva';
import DesignerExhibit from '@/components/DesignerExhibit';
import BaseCatelogPage from '@/pages/BaseCatelogPage';

@connect(({ designer, loading }) => ({ ...designer, followLoading: loading.effects['user/follow'] }))
class Page extends BaseCatelogPage {
  namespace = 'designer';

  toggleFollow = (id, isFollow) => {
    const { dispatch, followLoading } = this.props;
    if (followLoading) {
      return dispatch();
    }
    return dispatch({
      type: 'user/follow',
      userId: id,
      isFollow,
    })
  }

  renderDataList = dataList => <DesignerExhibit data={dataList} onFollowBtnClick={this.toggleFollow} />;
}

export default Page;
