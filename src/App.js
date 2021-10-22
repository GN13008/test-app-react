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

// class Toggle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { isToggleOn: true };

//     // Cette liaison est nécéssaire afin de permettre
//     // l'utilisation de `this` dans la fonction de rappel.
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(e) {
//     this.setState(state => ({
//       isToggleOn: !state.isToggleOn
//     }));
//     console.log(e);
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={(e) => this.handleClick(e)}>
//           {this.state.isToggleOn ? 'Bonjour' : 'Salut'}
//         </button>
//         <Coucou result={this.state.isToggleOn} />
//       </div>
//     );
//   }
// }

// function Bonjour(props) {
//   return <h3>Bonjour</h3>;
// }

// function Salut(props) {
//   return <h3>Salut</h3>;
// }

// function Coucou(props) {
//   const result = props.result;
//   if (result) {
//     return <Bonjour />;
//   }
//   return <Salut />;
// }

function Sidebar(props) {
  return (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.Name}
        </li>
      )}
    </ul>
  );
}

function Content(props) {
  return (
    props.posts.map((post) =>
      <div key={post.id}>
        <h3>{post.Name}</h3>
        <p>{post.content}</p>
      </div>
    )
  );
}

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
    this.state = {
      file: props.file,
      posts: posts
    };
  }

  componentDidMount() {
    this.callAPI(this.state.file)
  }

  componentDidUpdate(prevProps) {
    if (this.props.file !== prevProps.file) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.callAPI(this.state.file);
    }
  }

  callAPI(file) {
    fetch(`https://raw.githubusercontent.com/gn13008/data_json/master/${file}.json`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          posts: data
        });
      });
  }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  // tick() {
  //   this.setState({
  //     date: new Date()
  //   });
  // }

  render() {
    return (
      <div>
        <p>le state : {this.state.file}, le props : {this.props.file}</p>
        <QuelFichier file={this.props.file} />
        <hr />
        <Sidebar file={this.props.file} posts={this.state.posts} />
        <hr />
        <Content file={this.props.file} posts={this.state.posts} />
      </div>
    )
  }
}

// On test d'appeler les posts depuis un repo github
const posts = [
  { id: 1, Name: 'Bonjour, monde', content: 'Bienvenue sur la doc de React !' },
  { id: 2, Name: 'Installation', content: 'Vous pouvez installer React depuis npm.' }
];

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { value: 'test2' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(event) {
    alert('Le nom a été soumis : ' + this.state.value);
    // this.setState((state) => ({ value: state.value }));
    event.preventDefault();
  }

  render() {
    const file = this.state.value;
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <label>
            Nom du fichier :
            <br />
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="test">Test</option>
              <option value="test2">Test 2</option>
            </select>
            <br />
          </label>
          {/* <input type="submit" value="Charger les données" /> */}
        </form>
        <Blog file={file} />
      </div>
    );
  }
}

// class Calculator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = { temperature: '' };
//   }

//   handleChange(e) {
//     this.setState({ temperature: e.target.value });
//   }

//   render() {
//     const temperature = this.state.temperature;
//     return (
//       <fieldset>
//         <legend>Saisissez la température en Celsius :</legend>
//         <input
//           value={temperature}
//           onChange={this.handleChange} />
//         <BoilingVerdict
//           celsius={parseFloat(temperature)} />
//       </fieldset>
//     );
//   }
// }

function QuelFichier(props) {
  if (props.file === "test2") {
    return <p>Il appelle test 2</p>;
  }
  return <p>Il appelle test 1</p>;
}

function App() {
  return (
    <div className="App">
      {/* <Calculator /> */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserName fullName={formatName(user)} />
        <Clock />
        <NameForm />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <br />
        {/* <Toggle /> */}
      </header>
    </div>
  );
}

export default App;