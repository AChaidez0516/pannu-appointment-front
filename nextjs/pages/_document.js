import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage()

    return {
      ...page,
    }
  }

  render() {
    const { css, hydrationScript } = this.props

    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </Head>

        <body style={{ margin: 'unset', minWidth: 'fit-content' }}>
          <Main />
          {hydrationScript}
          <NextScript />
          <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
            <div id="modal-root" style={{ position: 'relative' }}></div>
          </div>
          <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
            <div id="popup-modal-root" style={{ position: 'relative' }}></div>
          </div>
        </body>
      </Html>
    )
  }
}
