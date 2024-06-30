'use client'
import { useSession, signOut } from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'
import { nunito } from '@/app/utils/fonts'
import { MdOutlinePodcasts } from 'react-icons/md'
import { IoLogOutOutline } from 'react-icons/io5'


const Sidebar = () => {
	const { data: session } = useSession()

	const changeActiveButton = (e) => {
		let sidebarButtons = document.querySelectorAll('.sidebar-button')
		sidebarButtons.forEach((sidebarButton) => {
			sidebarButton.classList.remove('text-Blue')
			sidebarButton.classList.remove('bg-[#e6f2ff]')
		})

		e.target.parentElement.parentElement.classList.add('text-Blue')
		e.target.parentElement.parentElement.classList.add('bg-[#e6f2ff]')
	}

  return (
	<div className={`${nunito.className} ${'fixed top-[56px] left-0 h-full backdrop-blur-lg bg-white/60 shadow-lg duration-200 z-9'}`}>
		<div id='sidebar' className={`${nunito.className} ${'w-0 overflow-y-auto lg:max-h-[calc(100%_-_72px)] max-h-[calc(100%_-_56px)] duration-200'}`}>
			{session ?
				<div className='grid grid-cols-12 items-center w-full'>
					<div id='account-image' className='col-span-2 rounded-full overflow-hidden'>
						<Image className='w-full h-full object-cover' src={session.user.image} width={100} height={100} alt='User Image'/>
					</div>
					<div id='account-info' className='col-span-9 leading-5 max-w-[210px] ms-2'>
						<h1 className='text-black text-md font-bold truncate'>{session.user.name}</h1>
						<p className='text-Gray text-[14px] truncate'>{session.user.email}</p>
					</div>
				</div>
			: ''}

			<div className='flex flex-col justify-between px-2 my-6 space-y-2'>
				<div className='flex flex-col space-y-2'>
					<Link href='' className='sidebar-button hover:bg-[#e6f2ff] hover:text-Blue bg-[#c7e2ff]/60 backdrop-blur-lg text-Blue rounded-lg overflow-hidden duration-100'>
						<div className='sidebar-button'>
							<div className='sidebar-button sidebar-button-toggle flex items-center space-x-3 px-6 py-2' onClick={changeActiveButton}>
								<MdOutlinePodcasts className='text-xl sidebar-button-icon' />
								<p className='sidebar-btn-text'>Your Episodes</p>
							</div>
						</div>
					</Link>
				</div>
				<div className='flex flex-col space-y-2'>
					<Link href='' className='sidebar-button bg-[#ff1c1c1c]/20 backdrop-blur-lg text-Red rounded-lg overflow-hidden duration-100'>
						<div className='sidebar-button'>
							<div className='sidebar-button sidebar-button-toggle flex items-center space-x-3 px-6 py-2' onClick={() => {signOut()}}>
								<IoLogOutOutline className='text-xl sidebar-button-icon' />
								<p className='sidebar-btn-text'>Sign Out</p>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Sidebar
