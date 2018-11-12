'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProviderCore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProviderCore = function () {
    function ProviderCore(store) {
        _classCallCheck(this, ProviderCore);

        this.config = { store: store };
    }

    _createClass(ProviderCore, [{
        key: 'store',
        value: function store(_store) {
            this.config.store = _store;
        }
    }, {
        key: 'mount',
        value: function mount(Component) {
            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                id = _ref.id,
                Router = _ref.Router,
                _ref$Provider = _ref.Provider,
                Provider = _ref$Provider === undefined ? _reactRedux.Provider : _ref$Provider;

            var App = _react2.default.createElement(
                Provider,
                { store: this.config.store },
                Router ? Router.mount(Component) : _react2.default.createElement(Component, null)
            );

            if (id) {
                (0, _reactDom.render)(App, document.getElementById(id));
            }

            return App;
        }
    }, {
        key: 'connect',
        value: function connect(Config) {
            var _this = this;

            var component = Config.component,
                mapStateToProps = Config.mapStateToProps,
                mapDispatchToProps = Config.mapDispatchToProps,
                mergeProps = Config.mergeProps,
                options = Config.options;


            return (0, _reactRedux.connect)(mapStateToProps ? function (state, props) {
                return mapStateToProps(_this.config.store.getState, state, props);
            } : null, mapDispatchToProps, mergeProps, options)(component || Config);
        }
    }]);

    return ProviderCore;
}();

exports.ProviderCore = ProviderCore;
exports.default = new ProviderCore();