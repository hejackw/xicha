import api from '../../request/api'
import {post, get} from '../../request'
import {clearTeaAction} from './cart'

const SET_ORDER = 'order/set_order';

const initialState = {
    currentOrder: null
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case SET_ORDER:
            return {
                ...state,
                currentOrder: action.value
            }
        default:
            return state;
    }
}

const setOrderAction = (params)=>({
    type: SET_ORDER,
    value: params
})

// 异步事件
// 提交订单
export const postOrderAction = (list) => async (dispatch)=>{
    let result = await post(api.POST_OPRDER, {
        list: JSON.stringify(list)
    });
    //设置当前订单,清空购物车
    if(result.code === 0){
        dispatch(setOrderAction(result.data));

        dispatch(clearTeaAction());
    }
}

//  查询订单
export const getAllOrderAction = () => async (dispatch)=>{
    let result = await get(api.ORDER_LIST);
    console.log(result);
}


