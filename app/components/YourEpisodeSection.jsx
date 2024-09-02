'use client'
import Link from "next/link"
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { lalezar, nunito, vazir } from "../utils/fonts"
import { TbEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi2";
import { server } from "../lib/server";
import { BsPerson } from "react-icons/bs";
import LogoWhite from '@/app/img/logo CastPlus white blue.svg'

const YourEpisodeSection = ({ data }) => {
	const { data: session } = useSession();
	const podcasts = data;
	const podcastIndex = podcasts.findIndex((podcast) => {
		if (session) {
			return podcast.owner === session.user.email;
		}
	})

	const episodes = podcastIndex !== -1 ? podcasts[podcastIndex].episodes : null;

	return (
	<> {session ? 
		<div className="container mx-auto lg:mt-[100px] mt-[70px] mb-6">
			{podcastIndex !== -1 ? 
				<div className={`${nunito.className} ${""}`}>
					<section className="grid lg:grid-cols-12 grid-cols-1 gap-8 h-full w-full rtl">
						<div className="lg:col-span-4 col-span-1 lg:sticky relative lg:top-40 lg:right-0 mt-[15px] w-full h-fit ltr z-10">
							<div className="relative flex flex-col items-center bg-white border-[1px] w-full pb-40 rounded-xl">
								<div className="hover:bg-gray-50 absolute top-6 left-6 border-[2px] border-[#dfe1e3] rounded-md p-1 cursor-pointer duration-150">
									<TbEdit className="text-2xl text-[#444749]"/>
								</div>
								<div className="relative lg:-top-8 top-0 bg-[#ebedef] text-[#c5c7c9] rounded-full w-fit p-4 border-[7px] border-white shadow-md">
									<BsPerson className="text-7xl" />
								</div>
								<div className="flex justify-center w-full lg:-mt-4">
									<p className="text-md lg:text-md font-semibold truncate">Radio Rah</p>
								</div>
							</div>
						</div>
						{/* </div> */}
		    			<div className={`${vazir.className} ${"no-scrollbar lg:col-span-8 col-span-1 w-full space-y-4 ltr"}`}>
							<div className="flex items-center w-full">
								<span className="w-full h-[1px] bg-gray-300"></span>
								<p className={`${nunito.className} ${"text-xl font-bold mx-3"}`}>Episodes</p>
								<span className="w-full h-[1px] bg-gray-300"></span>
							</div>
							{ episodes.length === 0 ? 
								<div className="flex justify-center">
									<p className="text-gray-600">There are no episodes yet</p>
								</div> : 
								episodes.map((episode) => (
									<div className="bg-white border-[1px] p-5 rounded-xl text-sm lg:text-md justify-center truncate">
										<div className="flex w-full justify-between">
											<p className="lg:ps-2 text-sm lg:text-md font-semibold truncate">{episode.title}</p>
											<div className="flex col-span-3 space-x-1 lg:space-x-1 justify-end">
												<Link href={`${'/edit/'}${episode.id}`}><button className="flex hover:bg-blue-100 text-blue-500 rounded-md px-2 py-2 ms-1 md:ms-2 duration-150 space-x-[2px] text-sm lg:text-md">< TbEdit className="text-xl"/></button></Link>
												<button className="flex hover:bg-red-100 text-red-500 rounded-md px-2 py-2 duration-150 space-x-[2px] text-sm lg:text-md">< HiOutlineTrash className="text-xl"/></button>
											</div>
										</div>
										<p className="text-md w-full truncate text-gray-600">{episode.description}</p>
										<p className={`${lalezar.className} ${"px-1 pt-[2px] rounded-md mt-5  text-xs lg:text-md truncate text-blue-600 bg-blue-100 w-fit"}`}>Number of sections: {episode.count}</p>
									</div>
								))
							}
		    			</div>
					</section>
				</div> :
				<div>
					<div className='flex justify-center items-center h-[80vh]'>
						<div className={`${nunito.className} ${"flex justify-center"}`}>
							<div className="relative flex flex-col justify-center items-center md:w-[480px] sm:w-[550px] w-[340px] shadow-lg h-full overflow-hidden bg-white rounded-2xl my-12">
								<div className='flex items-end justify-center bg-Blue w-[800px] h-[400px] mt-[-290px] rounded-[50%]'>
									<Image className='w-12 mb-7' alt='' width='' src={LogoWhite} />
								</div>
								<div className="w-full mt-2 mb-6 px-5 sm:px-10">
									<p className="text-center">You do not have a podcast. To continue, please create your own podcast.</p>
									<Link href='/create-podcast'>
										<button className="hover:bg-blue-700 flex items-center justify-center text-md rounded-xl bg-Blue text-white w-full px-3 py-2 mt-3 duration-150">Create your own podcast</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
		: <div className='flex justify-center items-center h-[80vh]'>
			<div className={`${nunito.className} ${"flex justify-center"}`}>
				<div className="relative flex flex-col justify-center items-center md:w-[480px] sm:w-[550px] w-[340px] shadow-lg h-full overflow-hidden bg-white rounded-2xl my-12">
					<div className='flex items-end justify-center bg-Blue w-[800px] h-[400px] mt-[-290px] rounded-[50%]'>
						<Image className='w-12 mb-7' alt='' width='' src={LogoWhite} />
					</div>
					<div className="w-full mt-2 mb-6 px-5 sm:px-10">
						<p className="text-center">At First, log in to your account.</p>
						<Link href='/signin-signup'>
							<button className="hover:bg-blue-700 flex items-center justify-center text-md rounded-xl bg-Blue text-white w-full px-3 py-2 mt-3 duration-150">Sign In or Sign Up</button>
						</Link>
					</div>
				</div>
			</div>
		</div> }
	</>
  )
}

export default YourEpisodeSection
