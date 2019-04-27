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
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

