import React, { lazy, Suspense, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import TabBar from "./components/tab-bar";
import Loading from "./components/loading";
import {checkLoginAction} from './store/modules/user'
import {connect} from 'react-redux'

import Login from './pages/mine/login/Login'

// 根页面
const Home = lazy(() => import("./pages/home/root/Home"));
const Menu = lazy(() => import("./pages/menu/root/Menu"));
const Time = lazy(() => import("./pages/time/root/Time"));
const Order = lazy(() => import("./pages/order/root/Order"));
const Mine = lazy(() => import("./pages/mine/root/Mine"));
const NotFind = lazy(() => import("./pages/common/not-find/NotFind"));

// 子页面
const ShopList = lazy(() => import("./pages/home/shop-list/ShopList"));
const Coupon = lazy(() => import("./pages/common/coupon/Coupon"));
const Cart = lazy(() => import("./pages/menu/cart/Cart"));
const OrderDetail = lazy(() =>
  import("./pages/common/order-detail/OrderDetail")
);
const Comment = lazy(() => import("./pages/order/comment/Comment"));

class App extends React.Component{
  render(){
      return this.props.isLogin ?
      (
        <Router>
          <div id="app">
            <Suspense fallback={<Loading />}>
              <CacheSwitch>
                {/* 根路由 */}
                <Route path="/" exact render={() => <Redirect to="/home" />} />
                <CacheRoute path="/home" component={Home} />
                <CacheRoute path="/menu" component={Menu} />
                <CacheRoute path="/time/:flag" component={Time} />
                <CacheRoute path="/order" component={Order} />
                <CacheRoute path="/mine" component={Mine} />
                <Route path="/404" component={NotFind} />
                <Route render={() => <Redirect to="/404" />} />
              </CacheSwitch>
    
              <Fragment>
                {/* 首页的子页面 */}
                <Route path="/home/shoplist" component={ShopList} />
                <Route path="/home/coupon" component={Coupon} />
                {/* 菜单的子页面 */}
                <Route path="/menu/cart" component={Cart} />
                <Route path="/menu/cart/confirm" component={OrderDetail} />
                {/* 取茶的子页面 */}
                <Route path="/order/detail/:id" component={OrderDetail} />
                <Route path="/order/comment/:id" component={Comment} />
              </Fragment>
            </Suspense>
    
            <Route component={TabBar} />
          </div>
        </Router>
      )
      : 
      <Login/>;
  }

  componentDidMount(){
    //检查是否登录了，或者登录是否过期了
    this.props.checkLogin();
  }
}

const mapStateToProps = (state)=>({
  isLogin: state.user.isLogin
})
const mapDispatchToProps = (dispatch)=>({
    checkLogin(){
      let action = checkLoginAction();
      dispatch(action);
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
