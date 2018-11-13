import React from 'react'
import Router from 'next/router'
import {Grid,Row,Col, Modal, Button, FormControl, ProgressBar} from 'react-bootstrap'
import {updateUser, getFile, uploadFile} from '../services/api'
import Auth from '../services/auth'
const auth = new Auth()

class Header extends React.Component {

  constructor(props){
    super(props);
  }

  state = {
    show: false,
    edit: true,
  };

  componentDidMount(){
    auth.getToken()
    let user = auth.getInfo()
    if(!!user.avatar){
      new Promise(resolve => {
        getFile(user.avatar.path)
        .then(res => {
            resolve(window.URL.createObjectURL(new Blob([res])))
        })
      })
      .then(res => {
        this.setState({tel: user.tel, name: user.name, avatar: res})
      })
    }
  }   

  updateProfile(){
    let user = auth.getInfo()
    let {file, avatar} = this.state
    let body = {
      "_id": user._id,
      "email": user.email,
      "avatar": '',
      "company": user.tenants._id,
      "name": this.name.value,
      "tel": this.tel.value,
      "sex": user.sex,
      "role": user.role
    }

    new Promise(resolve => {
      if(!!file && !!file.files){
        let formData = new FormData()
        formData.append("attachment", file.files)
  
        uploadFile(formData)
        .then(res => {
          if(res.success){
            resolve(res.results[0])
          }
        })
      }else{
        resolve("")
      }
    })
    .then(data => {
      body.avatar = data != '' ? data._id : user.avatar
      updateUser(body)
      .then(res => {
          user.name = body.name
          user.tel = body.tel
          user.avatar = data != '' ? data : user.avatar
          localStorage.setItem('user', JSON.stringify(user))
          this.setState({tel: body.tel, name: body.name, avatar: data != '' ? file.avatar : avatar})
      })
    })
  }

  render () {
    let user = auth.getInfo()
    let {avatar, name, tel, email, edit, show, file} = this.state
    let {main} = this.props
    return (
      <div className="header-bar-mother">
        <div className='header-bar justify-content-space-between'>
          <div className='app-logo'></div>
          <div className='search-bar'></div>

          <div className='user-login display-flex align-items-center' style={{cursor: 'pointer'}}
            onClick={_ => {
              this.setState({show: true, edit: true});
            }}
          >
            <div className="avatar" type="user"
                style={{
                  backgroundImage: `url(${!!avatar && avatar})`,
                  backgroundSize: '100% 100%'
                }}
            ></div>
            <a>{!!user && user.name}</a>
          </div>
          <Modal show={!!show && show} onHide={_ => {this.setState({show: false})}}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Profile
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className="display-flex" style={{marginBottom: 10}}>
                    <label style={{margin: 'auto', cursor: 'pointer', display: edit && 'none'}}>
                      <div className="avatar" type="user"
                          style={{
                            backgroundImage: `url(${!!file ? file.avatar : avatar})`,
                            backgroundSize: '100% 100%',
                            width: 45,
                            height: 45
                          }}
                      ></div>
                        <input type="file" className="hidden" 
                              onChange={e => {
                                this.setState({file: {avatar: window.URL.createObjectURL(e.target.files[0]), files: e.target.files[0]}})
                              }}
                        />
                    </label>
                    <div className="avatar" type="user"
                          style={{
                            display: !edit && 'none',
                            backgroundImage: `url(${!!avatar && avatar})`,
                            backgroundSize: '100% 100%',
                            width: 45,
                            height: 45,
                            margin: 'auto'
                          }}
                      ></div>
                  </div>
                  <Grid className="panel-grid-s" fluid={true}>
                    <Row className="display-flex align-items-center">
                      <Col xs={1} md={1} className="label-letter">Name: </Col>
                      <Col xs={11} md={11} style={{display: !edit && 'none'}}>{!!user && user.name}</Col>
                      <Col xs={11} md={11} style={{display: edit && 'none'}}>
                        <FormControl 
                          type="text"
                          defaultValue={name}
                          inputRef={input => {this.name = input;}}
                          onChange={e => {
                            this.setState({name: e.target.value});
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="display-flex align-items-center">
                      <Col xs={1} md={1} className="label-letter">Tel: </Col>
                      <Col xs={11} md={11} style={{display: !edit && 'none'}}>{!!user && user.tel}</Col>
                      <Col xs={11} md={11} style={{display: edit && 'none'}}>
                        <FormControl 
                            type="number"
                            defaultValue={tel}
                            inputRef={input => {this.tel = input;}}
                            onChange={e => {
                              this.setState({tel: e.target.value});
                            }}
                          />
                      </Col>
                    </Row>
                    <Row className="display-flex align-items-center">
                      <Col xs={1} md={1} style={{display: !edit && 'none'}} className="label-letter">Email: </Col>
                      <Col xs={11} md={11} style={{display: !edit && 'none'}}>{!!user && user.email}</Col>
                      {/* <Col xs={11} md={11} style={{display: state.edit && 'none'}}>
                        <FormControl 
                          type="text"
                          defaultValue={user.email}
                          inputRef={input => {this.email = input;}}
                          onChange={e => {
                            this.setState({email: e.target.value});
                          }}
                        />
                      </Col> */}
                    </Row>
                  </Grid>
              </Modal.Body>
              <Modal.Footer>

                <Button className='btn btn-danger' 
                style={{float: 'left'}}
                onClick={_=> {
                  let auth = new Auth();
                  auth.logout()
                  .then(_ => Router.push('/login'))
                }}
                >Sign out</Button>
                <Button className={edit ? 'btn btn-primary' : 'btn btn-success'}
                    style={{display: !!user && !!user.role && !!user.role[0].name && user.role[0].name !== 'admin' && 'none',
                        marginRight: 10,
                        padding: '6px 20px'
                    }} 
                    disabled={
                        name == ''
                      || tel == ''
                      || email == '' 
                      && 'disabled'
                    }
                    onClick={_=> {
                      if(edit){
                        this.setState({edit: false})
                      }else{
                        this.setState({edit: true})
                        this.updateProfile()
                      }
                    }}
                >{edit ? 'Edit' : 'Save'}</Button>
                <Button className='btn btn-default' 
                  onClick={_=> {
                    this.setState({show: false});
                  }}
                >Close</Button>
                
              </Modal.Footer>
            </Modal>
        </div>
        <ProgressBar 
          style={{
            height: 3,
            width: '100%',
            display: !!main && main.progressStatus,
            position: 'absolute',
          }} 
          srOnly
          now={!!main ? main.progressValue : 0} 
          min={0} 
          max={100} />
      </div>
    )
  }
}

export default Header
