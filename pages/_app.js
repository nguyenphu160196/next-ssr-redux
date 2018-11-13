import App, {Container} from 'next/app'
import React from 'react'
import withReduxStore from '../lib/redux-store'
import { Provider } from 'react-redux'
import Head from 'next/head'
import '../styles/main.scss'

class MyApp extends App {
  render () {
    const {Component, pageProps, reduxStore} = this.props
    return (
      <div>
        <Head>
          <title>VSIP</title>
          <meta charSet="utf-8" />
          <link rel="icon" href="/static/public/favicon.ico" type="image/x-icon"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
        </Head>
        <Container>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      </div>
    )
  }
}

export default withReduxStore(MyApp)
