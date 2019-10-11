import React, { Component } from 'react';

import { Icon } from 'antd';
import styles from './index.less';

const STATUS_INIT = 0; // 初始状态
const STATUS_READY = 1; // 鼠标按下，开始滑动状态
const STATUS_SUCCESS = 2; // 验证成功

const INFO_INIT = '请按住滑块，拖动到最右边';
const INFO_SUCCESS = '验证通过';

export default class SidlerValiation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startX: 0,
            currX: 0,
            status: STATUS_INIT,
            info: INFO_INIT,
            transition: '',
            color: '',
        }
    }

    onMoveStart = e => {
        if (this.state.status === STATUS_INIT) {
            this.setState({ startX: e.clientX, status: STATUS_READY, transition: '' });
        }
    }

    onMoveEnd = () => {
        if (this.state.status === STATUS_SUCCESS) {
            this.setState({ info: INFO_SUCCESS, bkcolor: '#7AC23D', color: '#fff' });
            if (this.props.onSuccess) {
                this.props.onSuccess();
            }
        } else {
            this.setState({ currX: 0, status: STATUS_INIT, transition: 'left 1s ease' });
        }
    }

    onMoving = e => {
        if (this.state.status === STATUS_READY) {
            const distance = e.clientX - this.state.startX;
            const max = 394 - 32;
            let position = 0;
            if (distance >= max) {
                position = max;
            } else if (distance <= 0) {
                position = 0;
            } else {
                position = distance;
            }
            this.setState({
                currX: position,
                status: distance >= max ? STATUS_SUCCESS : STATUS_READY,
            })
        }
    }

    render() {
        return <div className={styles.drag}
            onMouseMove={this.onMoving}
            onMouseLeave={this.onMoveEnd}
            style={{
                backgroundColor: this.state.bkcolor,
                color: this.state.color,
            }} >
            <div className={styles.bg}></div>
            <div className={styles.text}>{this.state.info}</div>
            <div onMouseDown={this.onMoveStart}
                onMouseUp={this.onMoveEnd}
                className={styles.btn}
                style={{ left: `${this.state.currX}px`, transition: this.state.transition }}>
                {this.state.status === STATUS_SUCCESS ? <Icon type="check-circle" theme="twoTone" twoToneColor="#7AC23D" /> : '|||'}
            </div>
        </div>
    }
}
