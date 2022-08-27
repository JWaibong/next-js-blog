import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'
import Image from 'next/image'
import axios from 'axios'
const fetch = require('node-fetch')

export default function Page () {
  const [session, loading] = useSession()
  const [content, setContent] = useState()
  const [imgUrl, setImgUrl] = useState(null)

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  }, [session])

  const buttonHandler = async () => {
    const img = await axios.get('https://api.waifu.pics/sfw/cuddle')
      .then(res => res.data.url)
    setImgUrl(img)
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <Layout><AccessDenied /></Layout> }

  // If session exists, display content
  return (
    <>
      <Layout>

        <h1>Protected Page</h1>
        <p><strong>{content || '\u00a0'}</strong></p>
        <button onClick={buttonHandler}> UWU </button>
        {(imgUrl) ? <Image src={imgUrl} width={1920 / 2} height={1080 / 2} /> : null}
      </Layout>
    </>
  )
}
