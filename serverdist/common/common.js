

"use strict";

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _host = require('../config/host.js');

var _host2 = _interopRequireDefault(_host);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestFormPost = function requestFormPost(option, cookies, apihost) {
    var j = _request2.default.jar();
    if (cookies && apihost) {
        var cookie = _request2.default.cookie('account=' + cookies);
        j.setCookie(cookie, apihost);
    }

    return new _promise2.default(function (resolve, reject) {
        if (!option) return reject('缺少option参数！');
        if (cookies) {
            option.jar = j;
        }

        _request2.default.post(option, function (error, httpResponse, body) {

            if (error) {
                return reject(error);
            }
            var result = body;
            if (typeof body == 'string') {
                try {
                    result = JSON.parse(body);
                } catch (e) {
                    return reject(body);
                }
            }

            if (result) {
                resolve(result);
            } else {
                return reject(body);
            }
        });
    });
};

var requestJsonPost = function requestJsonPost(option, cookies, apihost) {
    var j = _request2.default.jar();
    if (cookies && apihost) {
        var cookie = _request2.default.cookie('account=' + cookies);
        j.setCookie(cookie, apihost);
    }

    return new _promise2.default(function (resolve, reject) {
        if (!option) return reject('缺少option参数！');
        if (cookies) {
            option.jar = j;
        }

        option.json = true;

        var tempoption = {
            url: option.url,
            method: "POST",
            json: option.datas,
            headers: {
                "content-type": "application/json"
            },
            jar: j
        };

        (0, _request2.default)(tempoption, function (error, httpResponse, body) {

            if (error) {
                return reject(error);
            }

            var result = body;

            if (typeof body == 'string') {
                try {
                    result = JSON.parse(body);
                } catch (e) {
                    return reject(body);
                }
            }

            if (result) {
                resolve(result);
            } else {
                return reject(body);
            }
        });
    });
};

var requestGet = function requestGet(option, cookies, apihost) {
    var j = _request2.default.jar();

    if (cookies && apihost) {
        var cookie = _request2.default.cookie('account=' + cookies);
        j.setCookie(cookie, apihost);
    }

    return new _promise2.default(function (resolve, reject) {
        if (!option) return reject('缺少option参数！');
        var url = option.url;

        var getoption = { url: url };
        if (cookies) {
            getoption['jar'] = j;
        }
        _request2.default.get(getoption, function (error, httpResponse, body) {
            console.log('-requestGet-body:', body, 'typeof', typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body), '-error--', error);
            if (error) {
                return reject(error);
            }

            var result = body;
            try {
                result = JSON.parse(body);
            } catch (e) {
                return reject(body);
            }

            if (result) {
                resolve(result);
            } else {
                return reject(body);
            }
        });

        analysisMethod(option.url, apihost, cookies);
    });
};

var requestJsonGet = function requestJsonGet(option, cookies, apihost) {
    var j = _request2.default.jar();

    var cookie = _request2.default.cookie('account=' + cookies);
    j.setCookie(cookie, apihost);

    return new _promise2.default(function (resolve, reject) {
        if (!option) return reject('缺少option参数！');
        option.jar = j;
        option.json = true;

        var tempoption = {
            url: option.url,
            method: "GET",
            json: option.datas,
            headers: {
                "content-type": "application/json"
            },
            jar: j
        };

        (0, _request2.default)(tempoption, function (error, httpResponse, body) {

            if (error) {
                return reject(error);
            }

            var result = body;
            if (typeof body == 'string') {
                try {
                    result = JSON.parse(body);
                } catch (e) {
                    return reject(body);
                }
            }

            if (result) {
                resolve(result);
            } else {
                return reject(body);
            }
        });

        analysisMethod(option.url, apihost, cookies);
    });
};

var toQueryString = function toQueryString(obj) {
    return obj ? (0, _keys2.default)(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
};

var getSearchUrlObj = function getSearchUrlObj(searchurl) {

    var qs = searchurl > 0 ? searchurl.substr(1) : '',
        args = {},
        items = qs.length > 0 ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            args[name] = value;
        }
    }

    return args;
};

module.exports.requestFormPost = requestFormPost;
module.exports.requestJsonPost = requestJsonPost;
module.exports.requestJsonGet = requestJsonGet;
module.exports.requestGet = requestGet;

module.exports.toQueryString = toQueryString;
module.exports.getSearchUrlObj = getSearchUrlObj;