import React, { Component } from 'react';
import {connect} from 'react-redux'
import {sendPhoneCodeAction, loginBycodeAction} from '../../../store/modules/user'
import './style.scss'

class Login extends Component {
    telInput = React.createRef();
    codeInput = React.createRef();

    render() {
        let {sendCode, value, disabled, login} = this.props;
        return (
            <div id="login" className="page super-page">
                <h1>登录</h1>
                <p>
                    <input type="tel" ref={this.telInput}/>
                    <button onClick={()=>{
                        console.log('执行了');
                        (!disabled) && sendCode(this.telInput.current.value);
                    }}
                        >{value}</button>
                </p>
                <p>
                    <input type="number" ref={this.codeInput}/>
                </p>
                <button onClick={()=>{
                    login(this.telInput.current.value, this.codeInput.current.value);
                }}>登录</button>
            </div>
        );
    }
}

const mapStateToProps = (state)=>({
    value: state.user.sendBtn,
    disabled: state.user.isSendCode,
    isLogin: state.user.isLogin
})

const mapDispatchToProps = (dispatch)=>({
    // 发送验证码
    sendCode(tel){
        let action = sendPhoneCodeAction(tel);
        dispatch(action);
    },
    // 登录
    login(tel, code){
        let action = loginBycodeAction(tel, code);
        dispatch(action);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);