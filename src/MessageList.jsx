import React, {Component} from 'react';

import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    const availableMessages = this.props.message
    return (
      <main className="messages">
        {availableMessages.map((userMessage) => {
          if(userMessage.type === "incomingMessage") {
            return <Message singleMessage={userMessage} key={userMessage.id}/>
          } else if (userMessage.type === "incomingNotification") {
            return <Notification notify={userMessage} key={userMessage.id}/>
          }
        })}
      </main>
    );
  }
}

export default MessageList;