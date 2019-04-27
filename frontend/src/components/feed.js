
import React from "react";
import PropTypes from "prop-types";
import "./TweeterBody.css"

const Feed = ({ data }) =>
  !data.length ? (
    <p>Nothing to show</p>
  ) : (

      <div className="Feed">

        <ul>
          {data.map(el => (


            <li key={el.id}>
              <div className="avatar">
                <img src="https://i2.wp.com/www.mnleadership.org/wp-content/uploads/2017/02/Anonymous-Avatar.png?ssl=1" />
                <div className="hover">
                  <div className="icon-twitter"></div>
                </div>
              </div>
              <div className="bubble-container">
                <div className="bubble">
                  <h3>@{el.user}</h3><br />
                  {el.text}
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
    );

Feed.propTypes = {
  data: PropTypes.array.isRequired
};


export default Feed;