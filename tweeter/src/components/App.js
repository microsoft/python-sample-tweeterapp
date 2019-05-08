import React, { Component } from 'react'
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import DataProvider from "./DataProvider"
import Tweets from "./Tweets"
import "./App.css"
import {Login, Signup} from './Auth'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addTweetText: '',
            tweets : []
        }
    }
   
    render() {
        return (
            <Router>
                <h1 className="header">Tweeter @ #MSBuild!!</h1>
                <div id="inner-body">
                    <div id="menubar">
                        <div className="icon-bar">
                            <a className="active" href="#"><i className="fa fa-home"></i></a> 
                            <a href="#"><i className="fa fa-search"></i></a> 
                            <a href="#"><i className="fa fa-envelope"></i></a> 
                            <a href="#"><i className="fa fa-globe"></i></a>
                        </div>
                        <DataProvider 
                            endpoint="/accounts/current"
                            render= {me => {
                                return (
                                    <div>
                                        {me ? <p>Logged in as {me.username}. <a href="/accounts/logout">Logout</a></p>
                                            : <p>You are not logged in. <a href="/signup">Create a new account</a> or <a href="/login">login</a>.</p>
                                        }
                                    </div>
                                )
                            }}
                        />
                    </div>

                    <Route path="/" exact component={() => <DataProvider 
                        endpoint="/api/tweets/"
                        render= {tweets => {
                            return (
                                <div>
                                    <Tweets tweets={tweets}/>
                                </div>
                            )
                        }}
                        />} />
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>

                </div>

            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

