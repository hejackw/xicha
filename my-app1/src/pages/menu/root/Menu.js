import React, { Component } from 'react'
import {requestMenuData} from '../../../store/modules/menu'
import { connect } from 'react-redux';
import MenuNav from './children/MenuNav'
import MenuList from './children/MenuList'
import AppHeader from '../../../components/app-header'
import './style.scss'

class Menu extends Component {
    state = {
        selectIndex: 0,
        flag: null
    };
    listDOM = React.createRef();

    render() {
        let {nav, list} = this.props;
        let {selectIndex} = this.state;
        let rightBtn = <span className="header-right-btn iconfont icon-caigou" onClick={this.goCartPage}></span>;
        return (
            <div className="page" id="menu">
                <AppHeader title="菜单" rightBtn={rightBtn}></AppHeader>
                <div className="page-content">
                    <MenuNav data={nav} selected={selectIndex} onChange={this.handleChange}/>
                    <MenuList data={list} onChange={this.handleChange} ref={this.listDOM}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        // 请求菜单数据
        this.props.getMenuData();
    }

    componentDidUpdate(oldProps, oldState){
        if((oldState.selectIndex !== this.state.selectIndex)
            &&
            this.state.flag === 'nav'
           ){
            //nav修改index才需要滚动，menu修改不需要滚动， 让滚动视图到对应的菜单
            this.listDOM.current.scrollToIndex(this.state.selectIndex);
        }
    }

    // 修改选中的菜单按钮
    handleChange = ({index, flag})=>{
        (this.state.selectIndex !== index) && this.setState({selectIndex: index, flag});
    }

    //进入购物车页面
    goCartPage = ()=>{
        console.log(this.props);
        this.props.history.push('/menu/cart');
    }

}

const mapStateToProps = (state)=>({
    nav: state.menu.navData,
    list: state.menu.menuData
})
const mapDispatchToProps = (dispatch)=>({
    // 调用异步action，请求数据
    getMenuData(){
        let action = requestMenuData();
        dispatch(action);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);