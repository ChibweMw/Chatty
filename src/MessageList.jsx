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

  // Set the property to the selected component to be used as a scroll div
  // The scroll div is for auto scroll reference
  setScroll = (el) => {
    if (!this.scrollDiv) this.scrollDiv = el;
  }

  // Scroll the div into view once it is out of 'view'
  Scroll = () => {
    console.log(`>> =======================`)
    if (this.scrollDiv) this.scrollDiv.scrollIntoView(true);
    // if (this.scrollDiv) this.scrollDiv.scrollIntoView({ behavour: "smooth" });
  }
  // From Docs: "By default, the element is aligned to the top (or bottom) edge of the scrollable ancestor. 
  // To define a custom spacing, use 'scroll-margin-top' or 'scroll-margin-bottom'. 
  // This is often useful when there's a fixed header on the page."
  render() {
    const availableMessages = this.props.message
    const numberOfMessages = availableMessages.length
    return (
      <main className="messages" style={{paddingBottom: 20 + 'px'}}>
        {availableMessages.map((userMessage) => {
          if (userMessage.type === "incomingNotification") {
            console.log("Message type is",userMessage.type)
            return <Notification {...userMessage} key={userMessage.id}/>
          } else if(userMessage.type === "incomingMessage" || "incomingImage") {
            return <Message {...userMessage} key={userMessage.id}/>
          }
        })}
        { this.Scroll() }
        <div ref={ this.setScroll } ></div>
        {/* <div ref={ this.setScroll } style={{paddingTop: 20 + 'px'}} ></div> */}
      </main>
    );
  }
}

export default MessageList;