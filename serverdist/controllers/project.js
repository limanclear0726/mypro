'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _common = require('../common/common.js');

var _common2 = _interopRequireDefault(_common);

var _host = require('../config/host.js');

var _host2 = _interopRequireDefault(_host);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var project = new _koaRouter2.default({
	prefix: '/project'
});

var produce = _host2.default.produce;
var apihost = _host2.default.apihost["index"][produce];

project.get('/index', function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
		var search;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						search = ctx.request.search;
						_context.next = 3;
						return ctx.render('pages/index', { userinfo: userinfo });

					case 3:
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

project.get('/list', function () {
	var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
		var url, option, getListData;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						url = "http://";
						option = { url: url, form: {} };
						_context2.next = 4;
						return _common2.default.requestGet(option).catch(function (errs) {
							return ctx.body = '---getListData-- request failed:' + errs;
						});

					case 4:
						getListData = _context2.sent;
						return _context2.abrupt('return', ctx.body = getListData);

					case 6:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

project.get('/error', function () {
	var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return ctx.render('error', { "errormsg": "错误页面" });

					case 2:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}());

exports.default = project;