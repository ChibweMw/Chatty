import React, {Component} from 'react';

class ChatBar  extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input onBlur={(event) => this.props.editUserName(event)} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currName.name}/>
        <input onKeyDown={(event) => this.props.sendMessage(event)} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar