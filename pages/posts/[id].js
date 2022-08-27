import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Post ({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths () {
  const paths = getAllPostIds()
  // paths is an array of objects that specifies which routes need to be pre-rendered.
  // [ {params: {id: string}}, ... ]
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

/* Here's how I'm guessing this goes.
when Next builds http://localhost:3000/posts/[id] where [id] can be any valid string,
it first invokes getStaticPaths to find out which routes need to be pre-rendered
for each route, Next passes in the necessary props with getStaticProps before rendering the page with the React component

Your page content depends on external data: Use getStaticProps.
Your page paths depend on external data: Use getStaticPaths (usually in addition to getStaticProps).

getSeverSideProps replaces getInitialProps

*/

/* When a page with getStaticProps is pre-rendered at build time, in addition to the page HTML file,
Next.js generates a JSON file holding the result of running getStaticProps.

This JSON file will be used in client-side routing through next/link (documentation) or next/router (documentation).
When you navigate to a page that’s pre-rendered using getStaticProps, Next.js fetches this JSON file (pre-computed at build time)
and uses it as the props for the page component. This means that client-side page transitions will not call getStaticProps as only the
exported JSON is used. */

// could also use useRouter hook in order to obtain an id via router.query . router.push() can be used to redirect to different pages
