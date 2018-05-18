import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	  const message = this.props.messages.map(singleMessage => {
      
      return (<Message key={singleMessage.id} singleMessage ={singleMessage} 
                />)
	  });

    return (
      <main className="messages">
	    {message}

      </main>
    );
  }
}

export default MessageList;
