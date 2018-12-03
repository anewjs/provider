'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnewProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnewProvider = exports.AnewProvider = function AnewProvider(store) {
    _classCallCheck(this, AnewProvider);

    _initialiseProps.call(this);

    this.use(store);
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.use = function (store) {
        _this.store = store;
    };

    this.config = function (configuration) {
        _this.configuration = configuration;
    };

    this.wrap = function (Component) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _config$configuration = _extends({}, config, _this.configuration),
            _config$configuration2 = _config$configuration.Provider,
            Provider = _config$configuration2 === undefined ? _reactRedux.Provider : _config$configuration2;

        var AnewProvider = function AnewProvider() {
            return _react2.default.createElement(
                Provider,
                { store: _this.store },
                _react2.default.createElement(Component, null)
            );
        };

        return AnewProvider;
    };

    this.connect = function (Config) {
        var mapStateToProps = Config.mapStateToProps,
            mapDispatchToProps = Config.mapDispatchToProps,
            mergeProps = Config.mergeProps,
            options = Config.options;

        var connection = (0, _reactRedux.connect)(mapStateToProps ? function (state, props) {
            var getState = _this.store.getState;


            return getState ? mapStateToProps(getState, state, props) : mapStateToProps(state, props);
        } : null, mapDispatchToProps, mergeProps, options);

        return typeof Config === 'function' ? connection(Config) : connection;
    };
};

exports.default = new AnewProvider();