import api from '../../../request/api'
import {get} from '../../../request'
import {SET_BANNER} from './types'

const setBannerData = (params)=>{
    return {
        type: SET_BANNER,
        value: params
    }
}

export const requestBannerData = (val)=>{
    return async (dispatch)=>{
        let result = await get(api.HOME_BANNER);
        let action = setBannerData(result.data);
        dispatch(action);
    }
}