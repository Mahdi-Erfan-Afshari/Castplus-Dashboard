import Link from "next/link"
import { nunito, vazir } from "../utils/fonts"
import {BiSolidEditAlt} from 'react-icons/bi'
import {IoTrashSharp} from 'react-icons/io5'

const YourEpisodeSection = ({ data }) => {
	const episodes = data[2].episodes;
  return (
	<div className={`${nunito.className} ${"flex justify-end w-full"}`}>
		<div id="right-section" className="h-full lg:w-[calc(100%_-_18rem)]">
    		<div className="flex justify-center p-3 md:p-4 lg:p-6 w-full h-full">
				<div className="flex flex-col bg-white border-[1px] border-[#eee] rounded-xl w-full h-full overflow-hidden">
					<div className="flex flex-col w-full">
						<div className="bg-[#e6f2ff] text-Blue w-full px-4 py-2">
							<p className="text-lg font-semibold">Your episodes list</p>
						</div>
						<span className="bg-[#ddd] w-full h-[1px]"></span>
					</div>
					<div className="h-full p-2 lg:p-3">
						<div className="grid grid-cols-12">
							<div className="col-span-3 flex text-Gray px-1 lg:px-2">
								<p className="min-w-[30px] max-w-[30px] md:min-w-[35px] md:max-w-[35px] lg:min-w-[45px] lg:max-w-[45px] xl:min-w-[55px] xl:max-w-[55px] text-sm lg:text-md truncate">ID</p>
								<p className="border-s-[1px] border-[#eee] ps-1 lg:ps-2 text-sm lg:text-md">Title</p>
							</div>
							<div className="col-span-6 text-Gray border-s-[1px] border-[#eee] px-1 lg:px-2"><p className="text-sm lg:text-md truncate">Description</p></div>
							<div className="col-span-3 text-Gray border-s-[1px] border-[#eee] px-1 lg:px-2"><p className="text-sm lg:text-md truncate">Actions</p></div>
						</div>
						{
							episodes.map((episode) => (
								<div className={`${vazir.className} ${"grid grid-cols-12 mt-5"}`}>
									<div className="col-span-3 flex text-Gray px-1 lg:px-2">
										<p className="min-w-[30px] max-w-[30px] md:min-w-[35px] md:max-w-[35px] lg:min-w-[45px] lg:max-w-[45px] xl:min-w-[55px] xl:max-w-[55px] text-sm lg:text-md truncate">{episodes.findIndex((index) => index.id === episode.id ) + 1}</p>
										<p className="border-s-[1px] border-[#eee] ps-1 lg:ps-2 text-sm lg:text-md truncate">{episode.title}</p>
									</div>
									<div className="col-span-6 text-Gray border-s-[1px] border-[#eee] text-sm lg:text-md px-1 lg:px-2"><p className="truncate">{episode.description}</p></div>
									<div className="flex col-span-3 text-Gray border-s-[1px] border-[#eee] space-x-1 lg:space-x-2">
										<Link href={`${'/edit/'}${episode.id}`}><button className="flex hover:bg-Blue bg-[#446afe] text-white rounded-md px-2 md:px-1 lg:px-3 xl:px-5 py-1 ms-1 md:ms-2 duration-150 space-x-[2px] text-sm lg:text-md">< BiSolidEditAlt className="text-lg lg:text-xl"/> <p className="hidden md:block">Edit</p></button></Link>
										<button className="flex hover:bg-red-600 bg-red-500 text-white rounded-md px-2 md:px-1 lg:px-2 xl:px-3 py-1 duration-150 space-x-[2px] text-sm lg:text-md">< IoTrashSharp className="text-lg lg:text-xl"/> <p className="hidden md:block">Delete</p></button>
									</div>
								</div>
							))
						}
					</div>
				</div>
    		</div>
		</div>
	</div>
  )
}

export default YourEpisodeSection
