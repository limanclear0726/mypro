

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaSession = require('koa-session');

var _koaSession2 = _interopRequireDefault(_koaSession);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _common = require('./common/common.js');

var _common2 = _interopRequireDefault(_common);

var _index = require('./controllers/index.js');

var _index2 = _interopRequireDefault(_index);

var _project = require('./controllers/project.js');

var _project2 = _interopRequireDefault(_project);

var _host = require('./config/host.js');

var _host2 = _interopRequireDefault(_host);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var produce = _host2.default.produce;
var port = _host2.default.port[produce];

var logger = _log4js2.default.getLogger();

app.use((0, _koaLogger2.default)());

var koabody = (0, _koaBody2.default)({
    urlencoded: true,
    multipart: true,
    formidable: { uploadDir: _path2.default.normalize(__dirname + '/' + "../nodetmp") },
    keepExtensions: true });

app.use(koabody);
app.keys = ['sso_koa_nodejs'];
app.use((0, _koaSession2.default)(app));

app.use((0, _koaViews2.default)(_path2.default.join(__dirname, '../views'), {
    extension: 'ejs'
}));

app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../static')));

app.use(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
        var start, ms;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        start = new Date().getTime();
                        _context.next = 3;
                        return next();

                    case 3:
                        ms = new Date().getTime() - start;

                        logger.info(ctx, ms);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.use(_index2.default.routes());
app.use(_project2.default.routes());

app.on('error', function (err, ctx) {
    logger.error(err);
});

app.proxy = true;

app.listen(port);
console.log('app started at port ' + port + '...');

exports.default = app;