import React, {Component} from 'react';

import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  constructor(){
    super()
    this.state = {
      messageCount: 0
    }

    this.scrollDiv = null;
  }

  setScroll = (el) => {
    if (!this.scrollDiv) this.scrollDiv = el;
  }
  Scroll = () => {
    console.log(`>> =======================`)
    if (this.scrollDiv) this.scrollDiv.scrollIntoView({ behavour: "smooth" });
  }
  render() {
    const availableMessages = this.props.message
    const numberOfMessages = availableMessages.length
    return (
      <main className="messages" style={{marginBottom: 11 + 'vh'}}>
        {availableMessages.map((userMessage) => {
          if (userMessage.type === "incomingNotification") {
            console.log("Message type is",userMessage.type)
            return <Notification {...userMessage} key={userMessage.id}/>
          } else if(userMessage.type === "incomingMessage" || "incomingImage") {
            return <Message {...userMessage} key={userMessage.id}/>
          }
        })}
        { this.Scroll() }
        <div ref={ this.setScroll }></div>
      </main>
    );
  }
}

export default MessageList;