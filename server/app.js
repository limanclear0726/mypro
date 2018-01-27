/*
 * Copyright(c) 
 * Date: 2016-10-11
 * Authors: 
 *
 */

"use strict";

import path 		 from 'path';
import fs            from 'fs';
import Koa           from 'koa';
import koaBody       from 'koa-body';                  // post请求 解析request的body的功能
//import multer        from 'koa-multer';              // 仅仅form-data 文件上传
//import bodyParser    from 'koa-bodyparser';          // 不支持form-data post请求 解析request的body的功能
import koalogger     from 'koa-logger';
import session       from 'koa-session';
import views         from 'koa-views';
import serve         from 'koa-static';					// 静态资源
import mount         from 'koa-mount';
import request		 from 'request';
import log4js        from 'log4js'

import Common        from './common/common.js';
import index         from './controllers/index.js';      //  统一路由
import project       from './controllers/project.js'; 		//  统一路由
import config 		 from './config/host.js';			// 	配置文件

const app           = new Koa();
const produce 		= config.produce;
const port 			= config.port[produce];

//logger 是log4js的实例
const logger = log4js.getLogger();
// logger.trace('this is trace');
// logger.debug('this is debug');
// logger.info('this is info');
// logger.warn('this is warn');
// logger.error('this is error');
// logger.fatal('this is fatal');


/*
ctx.cookies.set(name, value, [options])
ctx.cookies.get(name, [options])

maxAge:  Date.now() 毫秒数
signed: 是否要做签名
expires: cookie 有效期时间
path: cookie 的路径，默认为 /'
domain: cookie 的域
secure: false 表示 cookie 通过 HTTP 协议发送，true 表示 cookie 通过 HTTPS 发送。
httpOnly: true 表示 cookie 只能通过 HTTP 协议发送

*/
// 记录所用方式与时间
app.use(koalogger());
//支持from-data json 等类型
const koabody = koaBody({
    urlencoded: true,
    multipart: true,
    formidable:{uploadDir: path.normalize(__dirname+'/'+"../nodetmp")}, //此处应该是绝对路径而不是相对路径
    keepExtensions: true  //  保存图片的扩展名
});

app.use(koabody);
app.keys = ['sso_koa_nodejs'];
app.use(session(app));
//ejs模版设置
app.use(views(path.join(__dirname,'../views'), {
    extension:'ejs'
}))

//静态文件
app.use(serve(path.join(__dirname,'../static')));


//判断登录的拦截器


//response
app.use(async (ctx, next) => {
    const start = new Date().getTime(); //当前时间
    //开始进入到下一个中间件
    await next();
    //记录响应日志
    let ms = new Date().getTime() - start; 
    logger.info(ctx, ms);

});

//路由
app.use(index.routes());
app.use(project.routes());

app.on('error', (err, ctx) => {
    //记录异常日志
   logger.error(err);

});

app.proxy = true;

//测试端口号为3000
app.listen(port);
console.log('app started at port '+port+'...');

export default app;

