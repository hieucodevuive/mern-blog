import { Link, useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import { useState } from 'react'
import { signupAPI } from '../../api/auth.api'
import { toast } from 'react-toastify'

export default function Signup() {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { confirm_password, ...signupData } = formData
      //Kiem tra xem comfirm password co bang password ko
      if (signupData.password !== confirm_password) {
        toast.error('Confirm password is not correct!')
        return
      }
      //Goi api
      const result = await signupAPI(signupData)
      if (result) {
        toast.success('Sigh Up Successfully')
        setIsLoading(false)
        navigate('/signin')
        return result
      }
      toast.error('Something went wrong!')
      return 
    } catch (error) {
      toast.error(`${error.response.data.message}`)
      setIsLoading(false)
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
            This is HieuPham&#39;s Blog. You can sign ip with your email and password or with Goole
          </p>
        </div>

        {/* Right */}
        <div className='mt-20 md:w-96'>
          <form className='w-50' onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>User name</label>
              <input onChange={handleSignup} type='text' id='username' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='User Name...' required />
            </div>
            <div className='mb-6'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email address</label>
              <input onChange={handleSignup} type='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Email...' required />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
              <input onChange={handleSignup} type='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='•••••••••' required />
            </div>
            <div className='mb-6'>
              <label htmlFor='confirm_password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm password</label>
              <input onChange={handleSignup} type='password' id='confirm_password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='•••••••••' required />
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
                  'Sign Up'
              }
            </Button>
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Have an account?</span>
            <Link className='text-blue-500 cursor-pointer font-bold' to='/signin'>Sign In</Link>
          </div>

        </div>
      </div>
    </div>
  )
}
