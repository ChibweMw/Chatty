import React, {Component} from 'react';

import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    const availableMessages = this.props.message
    return (
      <main className="messages">
        {availableMessages.map((userMessage, id) => {
            return <Message singleMessage={userMessage} key={id}/>
        })}
        <Notification />
      </main>
    );
  }
}

export default MessageList;