import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render()  {
  	var customStyle = {
      color: this.props.eachMessage.messageColor
    }
    return (
      <div className="message">
        <div><span style style={customStyle} className="message-username">{this.props.eachMessage.username}</span></div>
        <span className="message-content">{this.props.eachMessage.content}</span>
        <div><img className="message-image"  src= {this.props.eachMessage.content}/></div>
      </div>
    );
  }
}

export default Message;
