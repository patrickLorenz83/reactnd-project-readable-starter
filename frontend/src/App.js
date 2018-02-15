import React, { Component } from 'react'
import './App.css'
import { Route, Switch }    from 'react-router-dom'
import MainView             from './components/containers/MainView'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route excat
                           path="/"
                           component={ MainView }/>
                </Switch>
            </div>
        )
    }
}

export default App
