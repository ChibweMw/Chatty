import React, {Component} from 'react';

import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    const availableMessages = this.props.message
    return (
      <main className="messages">
        {availableMessages.map(userMessage => {
            return <Message singleMessage={userMessage} key={userMessage.id}/>
        })}
        <Notification />
      </main>
    );
  }
}

export default MessageList;