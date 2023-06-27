import { IconLock } from '@tabler/icons'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AuthState } from '../../providers/AuthProvider'
import PublicWrapper from '../../providers/PublicWrapper'
import api, { postAuth } from '../../api'
import Logo from '../../components/Logo'
import appConfig from '../../config/appConfig'
import { Button, Divider, Input, Loader, PasswordInput, TextInput } from '@mantine/core'

// import {logo} from '../../../public/logo.svg'
export default () => {

  const authState = useContext(AuthState)
  const [loading, setLoading] = useState(false)



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



      <div className="min-w-[350px] rounded-lg shadow-2xl pb-20  bg-[#FFFFFF26] bg-white  backdrop-blur-md max-[850px]:w-[200px] max-[850px]:h-[350px]">
        <div className="flex justify-center">
          <div className=" mt-[40px] w-[200px] max-[850px]:h-[100px] max-[850px]:mt-[20px]" >
            <Logo />
          </div>
        </div>
        <p className="flex justify-center text-white text-[0.7rem] text-lg mt-12">
          Willkommen!
        </p>
        <p className="flex justify-center text-white text-[0.7rem]  text-lg mb-12">
          Bitte melden Sie sick an.
        </p>
        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className=" flex flex-1 flex-col space-y-6 px-8 mt-8">
            <TextInput

              icon={<img src="/mail_in.svg" alt="" />}
              classNames={
                {
                  input: " text-white  border-none bg-transparent outline-none",
                  wrapper: 'border-b-[1px] border-white'
                }}
              type="email"

              placeholder="innayan@wifi-connect.eu"
              required
              name='email'

            />
            


            <PasswordInput
              classNames={{
                input: 'text-white border-none bg-transparent outline-none',
                wrapper: 'border-b-[1px] border-white'
              }}
              icon={<img src="/lock.svg" alt="" />}

              type="Password"
              placeholder="* * * * * * * *"
              required
              name='password'
            />
           
            <p className="text-white text-[9px] font-light flex flex-row-reverse mt-2 mr-8 opacity-70 "></p>
            {/* <img className=" w-[2rem] " src="closed_eye.svg" alt="" /> */}
          </div>


          <div className="flex justify-center  mt-10  max-[850px]:mt-3">
            <Button
              type='submit'
              loading={loading}
            >SIGN IN</Button>
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-8  "><img src="/logo_TUV.svg" className="" alt="" /></div>

    </PublicWrapper>
  )
}
