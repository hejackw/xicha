import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import home from './modules/home'
import menu from './modules/menu'
import cart from './modules/cart'
import order from './modules/order'
import user from './modules/user'

const reducer = combineReducers({
    home,
    menu,
    cart,
    order,
    user
});

// 获得redux的谷歌浏览器开发工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 构建store时使用工具
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

