import React, { Fragment } from 'react';
import IScroll from 'iscroll/build/iscroll-probe';
import styles from './style.less';

export default class CheckAbleList extends React.PureComponent {
    componentDidUpdate() {
        this.scrollerUpdate();
    }

    checked = item => {
        const { onChange = () => {}, multiple = false } = this.props;
        if (!multiple && item.checked) {
            // 单选 不支持重复点击
            return;
        }
        const { data } = this.props;
        const values = [];
        const newData = data.map(it => {
            const newItem = { ...it };
            if (!multiple) {
                // 单选 其他置为false
                newItem.checked = false;
                if (newItem.value === item.value) {
                    newItem.checked = true;
                }
                if (newItem.checked) {
                    values.push(newItem.value);
                }
            } else {
                // 多选重复点击 取反
                if (newItem.value === item.value) {
                    newItem.checked = !it.checked;
                }
                if (newItem.checked) {
                    values.push(newItem.value);
                }
            }
            return newItem;
        });
        onChange(multiple ? values : values[0], newData);
    }

    scrollerUpdate = () => {
        // this.scroller.style.width = `${this.scroller.scrollWidth}px`;
        if (this.iscroll) {
            this.iscroll.refresh();
        }
    }

    scrollerMount = ele => {
        const { scrollAble = true } = this.props;
        if (!ele || !scrollAble) {
            // 没有数据时
            return;
        }
        this.scroller = ele;
        const is = new IScroll(this.scroller.parentElement, {
            probeType: 2,
            mouseWheel: true, // 鼠标滚轮支持
            scrollbars: false, // 滚动条支持
            scrollY: false, // 滚动方向（垂直）
            scrollX: true, // 滚动方向（水平
            bounce: true, // 边界时的反弹动画，默认true
            click: true, // IScroll默认禁止了点击事件，如需绑定点击事件，请将该参数值设为true
            freeScroll: true, // 当需要执行两个纬度上的滚动时（即横向、纵向都开启），设置该参数，默认为false
            startX: 0, // 滚动条开始的位置（横坐标）
            startY: 0, // 滚动条开始的位置（纵坐标）
            tap: true, // 设置为true时，允许为用户点击或者触摸（并没有滚动时）触发一个自定义事件，或者设置值为一个自定义事件名称的字符串
            snap: true, // 对齐（根据元素li对齐切割整个容器）没有li 元素则会报错。。。
        });
        this.iscroll = is;
        const that = this;
        is.on('scroll', function cb () {
            if (this.x >= 0) {
                that.scroller.parentElement.classList.add(styles.atLeft);
            } else {
                ele.parentElement.classList.remove(styles.atLeft);
            }
            if (this.x <= ele.parentElement.clientWidth - ele.scrollWidth) {
                ele.parentElement.classList.add(styles.atRight);
            } else {
                ele.parentElement.classList.remove(styles.atRight);
            }
        })
    }

    render() {
        const { props } = this;
        const { data = [], scrollAble = true, useDiliver = false, style = {}, className = '', itemClassName = '', itemStyle = {}, checkedClassName = '' } = props;
        return (
            <div
                className={`${styles.container} ${className || ''} ${styles.atLeft}`}
                style={{ ...style }}
            >
                <ul
                    ref={this.scrollerMount}
                    className={`${styles.CheckAbleList} ${props.className || ''}`}
                    style={{ position: scrollAble ? '' : 'static' }}
                >
                    {
                        data.map((item, index) => {
                            if (useDiliver) {
                                return (
                                    <Fragment key={`${item.value}_frag`}>
                                        <li
                                            key={`${item.value}`}
                                            style={{ ...itemStyle }}
                                            className={`${styles.item} ${item.checked ? (checkedClassName || styles.checked) : ''} ${itemClassName}`}
                                            onClick={() => this.checked(item, props)}
                                        >
                                            {item.text}
                                        </li>
                                        {
                                            index + 1 < data.length && <li key={`${item.value}_line`} className={styles.diliver} />
                                        }
                                    </Fragment>
                                )
                            }
                            return <li key={`${item.value}`} style={{ ...itemStyle }} className={`${styles.item} ${item.checked ? (checkedClassName || styles.checked) : ''} ${itemClassName}`} onClick={() => this.checked(item, props)}>{item.text}</li>;
                        })
                    }
                </ul>
            </div>
        )
    }
}
