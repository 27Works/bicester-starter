import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useState } from 'react'

export default function Home () {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    setLoading(true)

    fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify({x: 1}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log('res :>> ', res)
        return res.json()
      })
      .then(data => {
        if (data.status === 'pending') {
          setMessage('You have been subscribed. Please check your email to confirm.')
        } else if (data.status === 'subscribed') {
          setMessage('You are already subscribed. Thank you!')
        } else {
          setMessage('We could not subscribe you. Please try again.')
        }
      })
      .catch(err => {
        setMessage('We could not subscribe you. Please try again. ' + err)
      })
      .finally(() => {
        // self.reset()
      })
  }

  return (
      <>
      <Head>
        <title>Next.js Starter!</title>
        <link rel='icon' href='/favicon.ico' />
        <script src='/js/index.js' defer />
      </Head>

      <div className='min-h-screen text-gray-900 font-sans antialiased'>
        <div className='flex flex-col min-h-screen'>
          <header className='bg-gray-800 text-white'>
            {/* <div className='container max-w-6xl mx-auto py-12'> */}
            {/* <div className="text-3xl">{{ $page->title }}</div> */}
            {/* </div> */}
          </header>

          {/* <main className='container h-full max-w-6xl mx-auto mb-auto py-12'> */}
          {/* @yield('body') */}
          {/* </main> */}

          <aside className='bg-gray-600 text-white'>

            <div className='max-w-4xl md:flex mx-auto py-8 md:space-x-6'>
              <div className='w-full md:w-2/5'>
                <h3 className='text-3xl md:text-4xl font-semibold'>
                  Join the Newsletter
                </h3>
                <p className='mt-4 text-lg'>
                  Get up to date information and other random tidbits from us. You know you want to. (There isn't really a newsletter.)
                </p>
              </div>
              <div className='w-full md:w-3/5 mt-8 md:mt-0 flex flex-col justify-center'>
                <form name='newsletter-subscribes' method='POST' action='/' data-netlify='true'>
                  { message !== ''
                    ? (<div className='mb-4 px-2 py-1 bg-white border-4 border-white font-semibold text-gray-800'>
                      <span>{message}</span>
                    </div>
                    )
                    : null
                  }
                  <div className={`flex ${loading ? 'animate-pulse' : ''}`}>
                    <label className='sr-only'>Email:</label>
                    <input className='flex-1 px-2 py-1 border-0 bg-white text-gray-800' type='email' name='email' placeholder='Your Email Address' required />
                    <input type='hidden' name='listId' value='X' />
                    <button onClick={handleSubmit} className='px-6 py-1 bg-gray-800 text-white'>
                      {
                        loading
                          ? <span>Loading...</span>
                          : <span >Subscribe</span>
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </aside>

          <footer className='bg-gray-800 py-10 text-white'>
            <div className='max-w-6xl mx-auto text-center'>
              {/* This project is <a className="underline" href="https://github.com/jcarouth/netlify-mailchimp-alpinejs/">open source on Github</a>. Created by <a className="underline" href="https://twitter.com/jcarouth">@jcarouth</a>. */}
            </div>
          </footer>
        </div>
        <Footer />
      </div>
      </>
  )
}
