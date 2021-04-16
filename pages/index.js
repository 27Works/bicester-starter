import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home () {
  return (
    <div className='container'>
      <Head>
        <title>Next.js Starter!</title>
        <link rel='icon' href='/favicon.ico' />
        <script src='/js/index.js' defer />
      </Head>

      <body className='min-h-screen text-gray-900 font-sans antialiased'>
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
                  <div className='mb-4 px-2 py-1 bg-white border-4 border-white font-semibold text-gray-800'>
                    <span >Thanks for subscribing! Check your email to confirm.</span>
                  </div>
                  <div className='flex'>
                    <label className='sr-only'>Email:</label>
                    <input className='flex-1 px-2 py-1 border-0 bg-white text-gray-800' type='email' name='email' placeholder='Your Email Address' required />
                    <input type='hidden' name='listId' value='X' />
                    <button type='submit' className='px-6 py-1 bg-gray-800 text-white'>
                      <span >Loading...</span>
                      <span >Subscribe</span>
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
      </body>
      {/* <main>
        <Header title='Welcome to my app!' />
        <p className='description'>
          Get started by editing <code>pages/index.js</code>
        </p>
      </main> */}

      <Footer />
    </div>
  )
}
