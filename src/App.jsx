import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.addEventListener('message', (messageEvent) => {
                  const messageObject = JSON.parse(messageEvent.data);
                  // console.log(messageObject);
                  this.setState({
                    messages: [...this.state.messages, messageObject],
                  })
    });
    this.onPressEnter = this.onPressEnter.bind(this);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1 ,
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2 ,
        }
      ]
    };
  }

  sendMessage(messageText) {
    this.socket.send(messageText);
  }

  componentDidMount() { 
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  //send message and username to server
  onPressEnter(text){
    this.socket.send(JSON.stringify({message: text, username:this.state.currentUser.name}));
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser= {this.state.currentUser.name} onPressEnter = {this.onPressEnter}/>
      </div>
    );
  }

}
export default App;
