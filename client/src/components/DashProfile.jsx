import { Button, TextInput } from 'flowbite-react'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import { app } from '../firebase'
import { toast } from 'react-toastify'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

import { updateUserAPI } from '../../api/auth.api'
import { Spinner } from 'flowbite-react'



export default function DashProfile() {
  const { currentUser } = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(null)
  const filePickerRef = useRef()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const { loading: isLoading, error: errorMessage } = useSelector((state) => state.user)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']// Thêm các loại MIME hình ảnh khác nếu cần
    if (file && validImageTypes.includes(file.type)) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    } else {
      toast.error('Please provide a valid image')
    }
  }

  useEffect(() => {
    if (imageFile) {
      upLoadImage()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile])

  const upLoadImage = async() => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    const storage = await getStorage(app)
    const fileName = await new Date().getTime() + imageFile.name
    const storageRef = await ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageFileUploading(progress.toFixed(0))
        },
        (error) => {
          toast.error('Couldn not upload image!')
          // eslint-disable-next-line no-console
          console.log(error)
          setImageFileUploading(null)
          setImageFile(null)
          setImageFileUrl(null)
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL)
            setFormData({ ...formData, profilePicture: downloadURL })
            resolve()
          })
        }
      )
    })
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (isEmpty(formData)) { return }
    try {
      dispatch(updateStart())
      const updateUser = await updateUserAPI(currentUser._id, formData)
      if (updateUser) {
        dispatch(updateSuccess(updateUser))
        toast.success('Updated successfully')
      }
    } catch (error) {
      dispatch(updateFailure(`${error.response.data.message}`))
      toast.error(errorMessage)
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploading && (
            <CircularProgressbar value={imageFileUploading || 0}
              text={`${imageFileUploading}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploading / 100})`
                }
              }}
            />
          )}
          <img src={imageFileUrl || currentUser.profilePicture} alt='User'
            className={`rounded-full w-full h-full border-8
            object-cover border-pink-100 
            ${imageFileUploading && imageFileUploading < 100 && 'opacity-60'}`}
          />
        </div>
        <TextInput type='text' id='username' placeholder='User Name'
          defaultValue={currentUser.username} onChange={handleChange}
        />
        <TextInput disabled type='email' id='email' placeholder='Email'
          defaultValue={currentUser.email} onChange={handleChange}
        />
        <TextInput disabled type='password' id='password' placeholder='******' onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToBlue'>
          {
            isLoading ?
              <Spinner />:
              'Update'
          }
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  )
}
