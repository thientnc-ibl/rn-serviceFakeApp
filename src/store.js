import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'

import reducers from './reducers'
import epics from './modules/epics'

const epicMiddleware = createEpicMiddleware(epics)

export default () => {
    const store = createStore(
        reducers,
        composeWithDevTools(applyMiddleware(epicMiddleware, thunk))
    )

    return store
}