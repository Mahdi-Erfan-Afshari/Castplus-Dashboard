import Link from "next/link"
import { lalezar, nunito, vazir } from "../utils/fonts"
// import {BiSolidEditAlt} from 'react-icons/bi'
// import { BiSolidEdit } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
// import {IoTrashSharp} from 'react-icons/io5'
import { HiOutlineTrash } from "react-icons/hi2";
import { server } from "../lib/server";
import { BsPerson } from "react-icons/bs";

const fetchPodcasts = async () => {
	const res = await fetch(`${server}/api/podcasts`, {
		cache: "no-store",
	  })
	const data = await res.json();
	return data
}

const YourEpisodeSection = async ({ data }) => {
	// const episodess = data[1].episodes;
	
	const datas = await fetchPodcasts()
	const episodes = datas[1].episodes;
	return (
	// <div className={`${nunito.className} ${"flex justify-end w-full"}`}>
	// 	<div id="right-section" className="h-full lg:w-[calc(100%_-_18rem)]">
    // 		<div className="flex justify-center p-3 md:p-4 lg:p-6 w-full h-full">
	// 			<div className="flex flex-col bg-white border-[1px] border-[#eee] rounded-xl w-full h-full overflow-hidden">
	// 				<div className="flex flex-col w-full">
	// 					<div className="bg-[#e6f2ff] text-Blue w-full px-4 py-2">
	// 						<p className="text-lg font-semibold">Your episodes list</p>
	// 					</div>
	// 					<span className="bg-[#ddd] w-full h-[1px]"></span>
	// 				</div>
	// 				<div className="h-full p-2 lg:p-3">
	// 					<div className="grid grid-cols-12">
	// 						<div className="col-span-3 flex text-Gray px-1 lg:px-2">
	// 							<p className="min-w-[30px] max-w-[30px] md:min-w-[35px] md:max-w-[35px] lg:min-w-[45px] lg:max-w-[45px] xl:min-w-[55px] xl:max-w-[55px] text-sm lg:text-md truncate">ID</p>
	// 							<p className="border-s-[1px] border-[#eee] ps-1 lg:ps-2 text-sm lg:text-md">Title</p>
	// 						</div>
	// 						<div className="col-span-6 text-Gray border-s-[1px] border-[#eee] px-1 lg:px-2"><p className="text-sm lg:text-md truncate">Description</p></div>
	// 						<div className="col-span-3 text-Gray border-s-[1px] border-[#eee] px-1 lg:px-2"><p className="text-sm lg:text-md truncate">Actions</p></div>
	// 					</div>
	// 					{
	// 						episodes.map((episode) => (
	// 							<div className={`${vazir.className} ${"grid grid-cols-12 mt-5"}`}>
	// 								<div className="col-span-3 flex text-Gray px-1 lg:px-2">
	// 									<p className="min-w-[30px] max-w-[30px] md:min-w-[35px] md:max-w-[35px] lg:min-w-[45px] lg:max-w-[45px] xl:min-w-[55px] xl:max-w-[55px] text-sm lg:text-md truncate">{episodes.findIndex((index) => index.id === episode.id ) + 1}</p>
	// 									<p className="border-s-[1px] border-[#eee] ps-1 lg:ps-2 text-sm lg:text-md truncate">{episode.title}</p>
	// 								</div>
	// 								<div className="col-span-6 text-Gray border-s-[1px] border-[#eee] text-sm lg:text-md px-1 lg:px-2"><p className="truncate">{episode.description}</p></div>
	// 								<div className="flex col-span-3 text-Gray border-s-[1px] border-[#eee] space-x-1 lg:space-x-2">
	// 									<Link href={`${'/edit/'}${episode.id}`}><button className="flex hover:bg-Blue bg-[#446afe] text-white rounded-md px-2 md:px-1 lg:px-3 xl:px-5 py-1 ms-1 md:ms-2 duration-150 space-x-[2px] text-sm lg:text-md">< BiSolidEditAlt className="text-lg lg:text-xl"/> <p className="hidden md:block">Edit</p></button></Link>
	// 									<button className="flex hover:bg-red-600 bg-red-500 text-white rounded-md px-2 md:px-1 lg:px-2 xl:px-3 py-1 duration-150 space-x-[2px] text-sm lg:text-md">< IoTrashSharp className="text-lg lg:text-xl"/> <p className="hidden md:block">Delete</p></button>
	// 								</div>
	// 							</div>
	// 						))
	// 					}
	// 				</div>
	// 			</div>
    // 		</div>
	// 	</div>
	// </div>
	<div className="container mx-auto lg:mt-[100px] mt-[56px] mb-6">
		<div className={`${nunito.className} ${""}`}>
			{/* <div id="right-section" className="flex h-full lg:w-[calc(100%_-_18rem)] w-full justify-center"> */}
			<section className="grid lg:grid-cols-12 grid-cols-1 gap-8 h-full w-full rtl">
				{/* <div className="flex "> */}
				<div className="lg:col-span-4 col-span-1 lg:sticky lg:top-36 lg:right-0 w-full h-fit ltr">
					<div className="relative flex flex-col items-center bg-white border-[1px] w-full pb-40 rounded-xl">
						<div className="hover:bg-gray-50 absolute top-6 left-6 border-[2px] border-[#dfe1e3] rounded-md p-1 cursor-pointer duration-150">
							<TbEdit className="text-2xl text-[#444749]"/>
						</div>
						<div className="relative lg:-top-8 top-0 bg-[#ebedef] text-[#c5c7c9] rounded-full w-fit p-4 border-[7px] border-white shadow-md">
							<BsPerson className="text-7xl" />
						</div>
						<div className="flex justify-center w-full -mt-4">
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
					{
						episodes.map((episode) => (
							<div className="bg-white border-[1px] p-5 rounded-xl text-sm lg:text-md justify-center truncate">
								<div className="flex w-full justify-between">
									<p className="lg:ps-2 text-sm lg:text-md font-semibold truncate">{episode.title}</p>
									<div className="flex col-span-3 space-x-1 lg:space-x-1 justify-end">
										<Link href={`${'/edit/'}${episode.id}`}><button className="flex hover:bg-blue-100 text-blue-500 rounded-md px-2 py-2 ms-1 md:ms-2 duration-150 space-x-[2px] text-sm lg:text-md">< TbEdit className="text-lg lg:text-xl"/></button></Link>
										<button className="flex hover:bg-red-100 text-red-500 rounded-md px-2 py-2 duration-150 space-x-[2px] text-sm lg:text-md">< HiOutlineTrash className="text-lg lg:text-xl"/></button>
									</div>
								</div>
								<p className="text-md w-full truncate text-gray-600">{episode.description}</p>
								<p className={`${lalezar.className} ${"px-1 pt-[2px] rounded-md mt-5  text-sm lg:text-md truncate text-blue-600 bg-blue-100 w-fit"}`}>Number of sections: {episode.count}</p>
							</div>
						))
					}
	    		</div>
			</section>
		</div>
	</div>
  )
}

export default YourEpisodeSection
