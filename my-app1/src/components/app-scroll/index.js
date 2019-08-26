import React, { Component } from 'react'
import BScroll from 'better-scroll'
import './style.scss'

export default class AppScroll extends Component {

    wrapper = React.createRef();

    render() {
        return (
            <div className={"scroll-wrapper " + this.props.className} ref={this.wrapper}>
              <div className="scroll-content">
                  {this.props.children}
              </div>  
            </div>
        )
    }
    componentDidMount(){
        let scroll = this.scrollView = new BScroll(this.wrapper.current, {
            probeType: this.props.onScroll?3:1
        });
        // 在用户需要滚动前及时更新滚动视图
        scroll.on('beforeScrollStart', ()=>{
            scroll.refresh();
        })

        // 需要监听滚动事件才执行
        if(this.props.onScroll){
            scroll.on('scroll', ()=>{
                this.props.onScroll(scroll.y);
            })
        }
    }

    // 让结构滚动到对应的位置
    scrollTo(y){
        if(y < this.scrollView.maxScrollY){
            y = this.scrollView.maxScrollY;
        }
        this.scrollView.scrollTo(0, y, 200);
    }
}
