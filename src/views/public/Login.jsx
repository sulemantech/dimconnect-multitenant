import { IconLock } from '@tabler/icons'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AuthState } from '../../providers/AuthProvider'
import PublicWrapper from '../../providers/PublicWrapper'
import api, { postAuth } from '../../api'
import Logo from '../../components/Logo'
import appConfig from '../../config/appConfig'
import { Loader } from '@mantine/core'

// import {logo} from '../../../public/logo.svg'
export default () => {

  const authState = useContext(AuthState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const backdrop = document.getElementById('loginBackdrop')
    const panel = document.getElementById('loginPanel')

    panel.addEventListener('mouseenter', () => {
      backdrop.classList.add('backdrop-blur-lg')
      backdrop.classList.add('bg-neutral-100')
      panel.classList.remove('shadow-xl')
      panel.classList.remove('bg-neutral-100')
    })
    panel.addEventListener('mouseleave', () => {
      backdrop.classList.remove('backdrop-blur-lg')
      backdrop.classList.remove('bg-neutral-100')
      panel.classList.add('shadow-xl')
      panel.classList.add('bg-neutral-100')
    })

  }, [])

  const [error, setError] = useState('')

  const handleSubmit = async event => {
    setLoading(true)
    event.preventDefault();

    const email = event.target.email.value
    const pass = event.target.password.value


    postAuth(email, pass).then(({ data }) => {

      authState.setAuth(true)
      localStorage.setItem(appConfig.localStorageKey, data.token)
      localStorage.setItem(appConfig.localStorageRefreshKey, data.refreshToken)
      api.defaults.headers.common['authorization'] = `Bearer ${data.token}`
      setLoading(false)
      window.location.reload()
    }).catch((err) => {
      setError(err.response.data.message)
      setLoading(false)
    })

  };

  return (
    <PublicWrapper>
      <div id='loginBackdrop' className='absolute left-0 right-0 top-0 bottom-0 transition-all bg-opacity-30 duration-500 flex items-center justify-center'>
        <div id='loginPanel' className="flex items-center justify-center py-12 px-4 transition-all duration-500 sm:px-6 lg:px-8 bg-neutral-100 bg-opacity-30 shadow-xl backdrop-blur-md rounded-2xl">
          <div className="w-full max-w-md space-y-8">
            <div className='relative flex items-center justify-center h-52 logomask'>
              <Logo height={200} width={'auto'} />
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-100">
              Sign in to your account
            </h2>


            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand focus:outline-none focus:ring-brand sm:text-sm"
                    placeholder="Email address"


                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand focus:outline-none focus:ring-brand sm:text-sm"
                    placeholder="Password"


                  />
                </div>
              </div>
              <div>
                {
                  error && <div className='text-red-500 text-sm'>{error}</div>

                }
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                  /> */}
                  {/* <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label> */}
                </div>

                {/* <div className="text-sm"> 
                  <a href="#" className="font-medium text-white hover:text-sky-100">
                    Forgot your password?
                  </a>
                </div> */}
              </div>

              <div>
                <button
                  type="submit"

                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-brand py-2 px-4 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <IconLock className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                  {/* Sign in */}
                  {
                    loading ? <Loader size={20} color='white' />
                    
                    : 'Sign in'
                  }

                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </PublicWrapper>
  )
}
