import Link from "next/link"
import { lalezar, nunito, vazir } from "../utils/fonts"
import { TbEdit } from "react-icons/tb";
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
	const datas = await fetchPodcasts()
	const episodes = datas[1].episodes;
	return (
	<div className="container mx-auto lg:mt-[100px] mt-[70px] mb-6">
		<div className={`${nunito.className} ${""}`}>
			<section className="grid lg:grid-cols-12 grid-cols-1 gap-8 h-full w-full rtl">
				<div className="lg:col-span-4 col-span-1 lg:sticky lg:top-36 lg:right-0 w-full h-fit ltr">
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
					{
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
		</div>
	</div>
  )
}

export default YourEpisodeSection
