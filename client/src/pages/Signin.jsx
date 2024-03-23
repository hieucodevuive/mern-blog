import { Link, useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import { useState } from 'react'
import { signinAPI } from '../../api/auth.api'
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice'

export default function Signin() {
  const [formData, setFormData] = useState({})

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { isLoading, error: errorMessage, currentUser } = useSelector((state) => state.user)

  const handleSignin = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!/\.com$|\.net$/.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }
    try {
      dispatch(signinStart())
      //Kiem tra xem comfirm password co bang password ko
      //Goi api
      const result = await signinAPI(formData)
      if (result) {
        toast.success('Sigh In Successfully')
        navigate('/')
        dispatch(signinSuccess(result))
        return result
      }
      dispatch(signinFailure('Something went wrong!'))
      toast.error(errorMessage)
      return
    } catch (error) {
      dispatch(signinFailure(`${error.response.data.message}`))
      toast.error(errorMessage)
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/* Left */}
        <div className=''>
          <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
           text-white text-4xl'
            >
          HieuPham&#39;s
            </span>
          Blog
          </Link>
          <p className='text-sm mt-5 mr-5'>
            This is HieuPham&#39;s Blog. You can Sign In with your email and password or with Goole
          </p>
        </div>

        {/* Right */}
        <div className='mt-20 md:w-96'>
          <form className='w-50' onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email address</label>
              <input
                onChange={handleSignin}
                type='email'
                pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Email...' required />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
              <input onChange={handleSignin} type='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='•••••••••' required />
            </div>
            <div className='flex items-start mb-6'>
              <div className='flex items-center h-5'>
                <input id='remember' type='checkbox' value='' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800' required />
              </div>
              <label htmlFor='remember' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>I agree with the <a href='#' className='text-blue-600 hover:underline dark:text-blue-500'>terms and conditions</a>.</label>
            </div>
            <Button className='md:w-96 ' type='submit' disabled={isLoading} gradientDuoTone='purpleToPink' >
              {
                isLoading ?
                  <Spinner />:
                  'Sign In'
              }
            </Button>
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Don&#39;t have an account?</span>
            <Link className='text-blue-500 cursor-pointer font-bold' to='/signup'>Sign Up</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
