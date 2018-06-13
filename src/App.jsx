import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Kamina"},
      messages: []
    }
  }

  handleMessage = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      const newMessage = { type: "postMessage", username: this.state.currentUser.name, content:e.target.value}
      this.socket.send(JSON.stringify(newMessage))

      this.socket.onmessage = (event) => {
        console.log(event.data);
        const receivedMessage = JSON.parse(event.data);
        const messages = this.state.messages.concat(receivedMessage);
        this.setState({messages: messages});
      }
      e.target.value = "";
    }
  }

  changeUserName = (e) => {
    this.setState({currentUser: {name: e.target.value}})
    console.log(this.state.currentUser.name);
  }

  componentDidMount () {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001")

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList message={this.state.messages}/>
        <ChatBar currName={this.state.currentUser} sendMessage={this.handleMessage} editUserName={this.changeUserName}/>
      </div>
    );
  }
}
export default App;
