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
                    My name is
                      <input onChange={(event) => setName(event.target.value)} className='flex-1 px-2 py-1 border-0 bg-white text-gray-800' type='text' name='name' placeholder='Your name' required />

                    and I drive a 
                    <select onChange={(event) => setMake(event.target.value)}>
                      <option value="Abarth">Abarth</option>
                      <option value="Aixam">Aixam</option>
                      <option value="Alpine">Alpine</option>
                      <option value="Audi">Audi</option>
                      <option value="Bentley">Bentley</option>
                      <option value="BMW">BMW</option>
                      <option value="Bristol">Bristol</option>
                      <option value="Cadillac">Cadillac</option>
                      <option value="Caterham">Caterham</option>
                      <option value="Chevrolet">Chevrolet</option>
                      <option value="Chrysler">Chrysler</option>
                      <option value="Citroen">Citroen</option>
                      <option value="Dacia">Dacia</option>
                      <option value="Daewoo">Daewoo</option>
                      <option value="Daihatsu">Daihatsu</option>
                      <option value="DFSK">DFSK</option>
                      <option value="Dodge">Dodge</option>
                      <option value="DS">DS</option>
                      <option value="Ferrari">Ferrari</option>
                      <option value="Fiat">Fiat</option>
                      <option value="Ford">Ford</option>
                      <option value="FSO">FSO</option>
                      <option value="Honda">Honda</option>
                      <option value="Hummer">Hummer</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Infiniti">Infiniti</option>
                      <option value="Isuzu">Isuzu</option>
                      <option value="Iveco">Iveco</option>
                      <option value="Jaguar!Daimler">Jaguar!Daimler</option>
                      <option value="Jeep">Jeep</option>
                      <option value="Jensen">Jensen</option>
                      <option value="Kia">Kia</option>
                      <option value="Lada">Lada</option>
                      <option value="Lamborghini">Lamborghini</option>
                      <option value="Lancia">Lancia</option>
                      <option value="LDV">LDV</option>
                      <option value="Lexus">Lexus</option>
                      <option value="Ligier">Ligier</option>
                      <option value="Lotus">Lotus</option>
                      <option value="LTI">LTI</option>
                      <option value="Mahindra">Mahindra</option>
                      <option value="MAN">MAN</option>
                      <option value="Marcos">Marcos</option>
                      <option value="Maserati">Maserati</option>
                      <option value="Maybach">Maybach</option>
                      <option value="Mazda">Mazda</option>
                      <option value="McLaren">McLaren</option>
                      <option value="MCW">MCW</option>
                      <option value="MG">MG</option>
                      <option value="Microcar">Microcar</option>
                      <option value="Mini">Mini</option>
                      <option value="Mitsubishi">Mitsubishi</option>
                      <option value="Morgan">Morgan</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Noble">Noble</option>
                      <option value="Opel">Opel</option>
                      <option value="Perodua">Perodua</option>
                      <option value="Peugeot">Peugeot</option>
                      <option value="Piaggio">Piaggio</option>
                      <option value="Porsche">Porsche</option>
                      <option value="Proton">Proton</option>
                      <option value="Reliant">Reliant</option>
                      <option value="Renault">Renault</option>
                      <option value="Rover">Rover</option>
                      <option value="Saab">Saab</option>
                      <option value="Santana">Santana</option>
                      <option value="Sao">Sao</option>
                      <option value="Seat">Seat</option>
                      <option value="Skoda">Skoda</option>
                      <option value="Smart">Smart</option>
                      <option value="Ssangyong">Ssangyong</option>
                      <option value="Subaru">Subaru</option>
                      <option value="Suzuki">Suzuki</option>
                      <option value="Talbot">Talbot</option>
                      <option value="Tata">Tata</option>
                      <option value="Tesla">Tesla</option>
                      <option value="Think">Think</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Triumph">Triumph</option>
                      <option value="TVR">TVR</option>
                      <option value="UMM">UMM</option>
                      <option value="Vauxhall">Vauxhall</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Volvo">Volvo</option>
                      <option value="Westfield">Westfield</option>
                      <option value="Yugo">Yugo</option>
                    </select>

                    {
                      models
                      ? (
                        <select onChange={(event) => setModel(event.target.value)}>
                          {models.map(model => {
                            return <option key={model} value={model}>{model}</option>
                          })}
                        </select>
                      )
                      : null
                    }
                    <input className='flex-1 px-2 py-1 border-0 bg-white text-gray-800' type='text' name='vehicle' placeholder='Your car' required />.

                    My email address is
                    <input onChange={(event) => setEmail(event.target.value)} className='flex-1 px-2 py-1 border-0 bg-white text-gray-800' type='email' name='email' placeholder='Your Email Address' required />.
                    
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
