!function r(e,n,o){function t(i,f){if(!n[i]){if(!e[i]){var a="function"==typeof require&&require;if(!f&&a)return a(i,!0);if(u)return u(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[i]={exports:{}};e[i][0].call(l.exports,function(r){var n=e[i][1][r];return t(n?n:r)},l,l.exports,r,e,n,o)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<o.length;i++)t(o[i]);return t}({1:[function(r,e,n){"use strict";function o(r){return r&&r.__esModule?r:{"default":r}}var t=r("./modules/foo.js"),u=o(t),i=new u["default"],f=i.whoAreYou();console.log(f)},{"./modules/foo.js":2}],2:[function(r,e,n){"use strict";function o(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}var t=function(){function r(r,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(r,o.key,o)}}return function(e,n,o){return n&&r(e.prototype,n),o&&r(e,o),e}}(),u=function(){function r(){o(this,r)}return t(r,[{key:"whoAreYou",value:function(){return"I am Foo!"}}]),r}();e.exports=u},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map
