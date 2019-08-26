import React, { Component } from "react";
import { connect } from "react-redux";
import { modifyTeaAction, deleteTeaAction } from "../../../../store/modules/cart";

class CartItem extends Component {
  item = React.createRef();

  render() {
    let {data, handleTeaCount, deleteTea} = this.props;
    return (
      <div className="cart-item-wrap">
        <div className="delete-btn iconfont icon-lajixiang" onClick={()=>deleteTea(data.id)} />

        <div ref={this.item} className="cart-item border-bottom">
          <div className="left">
            <img src={data.imageUrl} alt="" />
          </div>
          <div className="center">
            <h3 className="title">{data.name}</h3>
          </div>
          <div className="right">
            <p className="price">¥{data.price}</p>
            <div className="handle">
              <span
                className={"btn " + (data.count === 1 ? "disabled" : "")}
                onClick={() => {
                  data.count > 1 && handleTeaCount("reduce", data.id);
                }}
              >
                -
              </span>
              <span className="num">{data.count}</span>
              <span
                className="btn"
                onClick={() => handleTeaCount("add", data.id)}
              >
                +
              </span>
            </div>
          </div>
        </div>
      
      </div>
    );
  }

  componentDidMount(){
    // 给item添加拖拽
    this.addTrag();
  }

  addTrag = ()=>{
    //   给item添加拖拽事件
    let dom = this.item.current;
    let offsetX= 0;
    dom.addEventListener('touchstart', (ev)=>{
        // 获得起始位置
        let {clientX: startX} = ev.changedTouches[0];
        startX = startX  - offsetX;

        // 给dom删除过渡效果
        dom.className = 'cart-item border-bottom';

        const moveEvent = (ev)=>{
            // 获得手指移动时的当前的位置
            let {clientX} = ev.changedTouches[0];
            // 获得偏移量
            offsetX = clientX - startX;
            if(offsetX < 0 && offsetX >= -100){
                dom.style.left = offsetX + 'px';
            }
        };
        dom.addEventListener('touchmove', moveEvent);

        const endEvent = (ev)=>{
            // 给dom添加过渡效果
            dom.className = 'cart-item border-bottom active';

            if(offsetX <= -50){
                offsetX = -100;
                dom.style.left = '-100px';
            }else{
                offsetX = 0;
                dom.style.left = 0;
            }

            // 移除事件
            dom.removeEventListener('touchmove', moveEvent);
            dom.removeEventListener('touchend', endEvent);
        };
        dom.addEventListener('touchend', endEvent);
    })
  }

}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch, props) => ({
  // 操作购物车的数量
  handleTeaCount(flag, id) {
    let action = modifyTeaAction({ flag, id });
    dispatch(action);
  },
//   删除商品
  deleteTea(id){
      let action = deleteTeaAction({id});
        dispatch(action);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem);
