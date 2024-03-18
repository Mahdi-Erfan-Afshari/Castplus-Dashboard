'use client'
import { HiOutlineTrash } from "react-icons/hi2";
import { nunito } from "../utils/fonts"
import { CgAdd } from "react-icons/cg";
import Link from "next/link";
import { server } from "@/app/lib/server"
import { useRouter } from "next/navigation";

const EditSection = ({ id, data }) => {
	const router = useRouter()
	const episodes = data[0].episodes;
	const episode = episodes.filter((episode) => episode.id === id )[0];
	const sections = episode.sections;
	const removeSection = (e) => {
		e.target.parentElement.parentElement.parentElement.remove();
	}
	const addSection = async () => {
		let sectionDetails = document.getElementById('section-details')
		let parentDiv = document.createElement('div');
		parentDiv.className = 'section ms-6 mt-6 bg-[#f7f7f794] py-4 ps-6 pe-4 rounded-xl';

		let firstection = document.createElement('div');
		firstection.className = 'flex justify-between'

		parentDiv.appendChild(firstection)

		let titleTime = document.createElement('div');
		let title = document.createElement('div');
		let timeStart = document.createElement('div');
		timeStart.className = 'mt-6'

		let titleHeading = document.createElement('h1');
		titleHeading.innerText = 'Title'
		titleHeading.className = 'text-lg font-bold nunito mb-1'
		let titleInput = document.createElement('input');
		titleInput.className = 'section-title outline-none bg-[#f7f7f794] border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-6/12 vazir';
		titleInput.setAttribute('type' , 'text');
		title.appendChild(titleHeading)
		title.appendChild(titleInput)

		let timeStartHeading = document.createElement('h1');
		timeStartHeading.innerText = 'Time Start'
		timeStartHeading.className = 'text-lg mb-1 font-bold nunito'

		let TimeStartInputs = document.createElement('div');
		TimeStartInputs.className = 'flex gap-3'

		let TimeStartInput1 = document.createElement('input');
		TimeStartInput1.className = 'section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-2/12 vazir'
		TimeStartInput1.setAttribute('type' , 'number');
		TimeStartInput1.setAttribute('placeholder' , 'hour');

		let TimeStartInput2 = document.createElement('input');
		TimeStartInput2.className = 'section-minute number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-2/12 vazir'
		TimeStartInput2.setAttribute('type' , 'number');
		TimeStartInput2.setAttribute('placeholder' , 'minute');
		
		let TimeStartInput3 = document.createElement('input');
		TimeStartInput3.className = 'section-second number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-2/12 vazir'
		TimeStartInput3.setAttribute('type' , 'number');
		TimeStartInput3.setAttribute('placeholder' , 'second');
		TimeStartInputs.appendChild(TimeStartInput1)
		TimeStartInputs.appendChild(TimeStartInput2)
		TimeStartInputs.appendChild(TimeStartInput3)
		
		timeStart.appendChild(timeStartHeading)
		timeStart.appendChild(TimeStartInputs)
		
		titleTime.appendChild(title)
		titleTime.appendChild(timeStart)
		
		let deleteButton = document.createElement('button');
		deleteButton.className = 'h-fit'
		let trashIcon = '<svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" class="hover:bg-[#ff1c1c1c] hover:text-Red p-3 box-content rounded-xl text-2xl duration-100" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>'
		deleteButton.addEventListener('click', (event) => removeSection(event))
		
		deleteButton.innerHTML = trashIcon
		firstection.appendChild(titleTime)
		firstection.appendChild(deleteButton)

		let summarySection = document.createElement('div');
		summarySection.className = 'flex flex-col w-full mt-5'
		let summaryHeading = document.createElement('h1');
		summaryHeading.innerText = 'Summary'
		summaryHeading.className = 'text-xl font-bold nunito'
		let summaryTextareaParent = document.createElement('div');
		summaryTextareaParent.className = 'w-full'
		let summaryTextarea = document.createElement('textarea');
		summaryTextarea.className = 'section-summary min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3'
		summaryTextarea.setAttribute('rows' , '2');
		summaryTextareaParent.appendChild(summaryTextarea)
		summarySection.appendChild(summaryHeading)
		summarySection.appendChild(summaryTextareaParent)

		let transcriptSection = document.createElement('div');
		transcriptSection.className = 'flex flex-col w-full mt-5'
		let transcriptHeading = document.createElement('h1');
		transcriptHeading.innerText = 'Transcript'
		transcriptHeading.className = 'text-xl font-bold nunito'
		let transcriptTextareaParent = document.createElement('div');
		transcriptTextareaParent.className = 'w-full'
		let transcriptTextarea = document.createElement('textarea');
		transcriptTextarea.className = 'section-transcript min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3'
		transcriptTextarea.setAttribute('rows' , '2');
		transcriptTextareaParent.appendChild(transcriptTextarea)
		transcriptSection.appendChild(transcriptHeading)
		transcriptSection.appendChild(transcriptTextareaParent)


		let refrencesSection = document.createElement('div');
		refrencesSection.className = 'flex flex-col w-full mt-5'
		let refrencesHeading = document.createElement('h1');
		refrencesHeading.innerText = 'Refrences'
		refrencesHeading.className = 'text-xl font-bold nunito'
		let refrencesTextareaParent = document.createElement('div');
		refrencesTextareaParent.className = 'w-full'
		let refrencesTextarea = document.createElement('textarea');
		refrencesTextarea.className = 'section-refrences min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3'
		refrencesTextarea.setAttribute('rows' , '2');
		refrencesTextareaParent.appendChild(refrencesTextarea)
		refrencesSection.appendChild(refrencesHeading)
		refrencesSection.appendChild(refrencesTextareaParent)
		
		parentDiv.appendChild(summarySection)
		parentDiv.appendChild(transcriptSection)
		parentDiv.appendChild(refrencesSection)

		sectionDetails.appendChild(parentDiv)
	}

	const saveSections = async () => {
		const sections = document.querySelectorAll('.section');
		let title = document.querySelector('.episode-title')
		let description = document.querySelector('.episode-description')
		const sectionsList = {
			"id": episode.id,
			"title": title.value,
			"published_date": episode.published_date,
			"published_time": episode.published_time,
			"thumbnail": episode.thumbnail,
			"description": description.value,
			"url": episode.url,
			"type": episode.type,
			"duration": episode.duration,
			"count" : sections.length,
			"sections" : []
		};
		var i = 0;
		let sectionHour = document.querySelectorAll('.section-hour');
		let sectionMinute = document.querySelectorAll('.section-minute');
		let sectionSecond = document.querySelectorAll('.section-second');
		let sectionTitle = document.querySelectorAll('.section-title');
		let sectionSummary = document.querySelectorAll('.section-summary');
		let sectionTranscript = document.querySelectorAll('.section-transcript');
		let sectionRefrences = document.querySelectorAll('.section-refrences');
		[...sections].map(() => {
			let sectionTimeStart = Number((sectionHour[i].value * 3600)) + Number((sectionMinute[i].value * 60)) + Number((sectionSecond[i].value));
			sectionsList["sections"].push({
				"number" : i,
				"timeStart" : sectionTimeStart,
				"title" : sectionTitle[i].value,
				"summary" : sectionSummary[i].value,
				"transcript" : sectionTranscript[i].value,
				"refrences" : sectionRefrences[i].value
			},)
			i++
		})
		await fetch(`${server}/api/podcasts`,{
        	method:'POST',
        	cache:'no-cache',
        	body:JSON.stringify({
				'id': data[0].id,
				sectionsList
			})
    	})

		router.push('/')
	}

	return (
	<div className={`${nunito.className} ${"flex justify-end w-full"}`}>
		<div id="right-section" className="h-full lg:w-[calc(100%_-_18rem)]">
			<div className="flex flex-col gap-y-4 p-6">
				<div className="flex flex-col w-full bg-white px-6 py-3 rounded-xl">
					<h1 className="text-xl font-bold nunito">Title</h1>
					<div className="mt-4">
						<input className="episode-title outline-none border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-6/12 vazir" type="text" defaultValue={episode.title} />
					</div>
				</div>
				<div className="flex flex-col w-full bg-white px-6 py-3 rounded-xl">
					<h1 className="text-xl font-bold nunito">Description</h1>
					<div className="mt-4">
						<textarea className="episode-description min-h-[80px] w-full resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" defaultValue={episode.description}></textarea>
					</div>
				</div>
				<div className="flex flex-col w-full bg-white px-6 py-6 rounded-xl">
					<div id="section-details" className="flex flex-col w-full bg-white px-6 py-6 rounded-xl">
						<h1 className="text-xl font-bold nunito">Sections</h1>
						{
							sections.map((section) => (
								<div className="section ms-6 mt-6 bg-[#f7f7f794] py-4 ps-6 pe-4 rounded-xl">
									<div className="flex justify-between">
										<div>
											<div>
												<h1 className="text-lg font-bold nunito mb-1">Title</h1>
												<input className="section-title outline-none bg-[#f7f7f794] border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-6/12 vazir" type="text" defaultValue={section.title} />
											</div>
											<div className="mt-6">
												<h1 className="text-lg mb-1 font-bold nunito">Time Start</h1>
												<div className="flex gap-3">
													<input className="section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-2/12 vazir" type="number" placeholder="hour" defaultValue={Math.floor(Math.floor(section.timeStart / 3600)) } />
													<input className="section-minute number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-2/12 vazir" type="number" placeholder="minute" defaultValue={Math.floor(section.timeStart % 3600 / 60)} />
													<input className="section-second section-hournumber-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-2/12 vazir" type="number" placeholder="second" defaultValue={Math.floor(section.timeStart % 60)} />
												</div>
											</div>
										</div>
										<button className="h-fit" onClick={(e) => removeSection(e)} ><HiOutlineTrash className="hover:bg-[#ff1c1c1c] hover:text-Red p-3 box-content rounded-xl text-2xl duration-100" /></button>
									</div>
									<div className="flex flex-col w-full mt-5">
										<h1 className="text-xl font-bold nunito">Summary</h1>
										<div className="w-full">
											<textarea className="section-summary min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" defaultValue={section.summary}></textarea>
										</div>
									</div>
									<div className="flex flex-col w-full mt-5">
										<h1 className="text-xl font-bold nunito">Transcript</h1>
										<div className="w-full">
											<textarea className="section-transcript min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" defaultValue={section.transcript}></textarea>
										</div>
									</div>
									<div className="flex flex-col w-full mt-5">
										<h1 className="text-xl font-bold nunito">Refrences</h1>
										<div className="w-full">
											<textarea className="section-refrences min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" defaultValue={section.refrences}></textarea>
										</div>
									</div>
								</div>
							))
						}
					</div>
					<div className="flex items-center gap-1 bg-Blue text-white px-4 py-2 rounded-lg w-fit ms-6 mt-5 cursor-pointer" onClick={addSection}> <CgAdd className="text-xl" /> <button>Add</button></div>
				</div>
				<div className="flex w-full justify-end px-6 py-3 gap-3">
					<Link href='/'><button className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button></Link>
					<button className="bg-Blue text-white px-4 py-2 rounded-lg" onClick={saveSections}>Save</button>
				</div>
			</div>
		</div>
	</div>
  )
}

export default EditSection
