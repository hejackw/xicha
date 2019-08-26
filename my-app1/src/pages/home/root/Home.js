import React, { Component } from 'react'
import {connect} from 'react-redux'
import {requestBannerData} from '../../../store/modules/home'
import Banner from './children/Banner'
import ShopBar from './children/ShopBar'
import List from './children/List'
import './style.scss';
import AppHeader from '../../../components/app-header'
import AppScroll from '../../../components/app-scroll';

class Home extends Component {
    render() {
        let {banner, selectShop} = this.props;
        return (
            <div className="page" id="home">
                <AppHeader title="喜茶时光"></AppHeader>
                <AppScroll className="content">
                        <Banner data={banner}/>
                        <ShopBar shop={selectShop}/>
                        <List/>
                </AppScroll>
            </div>
        )
    }

    componentDidMount(){
        // 请求轮播图数据
        this.props.getBannerData();
    }
}

const mapStateToProps = (state, props)=>({
    title: state.home.title,
    banner: state.home.banner,
    selectShop: state.home.selectShop
})

const mapDispatchToProps = (dispatch, props)=>({
    // 调用请求轮播图数据的函数
    getBannerData(){
        let action = requestBannerData('react');
        dispatch(action);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
