import React, { Component } from 'react';
import { connect } from 'dva';
import First from './First';
import { SecondType } from '../../service';
import Second from './Second';

@connect(({ registerComplete }) => registerComplete)
class StepSecondFactory extends Component {
  render() {
    const { secondStatus } = this.props;
    return (
      <div>
        {
          secondStatus === SecondType.First ? <First /> : <Second />
        }
      </div>
    );
  }
}

export default StepSecondFactory;
