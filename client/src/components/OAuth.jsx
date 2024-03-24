import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { signinWithGoogleAPI } from '../../api/auth.api'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDispatch } from 'react-redux'
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice.js'

export default function OAuth() {
  const auth = getAuth(app)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleGoogleClick = async() => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)
      const authGoogleData = {
        username: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL
      }
      console.log('🚀 ~ handleGoogleClick ~ authGoogleData:', authGoogleData)
      //call api
      const res = await signinWithGoogleAPI(authGoogleData)
      if (res) {
        toast.success('Sigh In Successfully')
        navigate('/')
        dispatch(signinSuccess(res))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button onClick={handleGoogleClick} type='button' gradientDuoTone='pinkToOrange' className='mt-5 md:w-96'>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
      Continue with Google
    </Button>
  )
}
