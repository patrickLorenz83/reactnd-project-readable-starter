import React                                     from 'react'
import ReactDOM                                  from 'react-dom'
import './index.css'
import App                                       from './App'
import registerServiceWorker                     from './registerServiceWorker'
import { Provider }                              from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk                                     from 'redux-thunk'
import reducer                                   from './reducers'
import { BrowserRouter }                         from 'react-router-dom'

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composedEnhancers(
        applyMiddleware(thunk)
    ))

ReactDOM.render(
    <BrowserRouter>
        <Provider store={ store }>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'))
registerServiceWorker()
