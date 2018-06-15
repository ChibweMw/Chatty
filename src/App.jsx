import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: [],
      userCount: ''
    }
  }

  handleOutgoingMessage = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false && e.target.value) {
      const isImg = /https?:\/.*(?:.jpg|.png|.gif)/gi;
      const imgMessage = {
        type: "postImage",
        username: this.state.currentUser.name || "Anonymous",
        content:e.target.value.replace(isImg, ""),
        image:e.target.value.match(isImg)
      };
      const textMessage = {
        type: "postMessage",
        username: this.state.currentUser.name || "Anonymous",
        content:e.target.value
      };

      let newMessage = {};
      if (e.target.value.match(isImg)) {
        newMessage = imgMessage;
      } else {
        newMessage = textMessage;
      }
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  }

  changeUserName = (e) => {
    if (e.target.value){
      this.setState({currentUser: {name: e.target.value}})
      const newNotification = {
        type: "postNotification",
        content: this.state.currentUser.name ? `'${this.state.currentUser.name}' has changed their name to '${e.target.value}'`
        : `Welcome '${e.target.value}!'`
      }
      this.socket.send(JSON.stringify(newNotification));
    }
  }

  componentDidMount () {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);

      switch(receivedMessage.type){
        case "incomingMessage":
          const messages = this.state.messages.concat(receivedMessage);
          this.setState({messages: messages});
          break;
        case "incomingNotification":
          const newNotification = this.state.messages.concat(receivedMessage);
          this.setState({messages: newNotification});
          break;
        case "userCounter":
          this.setState({userCount: receivedMessage.content});
          break;
        case "incomingImage":
          let chatImage = (<div><img className="chat-img" src={receivedMessage.image[0]} /></div>);
          receivedMessage.image = chatImage;
          const newImageMessage = this.state.messages.concat(receivedMessage);
          this.setState({messages: newImageMessage});
          break;
        default:
          console.error(`ERROR: UNKNOWN DATA TYPE: ${receivedMessage.type}`);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 className="navbar-user-count">{this.state.userCount ? `${this.state.userCount} Users Online` : `No Users Online`}</h3>
        </nav>
        <MessageList message={this.state.messages} />
        <ChatBar currName={this.state.currentUser} sendMessage={this.handleOutgoingMessage} editUserName={this.changeUserName}/>
      </div>
    );
  }
}
export default App;
