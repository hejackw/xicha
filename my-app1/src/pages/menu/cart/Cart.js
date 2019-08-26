import React, { Component } from 'react'
import AppHeader from '../../../components/app-header'
import AppScroll from '../../../components/app-scroll'
import CartItem from './children/CartItem'
import './style.scss'
import { connect } from 'react-redux';
import {postOrderAction} from '../../../store/modules/order'

class Cart extends Component {
    render() {
        let leftBtn = <span className="header-left-btn iconfont icon-fanhui" onClick={this.backAction}></span>;
        
        let cartContent = (
            <AppScroll className="content">
                {
                    this.props.cartData.map(item=>(
                        <CartItem key={item.id} data={item}/>
                    ))
                }
            </AppScroll>
        );

        let tip = (
            <div className="content">先添加茶到购物车</div>
        )

        return (
            <div className="page subpage" id="cart">
                <AppHeader title="购物车" leftBtn={leftBtn}/>
                {
                    this.props.cartData.length > 0 ? cartContent : tip
                }
                <footer className="footer" onClick={this.confirmOrderAction}>
                    <h4 className="name">下单</h4>
                </footer>
            </div>
        )
    }

    backAction = ()=>{
        this.props.history.goBack();
    }

    // 下单的点击事件
    confirmOrderAction = ()=>{
        // 先登录，后购买
        this.props.confirmOrder(this.props.cartData);
        // 跳转页面
        this.props.history.push('/menu/cart/confirm');
    }
}

const mapStateToProps = (state, props)=>({
    cartData: state.cart
})

const mapDispatchToProps = (dispatch, props)=>({
    confirmOrder(list){
        let action = postOrderAction(list);
        dispatch(action);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);


