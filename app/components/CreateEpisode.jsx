'use client'
import { nunito, vazir } from "../utils/fonts"
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "next-auth/react";
import { IoCloseOutline  } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";
import { server } from "../lib/server";

const CreateEpisode = ({ data }) => {
	const { data:session } = useSession();
	const podcastIndex = session ? data.findIndex((podcast) => {
		return podcast.owner === session.user.email
	}) : null;
	const router = useRouter();

	const episodeTitleRef = useRef()
	const episodeDescriptionRef = useRef()

	const episodeId = uuidv4()
	const createEpisode = async () => {
		const episode = {
			id: episodeId,
			title: episodeTitleRef.current.value,
			description: episodeDescriptionRef.current.value,
			published_date: '',
			published_time: '',
			thumbnail: '',
			url: '',
			type: 'audio/mpeg',
			duration: 1234,
			count: 0,
			sections: [],
		}

		const podcastId = data[podcastIndex].id

		await fetch(`${server}/api/podcasts/create-episode`,{
			method:'POST',
			headers: {
				"Content-type": "application/json"
			},
			cache:'no-cache',
			body:JSON.stringify({
				'id': podcastId,
				episode
			})
		})
		.then((response) => response.json())
		.then((data) => {
		})
		.catch((error) => {
			console.error(error);
		});
		router.push(`/edit/${episodeId}`)
	}
	
	return (
		<> 
			{session ? <div>
				<div className={`${nunito.className} ${"container mx-auto flex justify-center w-full lg:mt-[100px] mt-[70px]"}`}>
					<div id="right-section" className="h-full w-full">
						<div className="flex flex-col gap-y-4 lg:p-6">
							<div className="flex flex-col w-full bg-white border-[1px] border-border-gray lg:px-6 px-4 py-6 rounded-xl">
								<div className="">
									<h1 className="text-xl font-bold nunito">Title</h1>
									<div className="flex justify-between items-center border-b-2 border-border-gray px-3">
										<input ref={episodeTitleRef} className={`${vazir.className} ${"episode-title outline-none rounded-lg text-base pt-2 lg:w-6/12 w-full vazir truncate"}`} type="text" placeholder="Enter Title" />
									</div>
								</div>
								<div className="mt-8">
									<h1 className="text-xl font-bold nunito">Description</h1>
									<div className="flex justify-between items-center border-b-2 border-border-gray px-3">
										<input ref={episodeDescriptionRef} className={`${vazir.className} ${"episode-description w-full outline-none text-base pt-2 rounded-lg vazir truncate"}`} type="text" placeholder="Enter Description" />
									</div>
								</div>
							</div>
							<div className="flex w-full justify-end px-6 py-3 gap-3">
								<button className="flex items-center justify-between hover:bg-blue-700 text-md bg-Blue text-white px-6 py-2 rounded-lg duration-100"  onClick={createEpisode}>Next <IoIosArrowRoundForward className="text-2xl" /></button>
							</div>
						</div>
					</div>
				</div>
			</div> : <div className="flex justify-center items-center w-full h-[100vh]">Please Sign In</div> }
		</>
	)
}

export default CreateEpisode
