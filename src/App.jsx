import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  addMessage = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      console.log("NEW MESSAGE:", e.target.value,"BY", this.state.currentUser.name);
      const newMessage = { username: this.state.currentUser.name, content:e.target.value};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
      e.target.value = "";
    }
  }

  componentDidMount () {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList message={this.state.messages}/>
        <ChatBar currName={this.state.currentUser} sendMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
