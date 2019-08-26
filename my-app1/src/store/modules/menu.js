import api from '../../request/api'
import {get} from '../../request'

// types
const SET_MENU_NAV = 'menu/set_menu_nav';
const SET_MENU_LIST = 'menu/set_menu_list';

// 状态
const initialState = {
    navData: [],
    menuData: []
}

// reducer
export default (state = initialState, action)=>{
    switch (action.type) {
        case SET_MENU_NAV: 
            return {
                ...state,
                navData: action.value
            };
        case SET_MENU_LIST: 
            return {
                ...state,
                menuData: action.value
            };
        default:
            return state;
    }
}

// 同步action
const setMenuNavData = (params)=>({
    type: SET_MENU_NAV,
    value: params
})
const setMenuListData = (params)=>({
    type: SET_MENU_LIST,
    value: params
})

// 异步action
export const requestMenuData = ()=> async(dispatch)=> {
    // 请求数据
    let result = await get(api.MENU_LIST);
    // 处理数据
    let navArr = [], menuArr = [];
    result.data.forEach(item=>{
        navArr.push({id: item.tag, name: item.categoryName});
        menuArr.push({id: item.tag, name: item.categoryName, data: item.spuList});
    })
    // 派发事件
    dispatch(setMenuNavData(navArr));
    dispatch(setMenuListData(menuArr));
}