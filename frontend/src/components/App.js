import React, { Component } from 'react';
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Feed from "./Feed";
import "./TweeterBody.css";
import "./App.css";




class Tweets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetBeingTyped: '',
            tweetsAdded : []
        }
    }

    addATweetToState() {
        const tweetsAdded = Object.assign({}, this.state.tweetsAdded);
        tweetsAdded.push(this.state.tweetBeingTyped);
        this.setState({
            tweetsAdded,
            tweetBeingTyped: ''
        });
            fetch("api/tweets/", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(tweetsAdded)
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (tweetsAdded) {
                    console.log("your tweet was posted...here it is:", tweetsAdded)
                });

    }

    typingTweet(e){
        console.log("THE EVENT IS :", e);
        this.setState({tweetBeingTyped: e.target.value})

    }
    
    render() {

        return (<div className="container">
        <div className="tweet-container">
            <input onChange={this.typingTweet.bind(this)} placeholder="Say something . . ." type="text" className="tweet" style={{'width':'1000px'}}/>
            <button type = "button" onClick={this.addATweetToState.bind(this)} className="btn-tweet" id="tweet"> Tweet</button>
        </div>

        <DataProvider 
            endpoint="api/tweets/"
            tweetStateFromParent={this.state.tweetsAdded} 
            render= {data => {
                console.log(data)
                return (
                    <div>
                        <Feed data={data} className = "Feed" />
                    </div>

                )

            }}
        />
        </div>)
    
    }
}

ReactDOM.render(<Tweets />, document.getElementById("app"));

