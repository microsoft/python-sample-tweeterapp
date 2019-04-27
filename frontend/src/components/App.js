import React, { Component } from 'react';
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Tweets from "./Tweets";
import "./TweeterBody.css";
import "./App.css";

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
            <div>
                <h1 class = "first">Tweeter</h1>
                <div class="icon-bar">
                <a class="active" href="#"><i class="fa fa-home"></i></a> 
                <a href="#"><i class="fa fa-search"></i></a> 
                <a href="#"><i class="fa fa-envelope"></i></a> 
                <a href="#"><i class="fa fa-globe"></i></a>
                </div>
            
                <DataProvider 
                    endpoint="api/tweets/"
                    render= {tweets => {
                        return (
                            <div>
                                <Tweets tweets={tweets}/>
                            </div>
                        )
                    }}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

