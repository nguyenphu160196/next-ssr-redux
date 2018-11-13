import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { connect } from 'react-redux'



export const MainLayout = ({ children, main, ...props}) => (
  <div className="main-view">
    <Header />
    <div className='body-view'>
      <Sidebar />
      {children}
    </div>
    {(!!main && main.message)&&
      <div
        className={"snackbar " + (main.message.text ? main.message.type : "off")}
      >{main.message.text}</div>
    }
  </div>
)

export default connect()(MainLayout)