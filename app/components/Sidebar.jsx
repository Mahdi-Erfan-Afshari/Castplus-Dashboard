'use client'
import { useSession, signOut } from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'
import { nunito } from '@/app/utils/fonts'
import { BiHomeAlt2 } from 'react-icons/bi'
import { BsHeadset } from 'react-icons/bs'
import {RxDashboard} from 'react-icons/rx'
import { MdOutlinePodcasts } from 'react-icons/md'
import { IoIosArrowBack } from 'react-icons/io'
import { IoLogOutOutline } from 'react-icons/io5'
import { HiMenuAlt2 } from 'react-icons/hi'


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
	
	// const toggleSidebar = () => {
	// 	let sidebar = document.getElementById('sidebar');
	// 	let accountInfoBody = document.getElementById('account-info-body');
	// 	let accountInfo = document.getElementById('account-info');
	// 	let accountImage = document.getElementById('account-image');
	// 	let toggleSidebarIcon = document.getElementById('toggle-sidebar-icon');
	// 	let sidebarButtons = document.querySelectorAll('.sidebar-button-toggle');
	// 	let sidebarButtonIcon = document.querySelectorAll('.sidebar-button-icon');
	// 	let sidebarBtnText = document.querySelectorAll('.sidebar-btn-text');
	// 	let rightSection = document.getElementById('right-section');
	// 	let header = document.getElementById('header');
		
	// 	if(document.documentElement.clientWidth > 768) {

	// 		sidebar.classList.toggle('w-72');
	// 		sidebar.classList.toggle('md:w-72');
	// 		sidebar.classList.toggle('w-[72px]');
	// 		accountInfoBody.classList.toggle('ps-4');
	// 		accountInfo.classList.toggle('hidden');
	// 		accountInfo.parentElement.classList.toggle('p-2');
	// 		accountImage.classList.toggle('hidden');
	// 		toggleSidebarIcon.classList.toggle('col-span-12');
	// 		toggleSidebarIcon.classList.toggle('col-span-1');
	// 		toggleSidebarIcon.classList.toggle('px-4');
	// 		toggleSidebarIcon.classList.toggle('rounded-s-md');
	// 		toggleSidebarIcon.classList.toggle('rounded-md');
	// 		toggleSidebarIcon.classList.toggle('py-5');
	// 		toggleSidebarIcon.classList.toggle('py-4');
	// 		toggleSidebarIcon.classList.toggle('rotate-180');
	// 		rightSection.classList.toggle('lg:w-[calc(100%_-_18rem)]');
	// 		rightSection.classList.toggle('lg:w-[calc(100%_-_72px)]');
	// 		header.classList.toggle('lg:w-[calc(100%_-_18rem)]');
	// 		header.classList.toggle('lg:w-[calc(100%_-_72px)]');
	
	// 		for (var i = 0; i < sidebarButtons.length; i++) {
	// 			sidebarBtnText[i].classList.toggle('hidden');
	// 			sidebarButtons[i].classList.toggle('px-6');
	// 			sidebarButtons[i].classList.toggle('px-0');
	// 			sidebarButtons[i].classList.toggle('h-14');
	// 			sidebarButtons[i].classList.toggle('space-x-3');
	// 			sidebarButtons[i].classList.toggle('justify-center');
	// 			sidebarButtonIcon[i].classList.toggle('text-2xl');
	// 		}
	// 	} else {
	// 		sidebar.classList.toggle('w-72');
	// 		sidebar.classList.toggle('w-0');
	// 		toggleSidebarIcon.classList.toggle('hidden');
	// 	}
	// }

  return (
	<div className={`${nunito.className} ${'fixed lg:top-[72px] top-[56px] left-0 h-full bg-white shadow-lg duration-200'}`}>
		{/* <div className='fixed top-5 left-5 p-2 cursor-pointer z-20' onClick={toggleSidebar}>
			<HiMenuAlt2 className='text-2xl z-20' />
		</div> */}
		<div id='sidebar' className={`${nunito.className} ${'w-0 overflow-y-auto lg:max-h-[calc(100%_-_72px)] max-h-[calc(100%_-_56px)] duration-200'}`}>
			{/* <div id='account-info-body' className='flex items-center justify-center space-x-2 duration-100 h-16 ps-4 mt-8'> */}
			{/* <div id='toggle-sidebar-icon' className='py-5 rounded-s-md bg-[#e6f2ff] text-Blue col-span-1 cursor-pointer hidden md:block' onClick={toggleSidebar}>	
				<IoIosArrowBack className='text-2xl' />
			</div> */}
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
			{/* </div> */}

			<div className='flex flex-col justify-between px-2 my-6 space-y-2'>
				<div className='flex flex-col space-y-2'>
					<Link href='' className='sidebar-button hover:bg-[#e6f2ff] hover:text-Blue bg-[#e6f2ff] text-Blue rounded-lg overflow-hidden duration-100'>
						<div className='sidebar-button'>
							<div className='sidebar-button sidebar-button-toggle flex items-center space-x-3 px-6 py-2' onClick={changeActiveButton}>
								<MdOutlinePodcasts className='text-xl sidebar-button-icon' />
								<p className='sidebar-btn-text'>Your Episodes</p>
							</div>
						</div>
					</Link>
				</div>
				<div className='flex flex-col space-y-2'>
					<Link href='' className='sidebar-button bg-[#ff1c1c1c] text-Red rounded-lg overflow-hidden duration-100'>
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
