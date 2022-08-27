
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import Image from 'next/image'
// code splitting is for rendering the home page only and not any other code
// pre-fetching is when the browser looks for Link components and then gets the code for that page in the background, by the time
// a user clicks on the link, the page transition is nearly instant,
// overall, client side navigation is done through Link components which do not force the browser to refresh.
// use regular <a> </a> tags for links to external sites.
// style the <a> tag of the link through class name, not the <Link> component itself.
/*
We recommend using Static Generation (with and without data) whenever possible
because your page can be built once and served by CDN, which makes it much faster than having a
server render the page on every request.

You can use Static Generation for many types of pages, including:

Marketing pages
Blog posts
E-commerce product listings
Help and documentation

You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes,
then you should choose Static Generation.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request.
Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date.
Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.
*/

/*
getStaticProps runs at build time in production, and…
Inside the function, you can fetch external data and send it as props to the page.

Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies —
 so when you pre-render this page at build time, make sure to resolve them first!”

Note: In development mode, getStaticProps runs on each request instead.
*/

// const res = await fetch('..')
// return res.json()
// or
/*

  const databaseClient = someDatabaseSDK.createClient(...)

  export async function getSortedPostsData() {
    // Instead of the file system,
    // fetch post data from a database
      return databaseClient.query('SELECT posts...')
    }
  This is possible because getStaticProps only runs on the server-side.
  It will never run on the client-side. It won’t even be included in the JS bundle for the browser.
  That means you can write code such as direct database queries without them being sent to browsers.
  Because it’s meant to be run at build time,
  you won’t be able to use data that’s only available during request time,
  such as query parameters or HTTP headers.

  What If I Need to Fetch Data at Request Time?
Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request.
Maybe your page shows frequently updated data, and the page content changes on every request.

In cases like this, you can try Server-side Rendering or skip pre-rendering.
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}

you can also skip pre-rendering and instead use client-side rendering with javascript
at request time

import useSWR from 'swr'
function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}

  */

export async function getStaticProps () {
  const allPostsData = getSortedPostsData() // retrieve data from filesystem, database, or another API
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home ({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p> CS Major, Techwear Enthusiast, Hardstuck D4 </p>
      </section>
      <br />
      <Image src='/images/squat.PNG' width={1440} height={1800} layout='responsive' quality={100} />
      <br />
      <Image src='/images/sit.jpg' width={3} height={4} layout='responsive' quality={80} />
      <br />
      <Image src='/images/park.jpg' width={1} height={1} layout='responsive' quality={100} />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
