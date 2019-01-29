import PropTypes from 'prop-types';
export var subscriptionShape = PropTypes.shape({
  trySubscribe: PropTypes.func.isRequired,
  tryUnsubscribe: PropTypes.func.isRequired,
  notifyNestedSubs: PropTypes.func.isRequired,
  isSubscribed: PropTypes.func.isRequired
});
export var storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  commit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  get: PropTypes.func.isRequired,
  select: PropTypes.object.isRequired
});