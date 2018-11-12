import React from 'react'
import {connect} from 'react-redux'
import MainLayout from '../layouts/MainLayout'


class Index extends React.Component {
  static getInitialProps ({ reduxStore }) {
    return {}
  }

  componentDidMount () {
    
  }

  componentWillUnmount () {
    
  }

  render () {
    return (
      <MainLayout />
    )
  }
}

export default connect()(Index)