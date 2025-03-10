import React, { Component } from 'react'
import Router from 'next/router'
import { getAccessToken } from './utilities'
import Wrapper from '../parts/Wrapper'

export default function withAuth(AuthComponent) {
  if (typeof window !== "undefined") {
    var token = getAccessToken()

  }
  




  return class Authenticated extends Component {
    static async getInitialProps(ctx) {


      let userAgent
      if (process.browser) {
        userAgent = navigator.userAgent

      } else {
        userAgent = ctx.req.headers['user-agent']
      }


      const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
      return { ...pageProps, userAgent }
    }

    constructor(props) {
      super(props)
      this.state = {
        isLoading: true
      };
    }

    componentDidMount() {
      if (!token) {
        Router.push('/login')
      }
      this.setState({ isLoading: false })
    }

    render() {
      return (
        <>
          {this.state.isLoading ? (
            <div>LOADING....</div>
          ) : (
            <Wrapper>
              {navigator.onLine ?
                <AuthComponent {...this.props} />
                : <div>You are currently offline, please check internet....</div>
              }
            </Wrapper>
          )}
        </>
      )
    }
  }
}