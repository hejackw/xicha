const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const User = require('../model/User');
const Order = require('../model/Order');
const {setCodeByTel, getCodeByTel} = require('../utils/codeMap');

router.use(bodyParser());
// 发送验证码
router.post('/send_phone_code', (req, res)=>{
    let {tel} = req.body;

    if(!tel){
        res.json({code: -1, message: '电话号码不能为空'});
    }
    else if(!(/^1[3456789]\d{9}$/.test(tel))){
        res.json({code: -2, message: '电话号码格式不正确'});
    }
    else{
        //正确的
        // 调用第三服务发送验证码
        let num = Math.random().toFixed(6)*1000000;
        console.log(num);

        // 保存验证码
        setCodeByTel(tel, num+'');

        res.json({code: 0, message: '发送成功'});
    }
    
})

// 登录的请求
router.post('/login', (req, res)=>{
    let {tel, code} = req.body;
    console.log(tel, code);
    if(!tel || !code){
        res.json({code: -1, message: '缺少参数'});
    }
    else{
        // 判断电话号码和验证是否正确
        let result = getCodeByTel(tel);
        if(result != code){
            res.json({code: -3, message: '验证码有误'});
        }
        else{
            //查询该手机号是否注册过
            User.findOne({tel})
            .then(result=>{
                if(result){
                    //有值，注册过
                    // 保存登录状态
                    req.session.userInfo = result;
                    //响应登录成功
                    res.json({code: 0, message: '登录成功'});

                }else{
                    // 没有值，没有注册，需要先注册
                    let newUser = new User({tel});
                    newUser.save().then((result)=>{
                        //登录成功
                        // 保存登录状态
                        req.session.userInfo = result;
                        //响应登录成功
                        res.json({code: 0, message: '登录成功'});

                    })
                }
            })
            .catch(()=>{
                
            })
        }
    }
})

// 检查登录是否过期
router.get('/check_login', (req, res)=>{
    if(req.session.userInfo){
        res.json({
            code: 0,
            message: '登录了'
        })
    }else{
        res.json({
            code: -1,
            message: '请先登录'
        })
    }
})

// 下订单
router.post('/post_order', (req, res)=>{
    let {list} = req.body;
    let result = JSON.parse(list);
    new Order({
        list: result,
        user: req.session.userInfo._id
    })
    .save()
    .then((orderInfo)=>{
        res.json({
            code: 0,
            message: '新建订单完成',
            data: orderInfo
        })
    })
    .catch(()=>{
        res.json({
            code: -1,
            message: '新建订单异常，请重新下单'
        })
    })
    
    
})

// 查订单
router.get('/order_list', (req, res)=>{
    let user = req.session.userInfo._id;
    if(!user){
        res.json({
            code: -1,
            message: '请先登录'
        })
        return;
    }

    Order.find({user}).then(result=>{
        console.log(result);
        res.json({
            code: 0,
            message: 'ok',
            data: result.reverse()
        })
    })
})

module.exports = router;