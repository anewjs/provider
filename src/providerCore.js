import { Provider as DefaultProvider, connect } from 'react-redux'
import { render } from 'react-dom'
import React from 'react'

export class ProviderCore {
    constructor(store) {
        this.config = { store }
    }

    store(store) {
        this.config.store = store
    }

    wrap(Component, { id, Router, RouterConfig, Provider = DefaultProvider } = {}) {
        const { store } = this.config
        const AnewComponent = Router
            ? Router.wrap(Component, {
                  ...RouterConfig,
                  id: false,
                  ...(id ? {} : { history: false }),
              })
            : Component

        const AnewProvider = () => (
            <Provider store={store}>
                <AnewComponent />
            </Provider>
        )

        if (id) {
            render(<AnewProvider />, document.getElementById(id))
        }

        return AnewProvider
    }

    connect(Config) {
        const { mapStateToProps, mapDispatchToProps, mergeProps, options } = Config

        const connection = connect(
            mapStateToProps
                ? (state, props) => mapStateToProps(this.config.store.getState, state, props)
                : null,
            mapDispatchToProps,
            mergeProps,
            options
        )

        return typeof Config === 'function' ? connection(Config) : connection
    }
}

export default new ProviderCore()
