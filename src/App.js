import logo from './logo.svg';
import './App.css';
import './Dialogue.css';
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

function Content(props) {
  return (
    props.posts.map((post) =>
      <div className="punchline" key={post.id}>
        <h3>{post.Name} :</h3>
        <p>"{post.content}"</p>
      </div>
    )
  );
}


// On test d'appeler les posts depuis un repo github
const posts = [
  { id: 1, Name: 'React', content: 'Bienvenue sur la doc de React !' },
  { id: 2, Name: 'React', content: 'Vous pouvez installer React depuis npm.' }
];

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.call = this.callAPI.bind(this);
    this.state = {
      file: props.file,
      posts: posts
    };
  }

  componentDidMount() {
    this.callAPI(this.props.file);
  }

  componentDidUpdate(prevProps) {
    if (this.props.file !== prevProps.file) // Check if it's a new file
    {
      this.callAPI(this.props.file);
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

  render() {
    return (
      <div className="dialogue">
        <hr />
        <Content file={this.props.file} posts={this.state.posts} />
      </div>
    )
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'test2' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const file = this.state.value;
    return (
      <div className="">
        <form>
          <div className="form-group">
            {/* TODO : Un peu de style dans ce form select */}
            <h3>Quel discussion veux tu lire ?</h3>
            {/* TODO : Générer la liste des conversation disponible */}
            <select className="form-control" value={this.state.value} onChange={this.handleChange}>
              <option value="test">Test</option>
              <option value="test2">Test 2</option>
            </select>
          </div>
          <br />
        </form>
        <Blog file={file} />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserName fullName={formatName(user)} />
        <Clock />
        <NameForm />
        <br />
      </header>
    </div>
  );
}

export default App;