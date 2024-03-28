import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signoutAPI } from '../../api/auth.api'
import { userSignOut } from '../redux/user/userSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

export default function DashSidebar() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const handleSignout = async() => {
    try {
      await signoutAPI()
      dispatch(userSignOut())
      navigate('/signin')
      toast.success('Sign out successfully')
    } catch (error) {
      toast.error(`${error.response.data.message}`)
    }
    dispatch(userSignOut())
    navigate('/signin')
  }
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'>
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
