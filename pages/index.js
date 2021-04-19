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

        <div className='min-h-screen font-sans antialiased bg-black'>

          {/* bg image */}
          <div className='absolute top-0 left-0 z-0 w-screen h-screen opacity-20'>
            <img className='object-cover w-full h-full' src='/images/bg.png' />
          </div>

          {/* main content */}
          <div className='relative z-10 flex flex-col items-center justify-center min-h-screen'>

            {/* logo */}
            <img className='h-14' src='/images/scramblers-logo.svg' />

            {/* the form */}
            <form
              className='flex flex-wrap items-end justify-center w-full max-w-4xl mx-auto mt-8 space-x-5 space-y-3 text-4xl font-light text-white md:w-3/5 md:mt-10'
              name='newsletter-subscribes'
              method='POST'
              action='/'
              data-netlify='true'
            >
              { message !== ''
                ? (<div className='px-2 py-1 mb-4 font-semibold text-gray-800 bg-white border-4 border-white'>
                  <span>{message}</span>
                </div>
                )
                : null
              }

              <label className='sr-only'>Email:</label>
              
              <span className='flex-shrink-0 inline-block'>My name is</span>
              <input onChange={(event) => setName(event.target.value)} className='input' type='text' name='name' required />
              <span className='flex-shrink-0 inline-block'>and I drive a</span>
              <select className='input select' onChange={(event) => setMake(event.target.value)}>
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
                  <select className='input select' onChange={(event) => setModel(event.target.value)}>
                    {models.map(model => {
                      return <option key={model} value={model}>{model}</option>
                    })}
                  </select>
                )
                : null
              }
              <input className='input' type='text' name='vehicle' placeholder='Your car' required />.

              <span className='flex-shrink-0 inline-block'>My email address is</span>
              <input onChange={(event) => setEmail(event.target.value)} className='input' type='email' name='email' required />.
              
              <div className='flex justify-center w-full pt-5'>
                <button onClick={handleSubmit} className='px-4 py-2 text-xl uppercase transition-colors bg-transparent border hover:bg-accent hover:text-white border-accent text-accent'>
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
      </>
  )
}
