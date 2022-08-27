
// top level component common across all pages
// that will keep the state
// when navigating between pages
/*
In Next.js, you can add global CSS files by importing them
from pages/_app.js. You cannot import global CSS anywhere else.

The reason that global CSS can't be imported outside of
pages/_app.js is that global CSS affects all elements on the
page.

If you were to navigate from the homepage to the
/posts/first-post page, global styles from the homepage
would affect /posts/first-post unintentionally.

*/
import '../styles/global.css'
import { Provider } from 'next-auth/client'

export default function App ({ Component, pageProps }) {
  return (
    <Provider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      // options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
      //  clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
      //  keepAlive: 0
      // }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </Provider>
  )
}
