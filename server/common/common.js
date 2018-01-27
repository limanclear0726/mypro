/*
 * Copyright(c) 
 * Date: 2016-09-07
 * Authors: 
 *
 */

 "use strict";

/**
 * Module dependencies.
 */

import request       from 'request';
import config        from '../config/host.js';

//application/x-www-form-urlencoded
//定义获取数据的异步函数 option = { url:url, form:{key,val} }
//form-data
//option = { url:"", formData:formdata}
var requestFormPost = (option, cookies, apihost) => {
    //request与其它交互时 携带cookies
    let j = request.jar();
    if(cookies && apihost){
        var cookie = request.cookie('account='+cookies);
        j.setCookie(cookie,apihost);
    }

    return new Promise((resolve, reject) => {
        if( !option ) return reject('缺少option参数！');
        if(cookies){
            option.jar = j;//cookie
        }

        request.post(option, (error,httpResponse,body) => {
            
            if(error) {
                return reject(error);
            } 
            var result = body;
            if(typeof(body) == 'string') {
                try {
                    result = JSON.parse(body);
                } catch(e){
                    return reject(body);
                }
            }

            if(result) {
                resolve(result);
            } else {
                return reject(body);
            }

        });
    })
}

//定义获取数据的异步函数 option = { url:url, datas:{} }
var requestJsonPost = (option, cookies, apihost) => {
     //request与其它交互时 携带cookies
    let j = request.jar();
    if(cookies && apihost){
        var cookie = request.cookie('account='+cookies);
        j.setCookie(cookie,apihost);
    }

    return new Promise((resolve, reject) => {
        if( !option ) return reject('缺少option参数！');
        if(cookies){
            option.jar = j;//cookie
        }

        option.json = true;

        var tempoption = {
            url:option.url,
            method: "POST",
            json: option.datas,
            headers: {
                "content-type": "application/json",
            },
            jar:j,
        }

        request(tempoption, (error,httpResponse,body) => {

            if(error) {
                return reject(error);
            }

            var result = body ;

            if(typeof(body) == 'string'){
                try {
                    result = JSON.parse(body);
                } catch(e){
                    return reject(body);
                }
            }

            if(result) {
                resolve(result);
            } else {
                return reject(body);
            }
        });
    })
}


//定义获取数据的异步函数 option = { url:url, form:{} } form字段可有可无
var requestGet = (option,cookies, apihost) => {
    //var cookie = request.cookie('account='+cookies);
     //request与其它交互时 携带cookies
    let j = request.jar();

    if(cookies && apihost){
        var cookie = request.cookie('account='+cookies);
        j.setCookie(cookie,apihost);
    }

    return new Promise((resolve, reject) => {
        if( !option ) return reject('缺少option参数！');
        const url = option.url;

        //let getoption = {url:url,jar:j};
        let getoption = {url:url};
        if(cookies) {
            getoption['jar'] = j;
        }
        request.get(getoption, (error,httpResponse,body) => {
             console.log('-requestGet-body:',body,'typeof',typeof(body), '-error--',error);
            if(error) {
                return reject(error);
            }

            var result = body;
            try {
                result = JSON.parse(body);
            } catch(e){
                return reject(body);
            }

            if(result) {
                resolve(result);
            } else {
                return reject(body);
            }

        });

        analysisMethod(option.url, apihost,cookies );
    })
}

//定义获取数据的异步函数 option = { url:url, datas:{} }
var requestJsonGet = (option, cookies, apihost) => {
     //request与其它交互时 携带cookies
    let j = request.jar();

    var cookie = request.cookie('account='+cookies);
    j.setCookie(cookie,apihost);

    return new Promise((resolve, reject) => {
        if( !option ) return reject('缺少option参数！');
         option.jar = j;//cookie
         option.json = true;

         var tempoption = {
            url:option.url,
            method: "GET",
            json: option.datas,
            headers: {
                "content-type": "application/json",
            },
            jar:j,
        }

        request(tempoption, (error,httpResponse,body) => {
        
            if(error) {
                return reject(error);
            }

            var result = body;
            if(typeof(body) == 'string'){
                try {
                    result = JSON.parse(body);
                } catch(e){
                    return reject(body);
                }
            }
            
            if(result) {
                resolve(result);
            } else {
                return reject(body);
            }

        });

        analysisMethod(option.url, apihost,cookies );
    })
}

//json 数据转为url参数
var toQueryString = (obj) => {
    return obj ? Object.keys(obj).sort().map((key)=>{
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

//获取search url 对象
var  getSearchUrlObj = (searchurl) =>{

    var  qs = searchurl>0 ? searchurl.substr(1):'',
    args = {},
    items = qs.length>0 ? qs.split('&'):[],
    item = null,name = null,value = null,i = 0,len = items.length;

    for(i = 0;i < len; i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length){
            args[name] = value;
        }
    }

    return args;
}


module.exports.requestFormPost  = requestFormPost;
module.exports.requestJsonPost  = requestJsonPost;
module.exports.requestJsonGet   = requestJsonGet;
module.exports.requestGet   = requestGet;

module.exports.toQueryString= toQueryString;
module.exports.getSearchUrlObj  = getSearchUrlObj;
