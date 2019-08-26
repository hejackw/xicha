import api from '../../request/api'
import {get} from '../../request'

// types
const SET_BANNER = 'home/set_banner';

// 初始值
const initialState = {
    title: '首页',
    banner: [],
    selectShop: '壹方城店'
}

// reducer
export default (state = initialState, action)=>{
    switch (action.type) {
        //设置首页轮播图数据
        case SET_BANNER:
            return {
                ...state,
                banner: action.value
            }
        default:
            return state;
    }
}

// 同步action
// 设置首页轮播图数据
const setBannerData = (params)=>{
    return {
        type: SET_BANNER,
        value: params
    }
}

// 异步action
//请求首页轮播图数据
export const requestBannerData = (val)=> async (dispatch)=>{
    //请求
    let {data} = await get(api.HOME_BANNER);
    // 构建action
    let action = setBannerData(data);
    // 派发action
    dispatch(action);
}