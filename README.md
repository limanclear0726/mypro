# mypro

> y

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```



# webpack 多页面打包执行命令
```shell
# 开发环境				npm run dev | node build/build.js  			http://localhost:8080/
# 全部打包               npm run build 


# pm2 程序启动 执行命令

```shell
# 正式环境启动          pm2 start process.json --env production
# 开发环境启动          pm2 start process.json --env dev
# 测试环境启动          pm2 start process.json --env test
# 本地环境启动          pm2 start process.json --env local
# 例如
# 正式环境启动
pm2 start process.json --env production
```
## pm2 查看进程  
```shell
  pm2 list
```

## pm2 重启 processid 
```shell
  pm2 restart processid
```

## pm2 查看进程详情 
```shell
  pm2 describe processid
```

## pm2 查看日志  
```shell
  pm2 logs processid
```
## pm2 日志清理  
```shell
  pm2 flush
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
