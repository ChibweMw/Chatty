import React, {Component} from 'react';

class Message extends React.Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.singleMessage.username}</span>
        <span className="message-content">{this.props.singleMessage.content}</span>
      </div>
    );
  }
}

export default Message;