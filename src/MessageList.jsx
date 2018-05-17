import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	  const message = this.props.messages.map(array => {
	    return (
	      <div className="message" key={array.id}>
	        <span className="message-username">{array.username}</span>
	        <span className="message-content">{array.content}</span>
	      </div>);
	  });

    return (
      <main className="messages">
	      <Message /> {message}
	      <div className="message system">
	        Anonymous1 changed their name to nomnom.
	      </div>
      </main>
    );
  }
}

export default MessageList;
