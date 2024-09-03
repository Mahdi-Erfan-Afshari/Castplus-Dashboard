'use client'
import Link from "next/link"
import Image from 'next/image';
import { useSession, signIn } from "next-auth/react";
import { lalezar, nunito, vazir, vazirBold } from "../utils/fonts"
import { TbEdit } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi2";
import { server } from "../lib/server";
import { BsPerson } from "react-icons/bs";
import LogoWhite from '@/app/img/logo CastPlus white blue.svg'
import { FiMoreVertical } from "react-icons/fi";
import { IoCloseOutline, IoAddOutline } from "react-icons/io5";
import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import EditPodcastModal from "./EditPodcastModal";

const YourEpisodeSection = ({ data }) => {
	const [loading, setLoading] = useState(false)
	const [podcastModalRef, setPodcastModalRef] = useState(null)
	const { data: session } = useSession();
	
	const podcasts = data;
	const podcastIndex = podcasts.findIndex((podcast) => {
		if (session) {
			return podcast.owner === session.user.email;
		}
	})

	const episodes = podcastIndex !== -1 ? podcasts[podcastIndex].episodes : null;
	const router = useRouter()

	const [episodeDeleteIndex, setEpisodeDeleteIndex] = useState(null)

	const deleteEpisode = async () => {
		const podcastId = data[podcastIndex].id
		const episodeId = episodes[episodeDeleteIndex].id
		setLoading(true)
		await fetch(`${server}/api/podcasts/delete-episode`,{
			method:'DELETE',
			headers: {
				"Content-type": "application/json"
			},
			cache:'no-cache',
			body:JSON.stringify({
				'id': podcastId,
				episodeId
			})
		})
		.then((response) => response.json())
		.then((data) => {
			setLoading(false)
		})
		.catch((error) => {
			console.error(error);
		});
		router.refresh();
	}

	const openEpisodeDeleteModal = (index) => {
		const modal = document.querySelector('#episode-delete-modal');
		modal.classList.remove('hidden');
		setEpisodeDeleteIndex(index);
	}

	const closeEpisodeDeleteModal = () => {
		const modal = document.querySelector('#episode-delete-modal');
		modal.classList.add('hidden');
	}

	const documentClickCloseModal = (e) => {
		const deleteEpisodeModal = document.querySelector('#episode-delete-modal');
		const deleteEpisodeModalFirstChild = deleteEpisodeModal.firstElementChild;

		if (e.target.contains(deleteEpisodeModalFirstChild) && e.target !== deleteEpisodeModalFirstChild) {
			deleteEpisodeModal.classList.add('hidden');
		}
	}

	const getEditPodcastModalRef = (event) => {
		setPodcastModalRef(event)
	}

	const openPodcastModal = () => {
		podcastModalRef.current.classList.remove('hidden');
	}

	return (
	<Suspense fallback={<Loading />}>
		<> {loading ? <Loading /> :
		<> {session ? 
			<div className="container mx-auto lg:mt-[100px] mt-[70px] mb-6">
				{podcastIndex !== -1 ? 
					<div className={`${nunito.className} ${""}`}>
						<section className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-0 h-full w-full rtl">
							<div className='relative bg-white overflow-hidden rounded-xl mb-8 border-[1px] border-border-gray col-span-4 lg:sticky lg:top-10 lg:right-0 w-full h-fit ltr'>
								<div className='relative flex flex-col py-3 px-6'>
									<div className='relative flex space-x-3'>
										<div className='w-20 h-20'>
											{ podcasts[podcastIndex].thumbnail !== '' ? <Image className='rounded-full w-full h-full object-cover' src={podcasts[podcastIndex].thumbnail} alt='podcast logo' width='300' height='300'/> : 
											<div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200"><BsPerson className="text-5xl text-gray-600" /></div> }
										</div>
										<div className='flex flex-col items-center justify-center'>
											<div className='relative flex items-center space-x-2'>
												<div className='flex flex-col justify-center items-center'>
													<p className='font-semibold'>{podcasts[podcastIndex].episodes.length}</p>
													<p className='text-[11px] text-Gray'>episodes</p>
												</div>
											</div>
										</div>
									</div>
									<div className='flex lg:flex-row flex-col justify-between w-full h-full mt-2'>
										<div className='flex flex-col h-full'>
											<h1 className={`${vazirBold.className} ${'md:text-lg sm:text-md text-sm font-black'}`}>{podcasts[podcastIndex].name}</h1>
											<p className={`${vazir.className} ${'text-xs text-Gray mt-1 2xl:max-w-[550px] xl:max-w-[450px] lg:max-w-[380px]'}`}>{podcasts[podcastIndex].about}</p>
										</div>
									</div>
									<div className="mt-4">
										<button className="hover:bg-gray-200 bg-gray-100 text-sm w-full rounded-lg py-1 px-3 duration-100" onClick={openPodcastModal}>Edit Profile</button>
									</div>
								</div>
							</div>
			    			<div className={`${vazir.className} ${"no-scrollbar lg:col-span-8 col-span-1 w-full space-y-4 ltr"}`}>
								<div className="flex items-center justify-between w-full">
									<p className={`${nunito.className} ${"text-xl font-bold mx-3"}`}>Episodes</p>
									<Link href={'create-episode'}>
										<button className={`${nunito.className} ${"hover:bg-blue-700 flex items-center justify-center text-sm bg-Blue text-white px-3 py-2 duration-150 rounded-full"}`}>
											<IoAddOutline className="text-lg" />
											<span>Create</span>
										</button>
									</Link>
								</div>
								{ episodes.length === 0 ? 
									<div className="flex justify-center">
										<p className="text-gray-600">There are no episodes yet</p>
									</div> : 
									episodes.map((episode, index) => (
										<div key={index} className="bg-white border-[1px] p-5 rounded-xl text-sm lg:text-md justify-center truncate">
											<div className="flex w-full justify-between">
												<p className="lg:ps-2 text-sm lg:text-md font-semibold truncate">{episode.title}</p>
												<div className="flex col-span-3 space-x-1 lg:space-x-1 justify-end">
													<Link href={`${'/edit/'}${episode.id}`}><button className="flex hover:bg-blue-100 text-blue-500 rounded-md px-2 py-2 ms-1 md:ms-2 duration-150 space-x-[2px] text-sm lg:text-md">< TbEdit className="text-xl"/></button></Link>
													<button className="flex hover:bg-red-100 text-red-500 rounded-md px-2 py-2 duration-150 space-x-[2px] text-sm lg:text-md" onClick={() => openEpisodeDeleteModal(index)}>< HiOutlineTrash className="text-xl"/></button>
												</div>
											</div>
											<p className="text-md w-full truncate text-gray-600">{episode.description}</p>
											<p className={`${lalezar.className} ${"px-1 pt-[2px] rounded-md mt-5  text-xs lg:text-md truncate text-blue-600 bg-blue-100 w-fit"}`}>Number of sections: {episode.count}</p>
										</div>
									))
								}
			    			</div>
							<div id="episode-delete-modal" className="hidden fixed top-0 left-0 flex justify-center items-center w-full h-full bg-transparent-black-50 ms-0 z-30 ltr" onClick={documentClickCloseModal}>
								<div className="flex flex-col justify-center items-end bg-white px-5 py-3 m-5 max-w-8xl mt-[72px] max-h-[80vh] rounded-2xl">
									<button className="h-fit" type="button" onClick={closeEpisodeDeleteModal}><IoCloseOutline className="hover:bg-hover-gray hover:text-gray-700 text-gray-400 p-1 box-content rounded-lg lg:text-2xl text-xl duration-100" /></button>
									<div className="max-h-[60vh] overflow-y-scroll no-scrollbar">
										<div>
											<p className="text-lg text-gray-600">Do you want to delete This episode?</p>
											<p className=" text-gray-600">You will no longer be able to return it.</p>
										</div>
									</div>
									<div className="flex w-full pt-3 gap-3">
										<button className="hover:bg-gray-100 hover:text-gray-700  text-gray-500 px-5 py-2 w-1/2 rounded-md duration-100" type="button" onClick={closeEpisodeDeleteModal}>Cancel</button>
										<button className="hover:bg-red-100 hover:text-red-600 text-red-500 px-5 py-2 w-1/2 rounded-md duration-100" type="button" onClick={deleteEpisode}>Delete</button>
									</div>
								</div>
							</div>

							<EditPodcastModal sendPodcastModalRef={getEditPodcastModalRef} podcastId={podcasts[podcastIndex].id} setLoading={setLoading} podcast={podcasts[podcastIndex]} />
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
										<Link href={'/create-podcast'}>
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
							<Link href={'/signin-signup'}>
								<button className="hover:bg-blue-700 flex items-center justify-center text-md rounded-xl bg-Blue text-white w-full px-3 py-2 mt-3 duration-150" onClick={() => {signIn()}}>Sign In or Sign Up</button>
							</Link>
						</div>
					</div>
				</div>
			</div> }
		</>}
		</>
	</Suspense >
  )
}

export default YourEpisodeSection
