'use client'
import Link from "next/link"
import Image from 'next/image';
import LogoWhite from '@/app/img/logo CastPlus white blue.svg'
import { nunito } from "../utils/fonts"
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { server } from "@/app/lib/server";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const CreatePodcast = () => {
	const { data:session } = useSession()
	const podcastNameRef = useRef()
	const podcastAboutRef = useRef()
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	
	const createPodcast = async () => {
		let podcastName = podcastNameRef.current.value;
		let podcastAbout = podcastAboutRef.current.value;

		const podcastInfo = {
			id: uuidv4(),
			name: podcastName,
			about: podcastAbout,
			thumbnail: '',
			stargazers_count: '4.4',
			owner: session.user.email,
			episodes: []
		}
		setLoading(true);
		await fetch(`${server}/api/podcasts/create` , {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(podcastInfo)
		})
		.then((response) => response.json())
		.then((data) => {
			setLoading(false)
		})
		.catch((error) => {
			console.error(error);
		});
		// router.push('/');
		router.refresh();
	}

  return (
	<>{loading ? <Loading /> :
		<div className='container mx-auto lg:mt-[100px] mt-[70px]'>
			<div className='flex justify-center items-center h-[80vh]'>
				<div className={`${nunito.className} ${"flex justify-center"}`}>
					<div className="relative flex flex-col justify-center items-center md:w-[480px] sm:w-[550px] w-[340px] shadow-lg h-full overflow-hidden bg-white rounded-2xl my-12">
						<div className='flex items-end justify-center bg-Blue w-[800px] h-[400px] mt-[-290px] rounded-[50%]'>
							<Image className='w-12 mb-7' alt='' width='' src={LogoWhite} />
						</div>
						<div className="w-full mt-2 mb-6 px-5 sm:px-10">
							<div className="space-y-5">
								<div className="flex flex-col space-y-1 border-b-[1px] border-border-gray">
									<label htmlFor="podcast-name" className="text-sm">Podcast Name</label>
									<input ref={podcastNameRef} id="podcast-name" className="border-none outline-none" type="text" placeholder="Podcast Name..." />
								</div>
								<div className="flex flex-col space-y-1 border-b-[1px] border-border-gray">
									<label htmlFor="podcast-about" className="text-sm">About Your Podcast</label>
									<input ref={podcastAboutRef} id="podcast-about" className="border-none outline-none" type="text" placeholder="About Your Podcast..." />
								</div>
							</div>
							<div className="flex mt-3">
								<Link href='/' onClick={createPodcast}><button className="hover:bg-blue-700 flex items-center justify-center text-md rounded-xl bg-Blue text-white w-full px-3 py-2 mt-3 duration-150">Create</button></Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>}
	</>
  )
}

export default CreatePodcast