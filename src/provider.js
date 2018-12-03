import { Provider as DefaultProvider, connect } from 'react-redux'
import React from 'react'

export class AnewProvider {
    constructor(store) {
        this.use(store)
    }

    use = store => {
        this.store = store
    }

    config = configuration => {
        this.configuration = configuration
    }

    wrap = (Component, config = {}) => {
        const { Provider = DefaultProvider } = {
            ...config,
            ...this.configuration,
        }

        const AnewProvider = () => (
            <Provider store={this.store}>
                <Component />
            </Provider>
        )

        return AnewProvider
    }

    connect = Config => {
        const { mapStateToProps, mapDispatchToProps, mergeProps, options } = Config
        const connection = connect(
            mapStateToProps
                ? (state, props) => {
                      const { getState } = this.store

                      return getState
                          ? mapStateToProps(getState, state, props)
                          : mapStateToProps(state, props)
                  }
                : null,
            mapDispatchToProps,
            mergeProps,
            options
        )

        return typeof Config === 'function' ? connection(Config) : connection
    }
}

export default new AnewProvider()
