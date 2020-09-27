import React ,  {Component} from 'react';
import './App.css';
import Validation from './Validation/Validation';
import axios from 'axios';

class App extends Component {

  state = {
    userInput: '',
    showPassword: false,
    specialSymbol: false,
    hasNumber: false,
    hasUpperCase: false,
    passwords: []
  }

  componentDidMount() {
    axios.get('/api/password').then(res => {
      let passwordsFromAPI = res.data;
      this.setState({
        passwords: passwordsFromAPI
      })
    })
  }

  onInputChangeHandler = (event) => {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let specialSymbolPresent = false;
    let numberPresent = false;
    let upperCasePresent = false;
    if(format.test(event.target.value)) {
      specialSymbolPresent = true;
    } 
    if(/\d/.test(event.target.value)) {
      numberPresent = true;
    }
    
    let string = event.target.value;
    let i = 0;
    let char = '';
    while (i < string.length) {
      char = string.charAt(i);
      if(char === char.toUpperCase()) {
        upperCasePresent = true
      }
      i++;
    }

    this.setState({
      userInput: event.target.value,
      specialSymbol: specialSymbolPresent,
      hasNumber: numberPresent,
      hasUpperCase: upperCasePresent
    })
  }

  showPasswordHandler = () => {
    let showPassword = this.state.showPassword
    this.setState({
      showPassword: !showPassword
    })
  }

  savePassword = () => {
    axios.post('/api/password', {'password': this.state.userInput}).then(response => {
      axios.get('/api/password')
      .then(res => {
        let passwordsFromAPI = res.data;
        this.setState({
          passwords: passwordsFromAPI,
          userInput: ''
        })
      })
    })
  }
  
  render() {
    return (
      <div className="App">
        <h1>Password Validator</h1>
        <Validation password={this.state.userInput} 
        specialSymbolPresent={this.state.specialSymbol}
        numberPresent={this.state.hasNumber}
        upperCasePresent={this.state.hasUpperCase}
        ></Validation>
        <h3>Please enter your Password Below: </h3> 
        <input type="password" onChange={(event) => this.onInputChangeHandler(event)}></input>
        { this.state.showPassword ?
          <button onClick={this.showPasswordHandler}>Hide Password</button> :
          <button onClick={this.showPasswordHandler}>Show Password</button>
        }
        {this.state.showPassword ?
          <div>
            <p>{this.state.userInput}</p>
          </div>: null
        }
        <button style={{display: 'block', margin: '10px auto', cursor: 'pointer'}} onClick={this.savePassword}> Save Password</button> 

        <h3>Here are all the valid Passwords: </h3>
        <ul>
          {
            this.state.passwords.map(pass => (
              <li key={pass._id}>{pass.password}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
