import React from 'react';
import axios from 'axios';

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} alt="Github user DP"style= {{width: '100px' ,height: '100px'}}/>
        <div className="info">
          <div className="name">{profile.name} </div>
          <div className="name">{profile.email} </div>
          <div className="company">{profile.company}</div>
          <div className="company">{profile.location}</div>
          Public Repositories : <span className="company">{profile.public_repos}</span>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = async (event) => {
  	event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  };
	render() {
  	return (
    	<form class="gituser_form" onSubmit={this.handleSubmit}>
        <h1> GitHub User Details Extractor </h1>
    	  <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button> <br />
    	</form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}


export default App;
