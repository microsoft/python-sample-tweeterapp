import React, { Component } from 'react';
import PropTypes from "prop-types";
import "./TweeterBody.css"
import Cookies from 'js-cookie'

class Tweets extends Component {
  constructor(props) {
      super(props);
      this.state = {
          addTweetText: '',
          tweets : props.tweets
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
        <div className="tweet-container">
            <input 
              onChange={event => this.setState({addTweetText: event.target.value})} 
              value={this.state.addTweetText} 
              onKeyUp={event => {
                if (event.key == "Enter") {
                  this.addTweet()
                }
              }}
              placeholder="Say something . . ." 
              type="text" className="tweet" style={{'width':'1000px'}}/>
            <button type = "button" onClick={this.addTweet.bind(this)} className="btn-tweet" id="tweet"> Tweet</button>
        </div>

        <div className="Feed">
          {this.state.tweets.length == 0 && <p>Nothing to show</p>}
          <ul>
            {this.state.tweets.map(tweet => (
              <li key={tweet.id}>
                <div className="avatar">
                  <img src="https://i2.wp.com/www.mnleadership.org/wp-content/uploads/2017/02/Anonymous-Avatar.png?ssl=1" />
                  <div className="hover">
                    <div className="icon-twitter"></div>
                  </div>
                </div>
                <div className="bubble-container">
                  <div className="bubble">
                    <h3>@{tweet.user}</h3><br />
                    {tweet.text}
                    <div className="over-bubble">
                      <div className="icon-mail-reply action"></div>
                      <div className="icon-retweet action"></div>
                      <div className="icon-star"></div>
                    </div>
                  </div>
                  <div className="arrow"></div>
                </div>
              </li>

            ))}
          </ul>
        </div>
    </div>)
  }
}

Tweets.propTypes = {
  tweets: PropTypes.array.isRequired
};

export default Tweets;