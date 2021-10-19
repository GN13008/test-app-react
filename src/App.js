import logo from './logo.svg';
import './App.css';

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

// function Clock(props) {
//   return (
//     <div>
//       <h1>Bonjour, monde !</h1>
//       <h2>Il est {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }

// function tick() {
//   ReactDOM.render(
//     <Clock date={new Date()} />,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserName fullName={formatName(user)} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;