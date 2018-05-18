import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.myUser = this.myUser.bind(this);
    this.state = { 
      currentUser: {name: "Anonymous"}, 
      messages: []  
    };
    // this.focusNextField = this.focusNextField.bind(this);

  }
  //sending username & text to the server
  onPressEnter(text){
    this.socket.send(JSON.stringify({
      message: text, 
      username:this.state.currentUser.name
    }));
  }
  componentDidMount() { 
    //create connection
    this.socket = new WebSocket('ws://localhost:3001');
    //listen for messages
    this.socket.addEventListener('message', (messageEvent) => {
      const messageReceived = JSON.parse(messageEvent.data);
      const allMessages = this.state.messages.concat(messageReceived);
      console.log(allMessages);
      this.setState({messages: allMessages});
    });
  }

  myUser(username){
    if ((username!==this.state.currentUser.name)&&(this.state.currentUser.name !== "Anonymous")) {
      this.socket.send(
        JSON.stringify({
          oldname: this.state.currentUser.name,
          username:username,
          messageType:"notification"
        })
      );
    }
    
    this.setState({currentUser: {name: username}});
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar myuser={this.myUser} currentUser={this.state.currentUser.name}  onPressEnter={this.onPressEnter} />
      </div>
    );
  }
}
export default App;
