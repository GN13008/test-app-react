import logo from './logo.svg';
import './App.css';
import React from 'react';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Guillaume',
  lastName: 'Negro'
};

function UserName(props) {
  return (
    <h1>Bonjour, {props.fullName} !</h1>
  )
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <h2>Il est {this.state.date.toLocaleTimeString()}.</h2>
    )
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // Cette liaison est nécéssaire afin de permettre
    // l'utilisation de `this` dans la fonction de rappel.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    console.log(e);
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.handleClick(e)}>
          {this.state.isToggleOn ? 'Bonjour' : 'Salut'}
        </button>
        <Coucou result={this.state.isToggleOn} />
      </div>
    );
  }
}

function Bonjour(props) {
  return <h3>Bonjour</h3>;
}

function Salut(props) {
  return <h3>Salut</h3>;
}

function Coucou(props) {
  const result = props.result;
  if (result) {
    return <Bonjour />;
  }
  return <Salut />;
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserName fullName={formatName(user)} />
        <Clock />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <br />
        <Toggle />
      </header>
    </div>
  );
}

export default App;