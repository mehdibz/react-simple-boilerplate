import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
  super(props);
  this.state = {inputValue:""};
  this.sendingTxt = this.sendingTxt.bind(this);
  }

  sendingTxt(keyEvent) {
    if (keyEvent.key === 'Enter') {
      this.props.onPressEnter(keyEvent.target.value)
      keyEvent.target.value = "";
    }
    else {
      this.change(keyEvent.target.value);
    }
  }

  change(Value) {
    this.setState({ Value });
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value= {this.props.currentUser} />
        <input className="chatbar-message" onKeyPress={this.sendingTxt} placeholder="Type a message and hit ENTER"/>
      </footer>
    );
  }
}
export default ChatBar;





