import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-pink-400'>
      <div className=''>
        <div className='flex items-center gap-10 pb-2'>
          <div className='lg:ml-20'>
            <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
                text-white'
              >
              HieuPham&#39;s
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3 lg:ml-72 '>
            <div className='md:w-72'>
              <div className='hp-footer-title'>ABOUT</div>
              <ul>
                <li>100 JS Projects</li>
                <li>HieuPham&#39;s Blog</li>
              </ul>
            </div>
            <div className='md:w-72'>
              <div className='hp-footer-title'>
                FOLLOW ME
              </div>
              <ul>
                <li><a
                  href='https://github.com/hieucodevuive'
                  target='_blank'
                  rel='noreferrer'
                >
                    Github
                </a></li>
                <li><a
                  href='https://www.facebook.com/profile.php?id=100015532698727'
                  target='_blank'
                  rel='noreferrer'
                >FaceBook</a></li>
              </ul>
            </div>
            <div className='md:w-72'>
              <div className='hp-footer-title'>LEGAL</div>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='text-center p-2'>
          <div>©2024 HieuPhamDev</div>
          <ul className='flex justify-center gap-3 items-center pt-5'>
            <li className='hp-icon text-pink-400 hover:text-pink-600'><a
              href='https://www.facebook.com/profile.php?id=100015532698727'
              target='_blank'
              rel='noreferrer'><FaFacebook /></a></li>
            <li className='hp-icon text-pink-400 hover:text-pink-600'><a
              href='https://github.com/hieucodevuive'
              target='_blank'
              rel='noreferrer'><FaGithub /></a></li>
            <li className='hp-icon text-pink-400 hover:text-pink-600'><a href=''><FaInstagram /></a></li>
            <li className='hp-icon text-pink-400 hover:text-pink-600'><a href=''><FaLinkedin /></a></li>
          </ul>
        </div>
      </div>
    </Footer>
  )
}
