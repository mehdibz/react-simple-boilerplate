import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.onPressEnter = this.onPressEnter.bind(this);
    this.state = { currentUser: {name: "Bob"}, messages: []  };
  }
  //sending username & text to the server
  onPressEnter(text){
    this.socket.send(JSON.stringify({message: text, username:this.state.currentUser.name}));
  }
  componentDidMount() { 
    //create connection
    this.socket = new WebSocket('ws://localhost:3001');
    //listen for messages
    this.socket.addEventListener('message', (messageEvent) => {
      const messageReceived = JSON.parse(messageEvent.data);
      // const messageContent = JSON.parse(messageReceived.text);
      // console.log(messageReceived);
      const allMessages = this.state.messages.concat(messageReceived);
      console.log(allMessages);
      this.setState({messages: allMessages});
    });
  }
  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser= {this.state.currentUser.name} onPressEnter = {this.onPressEnter} />
      </div>
    );
  }
}
export default App;
