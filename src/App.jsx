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

  handleMessage = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      const newMessage = { type: "postMessage", username: this.state.currentUser.name || "Anonymous", content:e.target.value}
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
      console.log(newNotification);
      this.socket.send(JSON.stringify(newNotification));
    }
  }

  componentDidMount () {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onmessage = (event) => {
      console.log(`Incoming Message: ${event.data} is a ${typeof(event.data)}`);

      const receivedMessage = JSON.parse(event.data);

      switch(receivedMessage.type){
        case "incomingMessage":
          const messages = this.state.messages.concat(receivedMessage);
          this.setState({messages: messages});
          break;
        case "incomingNotification":
          console.log(`NOTIFICATION RECEIVED: ${receivedMessage.content}`);
          const newNotification = this.state.messages.concat(receivedMessage);
          this.setState({messages: newNotification});
          break;
        case "userCounter":
          console.log(`USER COUNT CLIENT SIDE ${receivedMessage.content} is a ${typeof(receivedMessage.content)}`)
          this.setState({userCount: receivedMessage.content});
          break;
        default:
          console.error(`UNKNOWN DATA TYPE: ${receivedMessage.type}`);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 className="navbar-user-count">{this.state.userCount ? `${this.state.userCount} users online` : `No Users`}</h3>
        </nav>
        <MessageList message={this.state.messages} />
        <ChatBar currName={this.state.currentUser} sendMessage={this.handleMessage} editUserName={this.changeUserName}/>
      </div>
    );
  }
}
export default App;
