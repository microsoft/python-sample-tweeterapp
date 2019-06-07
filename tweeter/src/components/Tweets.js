import React, { Component } from 'react';
import PropTypes from "prop-types";
import "./Tweets.css"
import Cookies from 'js-cookie'

class Sentiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentiment: null
    }
  }
  
  componentDidMount() {
    this.getSentiment()
  }

  async getSentiment() {
    const response = await fetch('https://msbuildsentiment-demo.azurewebsites.net/' + this.props.message);
    const text = await response.text()
    this.setState({sentiment: text})
  }

  render() {
    if (this.state.sentiment == null) {
      return <div></div>
    }
    return (<div>Sentiment: {this.state.sentiment}</div>)
  }
}

class Tweets extends Component {
  constructor(props) {
      super(props);
      this.state = {
          addTweetText: '',
          tweets: props.tweets
      }
  }

  // Posts tweet text to /api/tweets and adds the response to the list of tweets
  async addTweet() {
      const response = await fetch("api/tweets/", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': Cookies.get('csrftoken')
          },
          body: JSON.stringify({
              text: this.state.addTweetText
          })
      })
      const data = await response.json();
      const newTweets = Object.assign([], this.state.tweets);
      newTweets.unshift(data)
      console.log(newTweets)
      this.setState({tweets: newTweets, addTweetText: ''})
  }
  
  render() {
      return (
      <div className="container">
        <div className="tweettext-container">
            <input 
              onChange={event => this.setState({addTweetText: event.target.value})} 
              value={this.state.addTweetText} 
              onKeyUp={event => {
                if (event.key == "Enter") {
                  this.addTweet()
                }
              }}
              placeholder="Say something . . ." 
              type="text" className="tweet"/>
            <button type="button" onClick={this.addTweet.bind(this)}>Tweet</button>
        </div>

        <div className="Feed">
          {this.state.tweets.length == 0 && <p>Nothing to show</p>}
          {this.state.tweets.map(tweet => (
            <div key={tweet.id} className="tweet">
              <div className="avatar">
                <i className="fa fa-user fa-4x"></i>
              </div>
              <div className="bubble-container">
                <div className="bubble">
                  <p className='username'>@{tweet.user}</p>
                  <p className='tweettext'>{tweet.text}</p>
                  <Sentiment message={tweet.text}></Sentiment>
                  <div className="over-bubble">
                    <div className='action-buttons'>
                      <i className='fa fa-reply'></i>
                      <i className='fa fa-retweet'></i>
                      <i className='fa fa-star'></i>
                    </div>
                  </div>
                </div>
                <div className="arrow"></div>
              </div>
            </div>
          ))}
        </div>
    </div>)
  }
}

Tweets.propTypes = {
  tweets: PropTypes.array.isRequired
};

export default Tweets;