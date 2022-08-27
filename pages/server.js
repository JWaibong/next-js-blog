import { getSession } from 'next-auth/client'
import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'
import Header from '../components/header'
const axios = require('axios')

export default function Page ({ session, source }) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.

  return (
    <>
      <Header />
      <h1>Server Side Rendering</h1>
      <p>
        {(session) ? `Hello, ${session.user.name}. You logged in, so you deserve a headpat. Refresh page for another.` : 'Please sign in for nice surprise.'}
      </p>
      {(session)
        ? (
          <div className={utilStyles.imgContainer}>
            <Image src={source} height={1080 / 2} width={1920 / 2} />
          </div>
          )
        : null}

    </>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps (context) {
  return {
    props: {
      session: await getSession(context),
      source: await axios
        .get('https://api.waifu.pics/sfw/pat')
        .then(res => res.data.url)

    }
  }
}
