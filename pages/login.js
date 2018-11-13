import React, {Component} from 'react'
import { connect } from 'react-redux'
import {FormControl, FormGroup, ControlLabel, HelpBlock, Button, Modal} from 'react-bootstrap'
import Router from 'next/router'
import Auth from '../lib/auth'
import {forgetPassword} from '../lib/api'
var auth

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


class Login extends Component {
  state = {
    email: '',
    password: '',
    errorHelper: {color: '', mess: ''},
    loginMessage: ''
  }
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    auth = new Auth()
  }

  loginSubmit(e) {
    console.log(auth)
    e.preventDefault()
    let submit = e.target.querySelector('[type=submit]')
    submit.disabled = true
    let data = {...this.state}
    data.deviceAPNSToken = 'deviceAPNSToken'
    data.deviceFcmToken = 'deviceFcmToken'
    auth.login(this.state)
    .then(res => {
      if(res.success){
        browserHistory.push('/dashboard')
      }
    })
    .catch(err => {
      submit.disabled = false
      this.setState({loginMessage: "You have entered an invalid username or password!"})
    })
  }

  fieldChange(value) {
    if(value) {
      this.setState(value);
      this.setState({loginMessage: ''})
    }
  }

  passwordForgotten(e){
    e.preventDefault()
    let submit = e.target.querySelector('[type=submit]')
    submit.disabled = true
    let {emailAccount, errorHelper} = this.state
    forgetPassword({'email':emailAccount})
    .then(res => {
      if(res.success){
        errorHelper.color = 'red'
        errorHelper.mess = res.results.message
      }else{
        submit.disabled = false
        errorHelper.color = 'green'
        errorHelper.mess = res.results.message
      }
      this.setState({errorHelper})
    })
  }

  render() {
    const {email,password, showPassForgot, errorHelper, loginMessage} = this.state
    return(
      <div className="main-view">
        <div className="flex-center">
          <form className="login-form" onSubmit={e => this.loginSubmit(e)}>
            <div className="flex-center">
              <div className="app-logo original text inline-block"></div>
            </div>
            <h2 className="text center">Login</h2>
            <FieldGroup
              type="email"
              label="Email"
              value={email}
              required="required"
              placeholder="Email"
              onChange={e=> this.fieldChange({email:e.target.value})}
            />
            <FieldGroup
              type="password"
              label="Password"
              value={password}
              required="required"
              placeholder="Password"
              onChange={e=> this.fieldChange({password:e.target.value})}
            />
            <div style={{cursor: 'pointer', marginBottom: 15}}>
              <a onClick={_ => {
                this.setState({showPassForgot: true})
              }}>Forgot Password?</a>
            </div>

            <Modal show={showPassForgot} onHide={_ => this.setState({showPassForgot: false, errorHelper:''})}>
              <form onSubmit={e => this.passwordForgotten(e)}>
                <Modal.Header>
                  <Modal.Title>
                  Forgot Password
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FieldGroup
                      label="Email Account"
                      required='required'
                      type='email'
                      placeholder="Please enter your email account"
                      onChange={e=> {
                        this.setState({emailAccount: e.target.value})
                      }}
                    />
                    {!!errorHelper && <div style={{color: errorHelper.color}}>{errorHelper.mess}</div>}
                </Modal.Body>
                <Modal.Footer>
                  <Button className="btn"
                    onClick={_ => {this.setState({showPassForgot: false})}}
                  >Cancel</Button>
                  <Button className="btn btn-primary"
                          type="submit"
                  >Submit</Button>
                </Modal.Footer>
              </form>
            </Modal>

            <Button bsStyle="success" type="submit">Login</Button>
            <div style={{color: 'red', marginTop: 10, textAlign: 'center'}}>{loginMessage}</div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(Login)