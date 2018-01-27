/*
 * Copyright(c)
 * Date: 2016-11-1
 *
 */

"use strict";

/*
 * apihost           后台服务提供数据接口 API
 * produce:          根据生产环境变量获取所有的本地、开发、测试、线上环境配置 local/dev/test/production
 * port：            前端服务端口
 */
const env = process.env.NODE_ENV || "production";

export default {
    "produce"               : env,
    "port":{
        "local"             : 3000,
        "dev"               : 3000,
        "test"              : 3000,
        "production"        : 3000,
    },

    "apihost":{
        "index":{           //权限申请的api接口地址
            "local"         :"http:*",
            "dev"           :"http:*",
            "test"          :"http:*",
            "production"    :"http:*",
        }
    },


};
