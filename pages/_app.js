// pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div id="ui" style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', display: 'none' }}>
        Text UI
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
