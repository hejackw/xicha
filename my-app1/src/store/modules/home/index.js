import {SET_BANNER} from './types'
const initialState = {
    title: '首页',
    banner: []
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case SET_BANNER:
            return {
                ...state,
                banner: action.value
            }
        default:
            return state;
    }
}