'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnewProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = require('./react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnewProvider = exports.AnewProvider = function AnewProvider(store) {
    _classCallCheck(this, AnewProvider);

    _initialiseProps.call(this);

    if (store) {
        this.use(store);
    }
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.use = function (store) {
        if (!_this.configuration) {
            _this.configuration = {};
        }

        _this.configuration.store = store;

        return _this;
    };

    this.config = function (configuration) {
        _this.configuration = configuration;
    };

    this.wrap = function (Component) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _config$configuration = _extends({}, config, _this.configuration),
            _config$configuration2 = _config$configuration.Provider,
            Provider = _config$configuration2 === undefined ? _reactRedux.Provider : _config$configuration2,
            store = _config$configuration.store;

        var AnewProvider = function AnewProvider() {
            return _react2.default.createElement(
                Provider,
                { store: store },
                _react2.default.createElement(Component, null)
            );
        };

        return AnewProvider;
    };

    this.connect = function (Config) {
        return typeof Config === 'function' ? (0, _reactRedux.connect)(Config)(Config) : (0, _reactRedux.connect)(Config);
    };
};

exports.default = new AnewProvider();