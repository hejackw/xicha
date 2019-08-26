import {post, get} from '../../request'
import api from '../../request/api'
const SET_SEND_BTN = 'user/set_send_btn';
const SET_FLAG = 'user/set_flag';
const SET_LOGIN_STATUS = 'user/set_login_status';

const initialState = {
    isSendCode: false,
    sendBtn: '发送',
    isLogin: false
}

// reducer
export default (state = initialState, action)=>{
    switch (action.type) {
        case SET_SEND_BTN: 
            return {
                ...state,
                sendBtn: action.value
            };
        case SET_FLAG: 
            return {
                ...state,
                isSendCode: action.value
            };
        case SET_LOGIN_STATUS: 
            return {
                ...state,
                isLogin: true
            }
        default:
            return state;
    }
}

// 同步action
const setSendBtnAction = (param)=>({
    type: SET_SEND_BTN,
    value: param  
})
const setFlag = (param)=>({
    type: SET_FLAG,
    value: param
})

const setLoginStatus = (param)=>({
    type: SET_LOGIN_STATUS,
    value: param
})

// 异步action
export const sendPhoneCodeAction = (tel)=> async (dispatch)=>{
    // 发送请求
    let result = await post(api.SEND_CODE, {tel});
    if(result.code === 0){
        let num = 60;
        // 设置倒计时起始时间
        let action = setSendBtnAction(num+'s');
        dispatch(action);

        // 设置发送按钮不可点击
        let action2 = setFlag(true);
        dispatch(action2);

        // 进行倒计时
        let token = setInterval(()=>{
            num -= 1;
            let info = (num === 0) ? '重新发送' : (num+'s');
            let action3 = setSendBtnAction(info);
            dispatch(action3);
            //清除定时器
            if(info === '重新发送'){
                clearInterval(token);
                // 设置发送按钮可以点击
                let action4 = setFlag(false);
                dispatch(action4);
            }
        }, 1000);
    }else{
        //发送失败了
        let action = setSendBtnAction('重新发送');
        dispatch(action);
    }
}

export const loginBycodeAction = (tel, code) => async (dispatch) => {
    // 发送登录请求给后台
    let result = await post(api.LOGIN, {tel, code});
    console.log(result);
    if(result.code === 0){
        // 登录成功
        let action = setLoginStatus(true);
        dispatch(action);
    }
}

// 检查登录是否过期
export const checkLoginAction = ()=> async (dispatch)=>{
    let result = await get(api.CHECK_LOGIN);
    if(result.code === 0){
        // 登录没过期
        let action = setLoginStatus(true);
        dispatch(action);
    }
}