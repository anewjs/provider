'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Context = require('./Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } }

var Provider = function (_Component) {
    _inherits(Provider, _Component);

    function Provider(props) {
        _classCallCheck(this, Provider);

        var _this = _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, props));

        var store = props.store;


        _this.state = {
            storeState: store.get(),
            store: store
        };
        return _this;
    }

    _createClass(Provider, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._isMounted = true;
            this.subscribe();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }this._isMounted = false;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.store !== prevProps.store) {
                if (this.unsubscribe) {
                    this.unsubscribe();
                }this.subscribe();
            }
        }
    }, {
        key: 'subscribe',
        value: function subscribe() {
            var _this2 = this;

            var store = this.props.store;


            this.unsubscribe = store.subscribe(function () {
                var newStoreState = store.get();

                if (!_this2._isMounted) {
                    return;
                }

                _this2.setState(function (providerState) {
                    // If the value is the same, skip the unnecessary state update.
                    if (providerState.storeState === newStoreState) {
                        return null;
                    }

                    return { storeState: newStoreState };
                });
            });

            // Actions might have been dispatched between render and mount - handle those
            var postMountStoreState = store.get();
            if (postMountStoreState !== this.state.storeState) {
                this.setState({ storeState: postMountStoreState });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var Context = this.props.context || _Context.ReactReduxContext;

            return _react2.default.createElement(
                Context.Provider,
                { value: this.state },
                this.props.children
            );
        }
    }]);

    return Provider;
}(_react.Component);

Provider.propTypes = {
    store: _propTypes2.default.shape({
        subscribe: _propTypes2.default.func.isRequired,
        commit: _propTypes2.default.func.isRequired,
        dispatch: _propTypes2.default.func.isRequired,
        get: _propTypes2.default.func.isRequired,
        select: _propTypes2.default.object.isRequired
    }),
    context: _propTypes2.default.object,
    children: _propTypes2.default.any
};

exports.default = Provider;