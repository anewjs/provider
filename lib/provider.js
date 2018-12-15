import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { Provider as DefaultProvider, connect } from './react-redux';
import React from 'react';
export var AnewProvider = function AnewProvider(_store) {
  var _this = this;

  _defineProperty(this, "use", function (store) {
    if (!_this.configuration) {
      _this.configuration = {};
    }

    _this.configuration.store = store;
    return _this;
  });

  _defineProperty(this, "config", function (configuration) {
    _this.configuration = configuration;
  });

  _defineProperty(this, "wrap", function (Component, config) {
    if (config === void 0) {
      config = {};
    }

    var _config$_this$configu = _extends({}, config, _this.configuration),
        _config$_this$configu2 = _config$_this$configu.Provider,
        Provider = _config$_this$configu2 === void 0 ? DefaultProvider : _config$_this$configu2,
        store = _config$_this$configu.store;

    var AnewProvider = function AnewProvider() {
      return React.createElement(Provider, {
        store: store
      }, React.createElement(Component, null));
    };

    return AnewProvider;
  });

  _defineProperty(this, "connect", function (Config) {
    return typeof Config === 'function' ? connect(Config)(Config) : connect(Config);
  });

  if (_store) {
    this.use(_store);
  }
};
export default new AnewProvider();