import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Cookie from 'js-cookie'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'

import store from '../src/redux/store'
import client from '../src/common/lib/apollo'
import '../src/common/constant/global.css'

import { withRouter } from 'next/router'
import checkAuthentication from '../src/common/utils/checkAuthentication'

import { AppUrls } from '../src/common/constant/global'

import AlertHandler from './alerthandler'

let persistor = persistStore(store);

class MyApp extends App {
  componentDidMount() {
    const { router } = this.props
    const path = router.asPath
    const hostname = location.hostname

    const bl = checkAuthentication(path)
    // if (!bl)
    // {
    //   if (hostname.indexOf('localhost') > -1)
    //     location.href = 'http://localhost:3000'
    //   else if (hostname.indexOf('apps.pannucorp.com'))
    //     location.href = 'https://apps.pannucorp.com'
    //   else
    //     location.href = AppUrls.REGISTRATION
    // }
  }

  render() {
    const { Component, pageProps } = this.props

    /** paging loading-indicator */
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertHandler />
          <ApolloProvider client={client}>
            <Head>
              <title>PannuCorp APP</title>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
              <meta http-equiv="Pragma" content="no-cache" />
              <meta http-equiv="Expires" content="0" />

              <link href="https://www.cdnfonts.com/sf-pro-display.font" rel="canonical" />
              <link href="//fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />

              <meta content="IE=Edge" http-equiv="X-UA-Compatible" />
              <meta name="description" content="A new Flutter project." />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="apple-mobile-web-app-status-bar-style" content="black" />
              <meta name="apple-mobile-web-app-title" content="pwa_dev" />

              <link rel="apple-touch-icon" href="/icons/Icon-192.png" />
              <link rel="icon" type="image/png" href="/favicon.png" />
              <link rel="manifest" href="/manifest.json" />
            </Head>
            <Script src="/flutter.js" defer />
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default withRouter(MyApp)



