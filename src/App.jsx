import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
var msgColor="";
class App extends Component {

  constructor(props) {
    super(props);
    this.onPressEnter = this.onPressEnter.bind(this);
    this.myUser = this.myUser.bind(this);
    this.state = { 
      currentUser: {name: "Anonymous"}, 
      messages: [],
      userCounter: ""  
    };
  }

  //sending username & text to the server
  onPressEnter(text){
    this.socket.send(JSON.stringify({
      message: text, 
      username:this.state.currentUser.name,
      messageType:"message",
      messageColor: msgColor
    }));
  }
  componentDidMount() { 
    //create connection
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    //listen for messages
    this.socket.addEventListener('message', (messageEvent) => {
      const messageReceived = JSON.parse(messageEvent.data);
      if (msgColor === "") {
        msgColor = colorGenerator();
      }
      switch(messageReceived.messageType){
        case "userCounter":
          this.setState({
            NumberOfuser: messageReceived.NumberOfuser
          });
        break;
        default:
          this.setState({
            messages: this.state.messages.concat(messageReceived),
            messageColor: msgColor
          });
        }
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
    this.setState({
      currentUser: {name: username},
      messageColor: msgColor
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <a className="navbar-userCounter">{this.state.NumberOfuser} users online</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar myuser={this.myUser} currentUser={this.state.currentUser.name}  onPressEnter={this.onPressEnter} />
      </div>
    );
  }
}
//Color generator
function colorGenerator() {
  var color = ['orange', 'pink', 'Olive', 'red', 'green', 'brown', 'blue'];
  var value = Math.floor(Math.random() * color.length);
  return color[value];
}
export default App;
