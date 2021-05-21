import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useEffect, useState } from 'react'

export default function Home () {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [cta, setCta] = useState('Sign Me Up')
  const [formData, setFormData] = useState({
    name: ' ',
    year: ' ',
    make: ' ',
    model: ' ',
    email: ' '
  })

  const handleNameChange = event => {
    setFormData(prevState => ({
      ...prevState,
      name: event.target.innerText
    }))
  }

  const handleEmailChange = event => {
    setFormData(prevState => ({
      ...prevState,
      email: event.target.innerText
    }))
  }

  const handleYearChange = event => {
    setFormData(prevState => ({
      ...prevState,
      year: event.target.innerText
    }))
  }

  const handleMakeChange = event => {
    setFormData(prevState => ({
      ...prevState,
      make: event.target.innerText
    }))
  }

  const handleModelChange = event => {
    setFormData(prevState => ({
      ...prevState,
      model: event.target.innerText
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    setLoading(true)

    const emailField = document.getElementById('email')
    const nameField = document.getElementById('name')
    const makeField = document.getElementById('make')
    const modelField = document.getElementById('model')
    const yearField = document.getElementById('year')

    const getValue = field => {
      return (field.textContent || field.innerText).trim()
    }

    let formValid = true
    let fieldsEmpty = false

    if (formData.name === ' ' || formData.name === '') {
      // setFormData({ ...formData, name: '' })
      setFormData(prevState => ({
        ...prevState,
        name: ''
      }))
      fieldsEmpty = true
      formValid = false
    }
    if (formData.year === ' ' || formData.year === '') {
      setFormData(prevState => ({
        ...prevState,
        year: ''
      }))
      fieldsEmpty = true
      formValid = false
    }
    if (formData.make === ' ' || formData.make === '') {
      setFormData(prevState => ({
        ...prevState,
        make: ''
      }))
      fieldsEmpty = true
      formValid = false
    }
    if (formData.model === ' ' || formData.model === '') {
      setFormData(prevState => ({
        ...prevState,
        model: ''
      }))
      fieldsEmpty = true
      formValid = false
    }
    if (formData.email === ' ' || formData.email === '') {
      setFormData(prevState => ({
        ...prevState,
        email: ''
      }))
      fieldsEmpty = true
      formValid = false
    }

    const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validEmail = emailTest.test(formData.email)

    const yearTest = /^[0-9]+$/
    let validYear = false
    if (yearTest.test(formData.year) && formData.year.length === 4) {
      validYear = true
    }

    if (!validEmail || !validYear) {
      formValid = false
    }

    if (!formValid) {
      if (fieldsEmpty) {
        setMessage('Please complete all fields')
        setLoading(false)
        return false
      }
      if (!fieldsEmpty && !validEmail && !validYear) {
        setMessage('Please enter a valid year and email address')
        setLoading(false)
        return false
      }
      if (!fieldsEmpty && validEmail && !validYear) {
        setMessage('Please enter a valid year')
        setLoading(false)
        return false
      }
      if (!fieldsEmpty && !validEmail && validYear) {
        setMessage('Please enter a valid email address')
        setLoading(false)
        return false
      }
        
      setCta('Sign Me Up')
    } else {
      setCta('Submitting')
    }

    fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: getValue(emailField).toLowerCase(),
        name: getValue(nameField),
        make: getValue(makeField),
        model: getValue(modelField),
        year: getValue(yearField)
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.status === 'pending') {
          setMessage('You have been subscribed. Please check your email to confirm.')
          setCta('Done!')
        } else if (data.status === 'subscribed') {
          setMessage('You are already subscribed. Thank you!')
        } else {
          setMessage('We could not subscribe you. Please try again.')
          setCta('Sign Me Up')
          setLoading(false)
        }
      })
      .catch(err => {
        setMessage('We could not subscribe you. Please try again. ' + err)
        setCta('Sign Me Up')
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

          <div className='flex flex-col items-center w-full mt-10 space-y-5 md:space-y-5'>

            {/* intro message */}
            <div className='text-2xl font-medium text-white uppercase cursor-default md:text-3xl border-gray-50'>
              A new automotive movement born from the success of Scramble events. Pre-register now to be the first to join.
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
              <span onInput={handleNameChange} id='name' className={`inline-block input cursor-text ${formData.name === '' ? '!border-red-500' : ''}`} contentEditable />

              <span className='flex-shrink-0 inline-block mr-5 cursor-default'>and I drive a</span>

              {/* year / make / model inputs */}
              <span onInput={handleYearChange} id='year' className={`inline-block input input--year cursor-text ${formData.year === '' ? '!border-red-500' : ''}`} data-placeholder-year='1973' contentEditable />
              <span onInput={handleMakeChange} id='make' className={`inline-block input input--make cursor-text ${formData.make === '' ? '!border-red-500' : ''}`} data-placeholder-make='Porsche' contentEditable />
              <span onInput={handleModelChange} id='model' className={`inline-block input input--model cursor-text ${formData.model === '' ? '!border-red-500' : ''}`} data-placeholder-model='911' contentEditable />
              .

              <span className='flex-shrink-0 inline-block mx-5 cursor-default'>My email address is</span>

              {/* email input */}
              <span onInput={handleEmailChange} id='email' className={`inline-block input input--email cursor-text ${formData.email === '' ? '!border-red-500' : ''}`} data-placeholder-email='me@mymail.com' contentEditable  />
              <div className='flex justify-center w-full pt-5'>
                <button disabled={loading ? true : false} onClick={handleSubmit} className='px-4 focus:outline-none py-1.5 text-lg font-medium text-white uppercase transition-colors bg-transparent border border-white rounded-sm hover:border-accent hover:bg-accent hover:text-white'>
                  {cta}
                  {/* {
                    loading && !message
                      ? <span>Submitting...</span>
                      : message ? <span>Done!</span> : <span>Sign me up</span>
                  } */}
                </button>
              </div>

              {/* feedback */}
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
