import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.sendingTxt = this.sendingTxt.bind(this);
    this.myUser = this.myUser.bind(this);
  }

  sendingTxt(keyEvent) {
    if (keyEvent.key === 'Enter') {
      this.props.onPressEnter(keyEvent.target.value);
      keyEvent.target.value = "";
    }
    else {
      this.change(keyEvent.target.value);
    }
  }
  myUser(event){
      this.props.myuser(event.target.value);
  }

  handleChange(event) {
    // this.setState({value: event.target.value});
  }

  change(message) {
    this.setState({ message });
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onBlur={this.myUser}  value={this.state.value} onChange={this.handleChange} placeholder="Anonymous" />
        <input className="chatbar-message" onKeyPress={this.sendingTxt} placeholder="Type a message and hit ENTER"/>
      </footer>
    );
  }
}
export default ChatBar;

