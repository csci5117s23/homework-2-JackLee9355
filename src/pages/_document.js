import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{
        margin: 0,
        padding: 0,
        minWidth: '100vw',
        minHeight: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden'
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}