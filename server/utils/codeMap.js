let map = {
}

module.exports = {
    // 保存电话号码和验证码
    setCodeByTel(tel, code){
        map[tel] = code;
        // 五分钟后清空
        setTimeout(()=>{
            map[tel] = undefined;
        }, 1000*60*5);
    },
    // 根据电话号码获得验证码
    getCodeByTel(tel){
        let code = map[tel];
        //清除验证码
        map[tel] = undefined;
        return code;
    }
}