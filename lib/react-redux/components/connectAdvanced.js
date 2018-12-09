'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = connectAdvanced;

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIs = require('react-is');

var _Context = require('./Context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) { continue; } if (!Object.prototype.hasOwnProperty.call(obj, i)) { continue; } target[i] = obj[i]; } return target; }

function connectAdvanced(
/*
selectorFactory is a func that is responsible for returning the selector function used to
compute new props from state, props, and dispatch. For example:
   export default connectAdvanced((dispatch, options) => (state, props) => ({
    thing: state.things[props.thingId],
    saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
  }))(YourComponent)
 Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
outside of their selector as an optimization. Options passed to connectAdvanced are passed to
the selectorFactory, along with displayName and WrappedComponent, as the second argument.
 Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
props. Do not use connectAdvanced directly without memoizing results between calls to your
selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref$getDisplayName = _ref.getDisplayName,
        getDisplayName = _ref$getDisplayName === undefined ? function (name) {
        return 'ConnectAdvanced(' + name + ')';
    } : _ref$getDisplayName,
        _ref$methodName = _ref.methodName,
        methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
        _ref$renderCountProp = _ref.renderCountProp,
        renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
        _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
        shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
        _ref$storeKey = _ref.storeKey,
        storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
        _ref$withRef = _ref.withRef,
        withRef = _ref$withRef === undefined ? false : _ref$withRef,
        _ref$forwardRef = _ref.forwardRef,
        forwardRef = _ref$forwardRef === undefined ? false : _ref$forwardRef,
        _ref$context = _ref.context,
        context = _ref$context === undefined ? _Context.ReactReduxContext : _ref$context,
        connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef', 'forwardRef', 'context']);

    (0, _invariant2.default)(renderCountProp === undefined, 'renderCountProp is removed. render counting is built into the latest React dev tools profiling extension');

    (0, _invariant2.default)(!withRef, 'withRef is removed. To access the wrapped instance, use a ref on the connected component');

    var customStoreWarningMessage = 'To use a custom Redux store for specific components,  create a custom React context with ' + "React.createContext(), and pass the context object to React-Redux's Provider and specific components" + ' like:  <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' + 'You may also pass a {context : MyContext} option to connect';

    (0, _invariant2.default)(storeKey === 'store', 'storeKey has been removed and does not do anything. ' + customStoreWarningMessage);

    var Context = context;

    return function wrapWithConnect(WrappedComponent) {
        if (process.env.NODE_ENV !== 'production') {
            (0, _invariant2.default)((0, _reactIs.isValidElementType)(WrappedComponent), 'You must pass a component to the function returned by ' + (methodName + '. Instead received ' + JSON.stringify(WrappedComponent)));
        }

        var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

        var displayName = getDisplayName(wrappedComponentName);

        var selectorFactoryOptions = _extends({}, connectOptions, {
            getDisplayName: getDisplayName,
            methodName: methodName,
            renderCountProp: renderCountProp,
            shouldHandleStateChanges: shouldHandleStateChanges,
            storeKey: storeKey,
            displayName: displayName,
            wrappedComponentName: wrappedComponentName,
            WrappedComponent: WrappedComponent
        });

        var pure = connectOptions.pure;


        var OuterBaseComponent = _react.Component;
        var FinalWrappedComponent = WrappedComponent;

        if (pure) {
            OuterBaseComponent = _react.PureComponent;
        }

        function makeDerivedPropsSelector() {
            var lastProps = void 0;
            var lastState = void 0;
            var lastDerivedProps = void 0;
            var lastStore = void 0;
            var sourceSelector = void 0;

            return function selectDerivedProps(state, props, store) {
                if (pure && lastProps === props && lastState === state) {
                    return lastDerivedProps;
                }

                if (store !== lastStore) {
                    lastStore = store;
                    sourceSelector = selectorFactory({
                        commit: store.commit,
                        dispatch: store.dispatch
                    }, // store.dispatch
                    selectorFactoryOptions);
                }

                lastProps = props;
                lastState = state;

                var nextProps = sourceSelector({
                    state: state,
                    get: store.get,
                    select: store.select
                }, props);

                if (lastDerivedProps === nextProps) {
                    return lastDerivedProps;
                }

                lastDerivedProps = nextProps;
                return lastDerivedProps;
            };
        }

        function makeChildElementSelector() {
            var lastChildProps = void 0,
                lastForwardRef = void 0,
                lastChildElement = void 0;

            return function selectChildElement(childProps, forwardRef) {
                if (childProps !== lastChildProps || forwardRef !== lastForwardRef) {
                    lastChildProps = childProps;
                    lastForwardRef = forwardRef;
                    lastChildElement = _react2.default.createElement(FinalWrappedComponent, _extends({}, childProps, { ref: forwardRef }));
                }

                return lastChildElement;
            };
        }

        var Connect = function (_OuterBaseComponent) {
            _inherits(Connect, _OuterBaseComponent);

            function Connect(props) {
                _classCallCheck(this, Connect);

                var _this = _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).call(this, props));

                (0, _invariant2.default)(forwardRef ? !props.wrapperProps[storeKey] : !props[storeKey], 'Passing redux store in props has been removed and does not do anything. ' + customStoreWarningMessage);
                _this.selectDerivedProps = makeDerivedPropsSelector();
                _this.selectChildElement = makeChildElementSelector();
                _this.renderWrappedComponent = _this.renderWrappedComponent.bind(_this);
                return _this;
            }

            _createClass(Connect, [{
                key: 'renderWrappedComponent',
                value: function renderWrappedComponent(value) {
                    (0, _invariant2.default)(value, 'Could not find "store" in the context of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + 'or pass a custom React context provider to <Provider> and the corresponding ' + ('React context consumer to ' + displayName + ' in connect options.'));
                    var storeState = value.storeState,
                        store = value.store;


                    var wrapperProps = this.props;
                    var forwardedRef = void 0;

                    if (forwardRef) {
                        wrapperProps = this.props.wrapperProps;
                        forwardedRef = this.props.forwardedRef;
                    }

                    var derivedProps = this.selectDerivedProps(storeState, wrapperProps, store);

                    return this.selectChildElement(derivedProps, forwardedRef);
                }
            }, {
                key: 'render',
                value: function render() {
                    var ContextToUse = this.props.context || Context;

                    return _react2.default.createElement(
                        ContextToUse.Consumer,
                        null,
                        this.renderWrappedComponent
                    );
                }
            }]);

            return Connect;
        }(OuterBaseComponent);

        Connect.WrappedComponent = WrappedComponent;
        Connect.displayName = displayName;

        if (forwardRef) {
            var forwarded = _react2.default.forwardRef(function forwardConnectRef(props, ref) {
                return _react2.default.createElement(Connect, { wrapperProps: props, forwardedRef: ref });
            });

            forwarded.displayName = displayName;
            forwarded.WrappedComponent = WrappedComponent;
            return (0, _hoistNonReactStatics2.default)(forwarded, WrappedComponent);
        }

        return (0, _hoistNonReactStatics2.default)(Connect, WrappedComponent);
    };
}