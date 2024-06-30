'use client'
import { nunito } from '../utils/fonts'
import Link from 'next/link';
import Image from 'next/image'
import Group from '@/app/img/Group.svg'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useState } from 'react';

const Header = () => {
	const [toggleHamburgerButton, setToggleHamburgerButton] = useState(false)
	const toggleSidebar = () => {
		let sidebar = document.getElementById('sidebar');
		let desktopHamburgerButton = document.getElementById('desktop-menu-btn');
		let mobileHamburgerButton = document.getElementById('mobile-menu-btn');
		sidebar.classList.toggle('w-72');
		sidebar.classList.toggle('w-0');
		setToggleHamburgerButton(!toggleHamburgerButton)
		if(document.documentElement.clientWidth > 768) {
			desktopHamburgerButton.classList.toggle('open');
		} else {
			mobileHamburgerButton.classList.toggle('open');
		}
	}

	return (
		<div className={`${nunito.className} ${'fixed top-0 left-0 w-full z-[1000] backdrop-blur-lg bg-white/60 shadow-sm'}`}>
			<nav className='container mx-auto w-full'>
				<div className='lg:grid hidden grid-cols-12 items-center py-1 w-full'>
					{/* <div className='p-2 cursor-pointer col-span-1 z-20' onClick={toggleSidebar}>
						<HiMenuAlt2 className='text-2xl z-20' />
					</div> */}
						<button id="desktop-menu-btn" className={`${!toggleHamburgerButton ? '' : 'open'} ${"flex items-center hover:bg-gray-100 w-12 h-12 rounded-lg duration-200 col-span-1 z-20"}`} onClick={toggleSidebar}>
							<div className="flex flex-col mx-auto space-y-1 hamburger-button">
								<span className="hamburger-top w-5 h-[2px] bg-black rounded-full duration-200"></span>
								<span className="hamburger-middle w-5 h-[2px] bg-black rounded-full duration-200"></span>
								<span className="hamburger-bottom w-5 h-[2px] bg-black rounded-full duration-200"></span>
							</div>
						</button>
					<div className='flex justify-end col-span-11'>
						<Link href='/'><h1 className='relative flex items-center text-2xl font-semibold '><Image className="inline-block" width={100} height={100} src={Group} alt='Logo'/></h1></Link>
					</div>
				</div>
				
				{/* Mobile Menu */}
				<div className='flex justify-between items-center w-full relative lg:hidden py-2'>
					<button id="mobile-menu-btn" className={`${!toggleHamburgerButton ? '' : 'open'} ${"flex items-center hover:bg-gray-100 w-10 h-10 rounded-lg duration-200 z-20"}`} onClick={toggleSidebar}>
						<div className="flex flex-col mx-auto space-y-1 col-span-1 z-20 hamburger-button">
							<span className="hamburger-top w-5 h-0.5 bg-black rounded-full duration-200"></span>
							<span className="hamburger-middle w-5 h-0.5 bg-black rounded-full duration-200"></span>
							<span className="hamburger-bottom w-5 h-0.5 bg-black rounded-full duration-200"></span>
						</div>
					</button>
					<Link href='/'><h1 className='relative flex items-center text-2xl font-semibold z-10'><Image className="inline-block mb-[2px]" width={100} height={100} src={Group} alt='Logo'/></h1></Link>
				</div>
			</nav>
		</div>
	)
}

export default Header
