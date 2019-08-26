import React, { Component, createRef } from "react";

export default class Banner extends Component {
 
  container  = createRef();
  
  render() {
    console.log('banner render...');

    return (
      <div className="banner swiper-container" ref={this.container}>
        <div className="swiper-wrapper">
        {
            this.props.data.map(item=>(
                <div className="swiper-slide"
                    key={item.id}>
                    <img src={item.imgPath} alt=""/>
                </div>
            ))
        }
        </div>
        <div className="swiper-pagination" />
      </div>
    );
  }

  componentDidMount() {
    // 构建轮播图
    this.swiper = new window.Swiper(this.container.current, {
        pagination: '.swiper-pagination',
        loop: true
    });
  }

  componentDidUpdate(oldProps) {
    if(this.props.data !== oldProps.data){
        //data数据的变化，导致dom更新
        // 更新轮播图
        this.swiper.update();
        this.swiper.reLoop();
        this.swiper.slideTo(1, 0);
    }
  }
  
}
