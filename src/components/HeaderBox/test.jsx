import React from 'react';
import { connect } from 'dva';

// const HeaderBox = props => {
//   console.log(config.routes);
//   const { type } = props;
//   const pageName = ''; // 如果是菜单状态则显示pageName
//   if (type === 1) {
//     // 如果是携带参数
//   }
// };
@connect(({ settings }) => ({ settings }))
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.sate = {};
  }

  render() {
    return <div>1212</div>;
  }
}
export default Test;
