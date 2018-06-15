import React, {Component} from 'react';

import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    const availableMessages = this.props.message
    return (
      <main className="messages">
        {availableMessages.map((userMessage) => {
          if (userMessage.type === "incomingNotification") {
            console.log("Message type is",userMessage.type)
            return <Notification {...userMessage} key={userMessage.id}/>
          } else if(userMessage.type === "incomingMessage" || "incomingImage") {
            return <Message {...userMessage} key={userMessage.id}/>
          }
        })}
      </main>
    );
  }
}

export default MessageList;