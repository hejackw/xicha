import React, { Component } from 'react'
import {getAllOrderAction} from '../../../store/modules/order'
import {connect} from 'react-redux'

class Order extends Component {
    constructor(props) {
        super(props);
        props.cacheLifecycles.didRecover(this.componentDidRecover)
    }
    
    render() {
        return (
            <div className="page" id="order">
                <h1>订单</h1>
            </div>
        )
    }

    componentDidMount(){
        //查询所有订单
        console.log('查询所有订单');
        this.props.requestAllOrder();
    }

    componentDidRecover = ()=>{
        // 更新所有订单
        console.log('更新所有订单');
        this.props.requestAllOrder();

    }



    
}


const mapStateToProps = (state, props)=>({
    
})

const mapDispatchToProps = (dispatch, props)=>({
    // 请求得到所有的订单
    requestAllOrder(){
        let action = getAllOrderAction();
        dispatch(action);
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Order);