import { Provider as DefaultProvider, connect } from './react-redux'
import React from 'react'

export class AnewProvider {
    constructor(store) {
        this.use(store)
    }

    use = store => {
        if (!this.configuration) {
            this.configuration = {}
        }

        this.configuration.store = store
    }

    config = configuration => {
        this.configuration = configuration
    }

    wrap = (Component, config = {}) => {
        const { Provider = DefaultProvider, store } = {
            ...config,
            ...this.configuration,
        }

        const AnewProvider = () => (
            <Provider store={store}>
                <Component />
            </Provider>
        )

        return AnewProvider
    }

    connect = Config => {
        return typeof Config === 'function' ? connect(Config)(Config) : connect(Config)
    }
}

export default new AnewProvider()
