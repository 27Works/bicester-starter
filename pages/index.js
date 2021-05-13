import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useEffect, useState } from 'react'

export default function Home () {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    setLoading(true)

    const emailField = document.getElementById('email')
    const nameField = document.getElementById('name')
    const makeField = document.getElementById('make')
    const modelField = document.getElementById('model')
    const yearField = document.getElementById('year')
    

    fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: emailField.innerHTML.toLowerCase(),
        name: nameField.innerHTML,
        make: makeField.innerHTML,
        model: modelField.innerHTML, 
        year: yearField.innerHTML
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.status === 'pending') {
          setMessage('You have been subscribed. Please check your email to confirm.')
        } else if (data.status === 'subscribed') {
          setMessage('You are already subscribed. Thank you!')
        } else {
          setMessage('We could not subscribe you. Please try again.')
          setLoading(false)
        }
      })
      .catch(err => {
        setMessage('We could not subscribe you. Please try again. ' + err)
        setLoading(false)
      })
      .finally(() => {
        // self.reset()
      })
  }

  const handleCloseMessage = () => {
    setMessage('')
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>We Are Scramblers</title>
        <link rel='icon' href='/favicon.ico' />
        <script src='/js/index.js' defer />
      </Head>

      <div className='min-h-screen font-sans antialiased'>

        {/* bg image */}
        <div className='fixed top-0 left-0 z-0 w-screen h-screen opacity-20'>
          <img className='object-cover w-full h-full' src='/images/bg.png' />
        </div>

        {/* main content */}
        <div className='container relative z-10 flex flex-col items-center justify-start max-w-screen-md px-5 pt-10 mx-auto text-center md:justify-center md:px-16'>

          {/* logo */}
          <img className='h-32 md:h-40' src='/images/logo-stack.svg' />

          {/* { message !== ''
            ? (<div className='fixed top-0 left-0 z-20 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-90'>
              <img className='h-12 md:h-14' src='/images/scramblers-logo.svg' />
              <div className='px-3 py-3 mt-4 font-semibold text-gray-800 bg-white border-4 border-white rounded'>
                <span>{message}</span>
              </div>
            </div>
            )
            : null
          } */}

          <div className='flex flex-col items-center w-full mt-10 space-y-5 md:space-y-5'>
            <div className='text-2xl font-medium text-white uppercase md:text-3xl border-gray-50 cursor-default'>
              Praesent commodo cursus magna,vel scelerisque nisl consectetur et. Lorem ipsum dolor sit amet.
            </div>
            {/* the form */}
            <form
              className='flex flex-wrap items-end justify-center pb-10 space-y-1 text-2xl font-medium text-white md:space-y-2 md:text-3xl'
              name='newsletter-subscribes'
              method='POST'
              action='/'
              data-netlify='true'
            >
              <span className='flex-shrink-0 inline-block mr-5 cursor-default'>My name is</span>

              {/* name input */}
              <span id='name' className='inline-block input cursor-text' contentEditable />

              <span className='flex-shrink-0 inline-block mr-5 cursor-default'>and I drive a</span>

              {/* year / make / model inputs */}
              <span id='year' className='inline-block input input--year cursor-text' data-placeholder-year='1973' contentEditable />
              <span id='make' className='inline-block input input--make cursor-text' data-placeholder-make='Porsche' contentEditable />
              <span id='model' className='inline-block input input--model cursor-text' data-placeholder-model='911' contentEditable />
              .

              <span className='flex-shrink-0 inline-block mx-5 cursor-default'>My email address is</span>

              {/* email input */}
              <span id='email' className='inline-block input input--email cursor-text' data-placeholder-email='me@mymail.com' contentEditable  />
              <div className='flex justify-center w-full pt-5'>
                <button disabled={loading ? true : false} onClick={handleSubmit} className='px-4 focus:outline-none py-1.5 text-lg font-medium text-white uppercase transition-colors bg-transparent border border-white rounded-sm hover:border-accent hover:bg-accent hover:text-white'>
                  {
                    loading && !message
                      ? <span>Loading...</span>
                      : message ? <span>Done!</span> : <span>Sign me up</span>
                  }
                </button>
              </div>
              { message !== ''
                ? (<div className='absolute flex items-center px-3 py-3 mt-4 space-x-5 text-sm font-semibold text-gray-800 bg-white border-4 border-white rounded shadow-lg bottom-10'>
                    <span className='cursor-default'>{message}</span>
                    <button onClick={handleCloseMessage} className='flex focus:outline-none hover:bg-white border-black hover:text-black border transition-colors items-center justify-center p-1.5 leading-none text-white bg-black rounded-full'>
                      <svg className='w-2 h-2' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.5 1.5l12 12m-12 0l12-12' stroke='currentColor' /></svg>
                    </button>
                  </div>
                )
                : null
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
