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

    wrap(Component, { id, Router, Provider = DefaultProvider } = {}) {
        const AnewProvider = () => (
            <Provider store={this.config.store}>
                {Router ? Router.wrap(Component) : <Component />}
            </Provider>
        )

        if (id) {
            render(<AnewProvider />, document.getElementById(id))
        }

        return AnewProvider
    }

    connect(Config) {
        const { component, mapStateToProps, mapDispatchToProps, mergeProps, options } = Config

        return connect(
            mapStateToProps
                ? (state, props) => mapStateToProps(this.config.store.getState, state, props)
                : null,
            mapDispatchToProps,
            mergeProps,
            options
        )(component || Config)
    }
}

export default new ProviderCore()
