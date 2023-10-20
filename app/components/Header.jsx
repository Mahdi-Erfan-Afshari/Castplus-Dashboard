'use client'
import { nunito } from '../utils/fonts'
import Link from 'next/link';
import Image from 'next/image'
import Group from '@/app/img/Group.svg'

const Header = () => {
	return (
		<div className={nunito.className}>
			<nav className='flex justify-end'>
				<div id='header' className='lg:w-[calc(100%_-_18rem)] lg:block hidden items-center px-6 pt-6'>
					<div className='flex justify-start'>
						<Link href='/'><h1 className='relative flex items-center text-2xl font-semibold '><Image className="inline-block pe-2" width={40} height={40} src={Group} alt='Logo'/><div className='flex flex-col justify-center items-center'><p className='flex flex-col text-[21px] font-bold mb-[-17px] mt-1 justify-center'>CastPlus</p><p className='flex flex-col text-[11px] text-black justify-center'>The Podcast App</p></div></h1></Link>
					</div>
				</div>
				
				{/* Mobile Menu */}
				<div className='flex justify-center w-full relative lg:hidden pt-3'>
					<Link href='/'><h1 className='flex items-center text-2xl font-semibold'><Image className="inline-block pe-1" width={36} height={36} src={Group} alt='Logo'/><div className='flex flex-col justify-center items-center'><p className='flex flex-col text-[19px] font-bold mb-[-18px] mt-[2px] justify-center'>CastPlus</p><p className='flex flex-col text-[10px] text-black justify-center'>The Podcast App</p></div></h1></Link>
				</div>
			</nav>
		</div>
	)
}

export default Header
