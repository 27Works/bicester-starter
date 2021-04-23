import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useEffect, useState } from 'react'

export default function Home () {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [models, setModels] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    if (make !== '') {
      fetchModels()
    }
  }, [make])

  const fetchModels = () => {
    const uri = `https://www.carmakesandmodels.co.uk/api/?apikey=${'qIgbBctA5lFOjzg2'}&make=${make}`

    // fetch(uri, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then(res => res.json())
    //   .then(data => setModels(data))

    setModels(['Fiesta', 'Galaxy'])
  }

  const handleSubmit = event => {
    event.preventDefault()

    setLoading(true)

    console.log({email, name, make, model, year})

    fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify({email, name, make, model, year}),
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

      <div className='min-h-screen font-sans antialiased'>

        {/* bg image */}
        <div className='fixed top-0 left-0 z-0 w-screen h-screen opacity-20'>
          <img className='object-cover w-full h-full' src='/images/bg.png' />
        </div>

        {/* main content */}
        <div className='container relative z-10 flex flex-col items-center justify-start max-w-screen-md px-5 pt-10 mx-auto text-center md:justify-center md:px-16'>

          {/* logo */}
          <img className='h-32 md:h-40' src='/images/logo-stack.svg' />

          { message !== ''
            ? (<div className='px-2 py-1 mb-4 font-semibold text-gray-800 bg-white border-4 border-white'>
              <span>{message}</span>
            </div>
            )
            : null
          }

          <div className='flex flex-col items-center w-full mt-10 space-y-5 md:space-y-5'>
            <div className='text-2xl font-medium text-white uppercase md:text-3xl border-gray-50'>
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

              <label className='sr-only'>Email:</label>
              <span className='flex-shrink-0 inline-block mr-5'>My name is</span>

              {/* name input */}
              <span id='name' className='inline-block input' contentEditable />

              <span className='flex-shrink-0 inline-block mr-5'>and I drive a</span>

              {/* year / make / model inputs */}
              <span id='year' className='inline-block input input--year' data-placeholder-year='1973' contentEditable />
              <span id='make' className='inline-block input input--make' data-placeholder-make='Porsche' contentEditable />
              <span id='model' className='inline-block input input--model' data-placeholder-model='911' contentEditable />
              .

              <span className='flex-shrink-0 inline-block mx-5'>My email address is</span>

              {/* email input */}
              <span onChange={(event) => setEmail(event.target.value)} id='email' className='inline-block input input--email' data-placeholder-email='me@mymail.com' contentEditable />
              {/* <input onChange={(event) => setEmail(event.target.value)} className=' w-96 input' type='email' name='email' required />. */}
              <div className='flex justify-center w-full pt-5'>
                <button onClick={handleSubmit} className='px-4 py-1.5 text-lg font-medium text-white uppercase transition-colors bg-transparent border border-white rounded-sm hover:border-accent hover:bg-accent hover:text-white'>
                  {
                    loading
                      ? <span>Loading...</span>
                      : <span >Sign me up</span>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
