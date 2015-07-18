// modules/foo

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Foo = (function () {
	function Foo() {
		_classCallCheck(this, Foo);
	}

	_createClass(Foo, [{
		key: 'whoAreYou',
		value: function whoAreYou() {

			return 'I am Foo!';
		}
	}]);

	return Foo;
})();

module.exports = Foo;
//main.js
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _modulesFooJs = require("./modules/foo.js");

var _modulesFooJs2 = _interopRequireDefault(_modulesFooJs);

var foo = new _modulesFooJs2["default"]();

var mesg = foo.whoAreYou();

console.log(mesg);