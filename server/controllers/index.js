/**
 * Created at 11/10/2016.
 * @Author 
 * @Email
 */
import Router       from 'koa-router';      // 注意require('koa-router')返回的是函数
import request      from 'request';
import common		from '../common/common.js';
import config		from '../config/host.js';


const index 		= Router();
const produce =  config.produce;
const apihost =  config.apihost["index"][produce];


index.get('/index', async (ctx, next) => {
	const search = ctx.request.search;

   	await ctx.render('pages/index', {userinfo: '' });
});

//路由转发获取 java的数据
index.get('/list',async (ctx, next)=>{
	const url = "http://";
	const option = {url:url, form:{}};

	//不带cookie的
	const getListData = await common.requestGet(option).catch((errs) => {
		return ctx.body = ('---getListData-- request failed:'+ errs);
	});

	// 如果要cookie的话  就加上 cookies, host 参数
	// let cookies = ctx.cookies.get('account');  
	// let host = '1.2.3';
	// const getListData = await common.requestGet(option, cookies, host).catch((errs) => {
	// 	return ctx.body = ('---getListData-- request failed:'+ errs);
	// });

   return ctx.body = getListData;
}); 


index.get('/error', async (ctx, next) => {
    await ctx.render('error',{"errormsg":"错误页面"});
});


export default index;
