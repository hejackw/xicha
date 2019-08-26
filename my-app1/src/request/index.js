import 'whatwg-fetch'

export function get(url, params = {}){
    return new Promise((resolve, reject)=>{
        // 将参数转为字符串的格式
        let paramStr = '';
        Object.entries(params).forEach(([key, value], index)=>{
            paramStr += index === 0 ? '' : '&';
            value = encodeURIComponent(value);
            paramStr += `${key}=${value}`;
        });
        // 发送请求
        fetch(`${url}?${paramStr}`, {
            method: 'GET'
        })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            resolve(data);
        })
        .catch(error=>{
            console.log(error);
        })

    });

}

export function post(url, params = {}){
    return new Promise((resolve, reject)=>{
        let paramStr = '';
        Object.entries(params).forEach(([key, value], index)=>{
            paramStr += index === 0 ? '' : '&';
            value = encodeURIComponent(value);
            paramStr += `${key}=${value}`;
        });
        // 发送post请求
        fetch(url, {
            method: 'POST',
            body: paramStr,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            resolve(data);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

export default {
    get,
    post
}