'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { nunito } from '../utils/fonts'
import Link from 'next/link';
import Image from 'next/image'
import Group from '@/app/img/Group.svg'
import { HiMenuAlt2 } from 'react-icons/hi'

const Header = () => {
	const toggleSidebar = () => {
		let sidebar = document.getElementById('sidebar');
		sidebar.classList.toggle('w-72');
		sidebar.classList.toggle('w-0');
	}
	return (
		<div className={`${nunito.className} ${'fixed top-0 left-0 w-full z-10 '}`}>
			<nav className='container mx-auto w-full shadow-sm backdrop-blur-lg bg-white/60'>
				<div className='lg:grid hidden grid-cols-12 items-center py-4 w-full'>
					<div className='p-2 cursor-pointer col-span-1 z-20' onClick={toggleSidebar}>
						<HiMenuAlt2 className='text-2xl z-20' />
					</div>
					<div className='flex justify-end col-span-11'>
						<Link href='/'><h1 className='relative flex items-center text-2xl font-semibold '><Image className="inline-block" width={120} height={120} src={Group} alt='Logo'/></h1></Link>
					</div>
				</div>
				
				{/* Mobile Menu */}
				<div className='flex justify-between items-center w-full relative lg:hidden py-2'>
					<div className='p-2 cursor-pointer z-20' onClick={toggleSidebar}>
						<HiMenuAlt2 className='text-2xl z-20' />
					</div>
					<Link href='/'><h1 className='relative flex items-center text-2xl font-semibold z-10'><Image className="inline-block mb-[2px]" width={100} height={100} src={Group} alt='Logo'/></h1></Link>
				</div>
			</nav>
		</div>
	)
}

export default Header
