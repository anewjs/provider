import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ReactReduxContext } from 'react-redux'
import Subscription from 'react-redux/lib/utils/Subscription'

function Provider({ store, context, children }) {
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store)
    subscription.onStateChange = subscription.notifyNestedSubs
    return {
      store,
      subscription
    }
  }, [store])

  const previousState = useMemo(() => store.state, [store])

  useEffect(() => {
    const { subscription } = contextValue
    subscription.trySubscribe()

    if (previousState !== store.state) {
      subscription.notifyNestedSubs()
    }
    return () => {
      subscription.tryUnsubscribe()
      subscription.onStateChange = null
    }
  }, [contextValue, previousState])

  const Context = context || ReactReduxContext

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

if (process.env.NODE_ENV !== 'production') {
  Provider.propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      reducers: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired,
      getters: PropTypes.object.isRequired,
      state: PropTypes.object.isRequired
    }),
    context: PropTypes.object,
    children: PropTypes.any
  }
}

export default Provider
