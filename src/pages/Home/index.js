import React, { Component } from 'react';
import { Carousel, Divider, Button } from 'antd';
import Slider from 'react-slick';
import { connect } from 'dva';
import styles from './style.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import approve from '../../assets/approve.png';
import see from '../../assets/see.png';
import group from '../../assets/group.png';
import left from '../../assets/left.png';
import right from '../../assets/right.png';

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: 'block', backgroundImage: `url(${right})` }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', backgroundImage: `url(${left})` }}
      onClick={onClick}
    />
  );
}


@connect(({ home }) => home)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetch',
    });
  }

  getBanner = () => (<Carousel autoplay>
    <div>
      <img className={styles.bannerimg} src="http://img2.imgtn.bdimg.com/it/u=1448432396,1010911080&fm=15&gp=0.jpg" alt="图片" />
    </div>
    <div>
      <img className={styles.bannerimg} src="http://img1.imgtn.bdimg.com/it/u=1943570998,1092116247&fm=26&gp=0.jpg" alt="图片" />
    </div>
    <div>
      <img className={styles.bannerimg} src="http://img0.imgtn.bdimg.com/it/u=1619346556,3954640182&fm=26&gp=0.jpg" alt="图片" />
    </div>
    <div>
      <img className={styles.bannerimg} src="http://img4.imgtn.bdimg.com/it/u=1494267558,4097223248&fm=26&gp=0.jpg" alt="图片" />
    </div>
  </Carousel>);

  getTop = title => (<div className={styles.top}>
    <span className={styles.wrapper}>
      <span className={styles.react} />
      <span className={styles.title}>
        {title}
      </span>
    </span>
    <span className={styles.more}>
      查看全部 》
    </span>
  </div>);

  getProject = () => (<div className={styles.boxitem}>
    <img className={styles.img} alt="ds" src="https://img.ivsky.com/img/tupian/pre/201712/30/mianbaoji.jpg" />
    <div className={styles.bottom}>
      <div className={styles.projecttitle}>
        <span>打底裙针织浪漫拼接</span>
      </div>
      <div className={styles.approve}>
        <img src={see} alt="图片" />
        <span>456687</span>
        <img src={approve} alt="图片" />
        <span>456687</span>
      </div>
    </div>
  </div>);

  getProject1 = () => (<div className={styles.boxitem1}>
    <img className={styles.img} alt="ds" src="https://img.ivsky.com/img/tupian/pre/201712/30/mianbaoji-008.jpg" />
    <div className={styles.bottom}>
      <div className={styles.projecttitle}>
        <span>打底裙针织浪漫拼接</span>
      </div>
      <div className={styles.approve}>
        <span>
          <img src={see} alt="图片" />
          <span>456687</span>
        </span>
        <span>
          <img src={approve} alt="图片" />
          <span>456687</span>
        </span>
      </div>
    </div>
  </div>);

  getDesigner = () => (
    <div className={styles.boxitem2}>
      <img className={styles.img} alt="ds" src="http://img5.imgtn.bdimg.com/it/u=2538919758,3244052907&fm=26&gp=0.jpg" />
      <div className={styles.bottom}>
        <div className={styles.projecttitle}>
          <span className={styles.name}>飞轮marke</span>
          <span>江苏 南京</span>
        </div>
        <div className={styles.approve}>
          <span>作品</span>
          <span className={styles.count}>50</span>
          <Divider type="vertical" />
          <span>粉丝</span>
          <span className={styles.count}>456687</span>
        </div>
      </div>
    </div>);

  getDesigner1 = () => (
    <div className={styles.boxitem3}>
      <img className={styles.img} alt="ds" src="http://img1.imgtn.bdimg.com/it/u=31996781,2504318012&fm=11&gp=0.jpg" />
      <div className={styles.bottom}>
        <div className={styles.projecttitle}>
          <span className={styles.name}>飞轮marke</span>
          <span>江苏 南京</span>
        </div>
        <div className={styles.approve}>
          <span>作品</span>
          <span className={styles.count}>50</span>
          <Divider type="vertical" />
          <span>粉丝</span>
          <span className={styles.count}>456687</span>
        </div>
      </div>
    </div>);

  getWorkItem1 = () => (<div className={styles.workitem1}>
    <div className={styles.left}>
      <span>电子产品</span>
      <span>设计馆</span>
      <span>青春时尚炫酷</span>
      <Button>点击进入》</Button>
    </div>
    <div className={styles.right}>
      <img src="http://img1.imgtn.bdimg.com/it/u=1084281764,979856447&fm=26&gp=0.jpg" alt="dd" />
      <div className={styles.bottom}>
        <span className={styles.name}>笔记本外观设计合金材质酷感十足</span>
        <div className={styles.details}>
          <span className={styles.bottom1}>
            <img src={group} alt="图片" />
            <span>DesignLabS设计师</span>
          </span>
          <span className={styles.bottom2}>
            <img src={see} alt="图片" />
            <span>456687</span>
            <Divider type="vertical" />
            <img src={approve} alt="图片" />
            <span>456687</span>
          </span>
        </div>
      </div>
    </div>
    <div className={styles.top} />
  </div>
  );

  getWorkItem2 = () => (<div className={styles.workitem2}>
    <img className={styles.image} src="http://img5.imgtn.bdimg.com/it/u=273704878,1418324491&fm=26&gp=0.jpg" alt="图片" />
    <div className={styles.name}>
      <div className={styles.title}>256G内存青春版</div>
      <div className={styles.subtitle}>
        <img src={group} alt="图片" />
        <span>绿野仙踪</span>
      </div>
    </div>
    <div className={styles.approve}>
      <img src={see} alt="图片" />
      <span>456687</span>
      <Divider type="vertical" />
      <img src={approve} alt="图片" />
      <span>456687</span>
    </div>
  </div>);

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 3,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className={styles.container}>
        <div className={styles.banner}>
          {this.getBanner()}
        </div>
        <div className={styles.banner1}>
          <div className={styles.box}><img src="http://img5.imgtn.bdimg.com/it/u=1971670649,1880652780&fm=26&gp=0.jpg" alt="图片" /></div>
          <div className={styles.box}><img src="http://img0.imgtn.bdimg.com/it/u=1742773735,3289357581&fm=26&gp=0.jpg" alt="图片" /></div>
          <div className={styles.box}><img src="http://img3.imgtn.bdimg.com/it/u=273677098,1332739031&fm=11&gp=0.jpg" alt="图片" /></div>
        </div>
        <div className={styles.contents}>
          <div className={styles.left}>
            {this.getTop('作品推荐')}
            <div className={styles.projects}>
              {this.getProject()}
              {this.getProject()}
              {this.getProject1()}
              {this.getProject1()}
              {this.getProject1()}
              {this.getProject1()}
              {this.getProject1()}
              {this.getProject1()}
            </div>
          </div>
          <div className={styles.right}>
            {this.getTop('热门设计师')}
            <div className={styles.wrapper1}>
              <div className={styles.wrapper2}>
                {this.getDesigner()}
                <div className={styles.boxwrapper}>
                  {this.getDesigner1()}
                  {this.getDesigner1()}
                </div>
              </div>
              <div className={styles.wrapper3}>
                {this.getDesigner1()}
                {this.getDesigner1()}
                {this.getDesigner1()}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.factories}>
          <Slider {...settings}>
            <div className={styles.factory}>
              <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4252895693,862761728&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3464350695,3273071783&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
            <div className={styles.factory}>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=303941484,3054995815&fm=26&gp=0.jpg" alt="图片" />
              <span>都市智造线上工厂</span>
            </div>
          </Slider>
        </div>
        <div className={styles.works}>
          <div className={styles.workCate}>
            {this.getWorkItem1()}
            {this.getWorkItem2()}
            {this.getWorkItem2()}
          </div>
          <div className={styles.workCate}>
            {this.getWorkItem2()}
            {this.getWorkItem2()}
            {this.getWorkItem2()}
            {this.getWorkItem2()}
            {this.getWorkItem2()}
          </div>
        </div>
        <div className={styles.works}>
          <div className={styles.workCate}>
            {this.getWorkItem1()}
            {this.getWorkItem2()}
            {this.getWorkItem2()}
          </div>
          <div className={styles.workCate}>
            {this.getWorkItem2()}
            {this.getWorkItem2()}
            {this.getWorkItem2()}
            {this.getWorkItem2()}
            {this.getWorkItem2()}
          </div>
        </div>
      </div >
    );
  }
}

export default Page;
