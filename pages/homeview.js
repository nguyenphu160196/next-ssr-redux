import React, {Component} from 'react'
import {FormControl, FormGroup, ControlLabel, HelpBlock, Button} from 'react-bootstrap'
import Router from 'next/router'
import Auth from '../lib/auth'
const isBrowser = typeof window !== 'undefined'
var auth

class HomeView extends Component {

  state = {

  }

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    auth = new Auth()
  }

  loginGuess(e) {
    e.preventDefault()
    let submit = e.target
    submit.disabled = true
    let data = {
      email: 'guest',
      password: 'guest',
    }
    data.deviceAPNSToken = 'deviceAPNSToken'
    data.deviceFcmToken = 'deviceFcmToken'
    auth.login(data)
    .then(res => {
      console.log(res)
      if(res.success){
        this.setState({error: ""})
        Router.push('/job')
      }
    })
    .catch(err => {
      this.setState({error: 'An Error Occurred!'})
      submit.disabled = false
    })
  }

  render() {
    let {error} = this.state
    return(
      <div className="main-view">
        <div className="flex-center">
          <div className="login-form">
            <div className="flex-center" style={{marginBottom: '20px'}}>
              <div className="app-logo original text inline-block"></div>
            </div>
            <div className="flex-center" style={{marginBottom: '20px'}}>
              <div style={{fontSize: 18, color: 'rgba(0,0,0,0.6)', textAlign: 'center', width: '80%'}}>
              	THE LEADING INDUSTRIAL PARK & TOWNSHIP DEVELOPER IN VIETNAM
              </div>
            </div>
            <Button onClick={e => Router.push('/login')} bsStyle="primary" bsSize="large" block>
    	      LOGIN
    	    </Button>
    	    <Button onClick={e => this.loginGuess(e)} bsSize="large" block >
    	      GUEST
    	    </Button>
          {error && <div style={{color: 'red'}}>{error}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
