import React, { Component } from 'react'
import './App.css'
import { Route, Switch }    from 'react-router-dom'
import MainView             from './components/views/MainView'
import CategoryView         from './components/views/CategoryView'
import PostView             from './components/views/PostView'

class App extends Component {

    render(){
        return (
            <div className="App">
                <Switch>
                    <Route exact
                           path="/"
                           component={ MainView }/>
                    <Route path='/category/:category(react|redux|udacity)'
                           component={ CategoryView }/>
                    <Route path='/post/:postId'
                           component={ PostView }/>
                </Switch>
            </div>
        )
    }
}

export default App
