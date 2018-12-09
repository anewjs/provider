'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('./react-redux');

Object.defineProperty(exports, 'Provider', {
  enumerable: true,
  get: function get() {
    return _reactRedux.Provider;
  }
});
Object.defineProperty(exports, 'connect', {
  enumerable: true,
  get: function get() {
    return _reactRedux.connect;
  }
});

var _provider = require('./provider');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_provider).default;
  }
});
Object.defineProperty(exports, 'AnewProvider', {
  enumerable: true,
  get: function get() {
    return _provider.AnewProvider;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }