import React from 'react'
import Link from 'next/router'
import Auth from '../services/auth'
const auth = new Auth()
const isBrowser = typeof window !== 'undefined'

class SideBar extends React.Component {
  state ={
    menuRoute: [
      {
        className: 'dashboard',
        name: 'Dashboard',
        url: '/dashboard',
      },
      {
        className: 'ir',
        name: 'Service Inquiries & Request',
        url: '/ir'
      },
      {
        className: 'notify',
        name: 'Announcements',
        url: '/notify'
      },
      {
        className: 'event',
        name: 'Event',
        url: '/event'
      },
      {
        className: 'tenant',
        name: 'Tenant Directory',
        url: '/tenant'
      },
      {
        className: 'promo',
        name: 'Business Corner',
        url: '/promo'
      },
      {
        className: 'job',
        name: 'Job Corner',
        url: '/job'
      },
      {
        className: 'setting',
        name: 'Setting',
        url: '/setting',
        role: ['admin'],
      },
    ]
  }

  componentDidMount(){
    auth.getToken()
  }

  checkActive(url) {
    // const {pathname} = this.props.location
    let active = false
    // if(pathname.startsWith(url)) {
    //   active = true
    // }
    // if(pathname.startsWith("/new") && pathname.includes(url)) {
    //   active = true
    // }
    return active
  }

  render () {
    // const role={}
    // if(isBrowser){
    //   role = auth.role()
    // }
    const {menuRoute} = this.state;
    return (
      <div className='side-bar'>
        {/*<div className='side-list'>
          {menuRoute.map((k,i) => (
            <span key={i}>
              {!!(!k.role || (!!role && k.role.includes(role.name))) &&
                <Link className={this.checkActive(k.url) ? "node-active" : ""} href={k.url} activeClassName={'node-active'}>
                  <div className='side-node'>
                    <div className={'side-icon side-icon-' + k.className}></div>
                    <div className='side-name'><p>{k.name}</p></div>
                  </div>
                </Link>
              }
            </span>
          ))}
        </div>*/}
      </div>
    )
  }
}

export default SideBar
