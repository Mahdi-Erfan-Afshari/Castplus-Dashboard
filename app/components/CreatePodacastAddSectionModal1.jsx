'use client'
import { vazir } from "../utils/fonts"
import { server } from "@/app/lib/server"
import { v4 as uuidv4 } from 'uuid';
import { IoCloseOutline, IoAddOutline  } from "react-icons/io5";
import { PiWarningCircle } from "react-icons/pi";

const CreatePodacastAddSectionModal = ({ documentClickCloseModal, addOffer, enterHandler, backspace, sections, data, episode, setLoading, router }) => {

	const addSectionData = async () => {
		const modal = document.querySelector('#create-episode-add-modal');
		let sectionId = uuidv4();
		let sectionTitle = modal.querySelector('.section-title').value;
		let sectionHour = modal.querySelector('.section-hour').value;
		let sectionMinute = modal.querySelector('.section-minute').value;
		let sectionSecond = modal.querySelector('.section-second').value;
		let sectionDuration = modal.querySelector('.section-duration').value;
		let sectionSummary = modal.querySelector('.section-summary').value;
		let sectionTranscript = modal.querySelector('.section-transcript').value;
		let sectionRefrences = modal.querySelector('.section-refrences').value;
		let sectionTimeStart = Number(sectionHour * 3600) + Number(sectionMinute * 60) + Number(sectionSecond);
		const tagsInDom = modal.querySelectorAll('.tag')

		const tags = []
		
		tagsInDom.forEach((tag) => {
			tags.push({
				id: tag.getAttribute('tagid'),
				name: tag.firstElementChild.innerText
			});
		});
		
		const sectionInfo = {
			"id" : sectionId,
			"number" : episode.sections.length,
			"timeStart" : sectionTimeStart,
			"duration" : sectionDuration,
			"title" : sectionTitle,
			"summary" : sectionSummary,
			"transcript" : sectionTranscript,
			"refrences" : sectionRefrences,
			"tags": tags
		}

		if (sectionTitle.length !== 0 && sectionHour.length !== 0 && sectionMinute.length !== 0 && sectionSecond.length !== 0 && sectionDuration.length !== 0) {
			modal.querySelector('#add-section-complete-error').classList.add('hidden');
			if (Number(sectionHour) >= 0 && Number(sectionMinute) >= 0 && Number(sectionSecond) >= 0 && Number(sectionDuration) >= 0) {
				modal.querySelector('.section-hour').classList.remove('border-red-500');
				modal.querySelector('.section-hour').classList.remove('text-red-500');
				modal.querySelector('.section-hour').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-hour').classList.add('border-gray-150');
				modal.querySelector('.section-minute').classList.remove('border-red-500');
				modal.querySelector('.section-minute').classList.remove('text-red-500');
				modal.querySelector('.section-minute').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-minute').classList.add('border-gray-150');
				modal.querySelector('.section-second').classList.remove('border-red-500');
				modal.querySelector('.section-second').classList.remove('text-red-500');
				modal.querySelector('.section-second').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-second').classList.add('border-gray-150');
				modal.querySelector('.section-duration').classList.remove('border-red-500');
				modal.querySelector('.section-duration').classList.remove('text-red-500');
				modal.querySelector('.section-duration').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-duration').classList.add('border-gray-150');
				modal.querySelector('.section-title').classList.remove('border-red-500');
				modal.querySelector('.section-title').classList.remove('text-red-500');
				modal.querySelector('.section-title').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-title').classList.add('border-gray-150');

				episode.sections.push(sectionInfo)
				episode.count = episode.sections.length
				console.log(episode);
				console.log(episode.sections.length);
				closeAddModal()
			} else {
				modal.querySelector('#add-section-negative-error').classList.remove('hidden');
				modal.querySelector('#add-section-negative-error').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
				if (Number(sectionHour) < 0) {
					modal.querySelector('.section-hour').classList.add('border-red-500');
					modal.querySelector('.section-hour').classList.add('text-red-500');
					modal.querySelector('.section-hour').classList.add('placeholder:text-red-500');
					modal.querySelector('.section-hour').classList.remove('border-gray-150');
				} else {
					modal.querySelector('.section-hour').classList.remove('border-red-500');
					modal.querySelector('.section-hour').classList.remove('text-red-500');
					modal.querySelector('.section-hour').classList.remove('placeholder:text-red-500');
					modal.querySelector('.section-hour').classList.add('border-gray-150');
				}
	
				if (Number(sectionMinute) < 0) {
					modal.querySelector('.section-minute').classList.add('border-red-500');
					modal.querySelector('.section-minute').classList.add('text-red-500');
					modal.querySelector('.section-minute').classList.add('placeholder:text-red-500');
					modal.querySelector('.section-minute').classList.remove('border-gray-150');
				} else {
					modal.querySelector('.section-minute').classList.remove('border-red-500');
					modal.querySelector('.section-minute').classList.remove('text-red-500');
					modal.querySelector('.section-minute').classList.remove('placeholder:text-red-500');
					modal.querySelector('.section-minute').classList.add('border-gray-150');
				}
				
				if (Number(sectionSecond) < 0) {
					modal.querySelector('.section-second').classList.add('border-red-500');
					modal.querySelector('.section-second').classList.add('text-red-500');
					modal.querySelector('.section-second').classList.add('placeholder:text-red-500');
					modal.querySelector('.section-second').classList.remove('border-gray-150');
				} else {
					modal.querySelector('.section-second').classList.remove('border-red-500');
					modal.querySelector('.section-second').classList.remove('text-red-500');
					modal.querySelector('.section-second').classList.remove('placeholder:text-red-500');
					modal.querySelector('.section-second').classList.add('border-gray-150');
				}

				if (Number(sectionDuration) < 0) {
					modal.querySelector('.section-duration').classList.add('border-red-500');
					modal.querySelector('.section-duration').classList.add('text-red-500');
					modal.querySelector('.section-duration').classList.add('placeholder:text-red-500');
					modal.querySelector('.section-duration').classList.remove('border-gray-150');
				} else {
					modal.querySelector('.section-duration').classList.remove('border-red-500');
					modal.querySelector('.section-duration').classList.remove('text-red-500');
					modal.querySelector('.section-duration').classList.remove('placeholder:text-red-500');
					modal.querySelector('.section-duration').classList.add('border-gray-150');
				}
			}
		} else {
			modal.querySelector('#add-section-negative-error').classList.add('hidden');
			modal.querySelector('#add-section-complete-error').classList.remove('hidden');
			modal.querySelector('#add-section-complete-error').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
			if (sectionTitle.length === 0) {
				modal.querySelector('.section-title').classList.add('border-red-500');
				modal.querySelector('.section-title').classList.add('text-red-500');
				modal.querySelector('.section-title').classList.add('placeholder:text-red-500');
				modal.querySelector('.section-title').classList.remove('border-gray-150');
			} else {
				modal.querySelector('.section-title').classList.remove('border-red-500');
				modal.querySelector('.section-title').classList.remove('text-red-500');
				modal.querySelector('.section-title').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-title').classList.add('border-gray-150');
			}

			if (sectionHour.length === 0) {
				modal.querySelector('.section-hour').classList.add('border-red-500');
				modal.querySelector('.section-hour').classList.add('text-red-500');
				modal.querySelector('.section-hour').classList.add('placeholder:text-red-500');
				modal.querySelector('.section-hour').classList.remove('border-gray-150');
			} else {
				modal.querySelector('.section-hour').classList.remove('border-red-500');
				modal.querySelector('.section-hour').classList.remove('text-red-500');
				modal.querySelector('.section-hour').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-hour').classList.add('border-gray-150');
			}

			if (sectionMinute.length === 0) {
				modal.querySelector('.section-minute').classList.add('border-red-500');
				modal.querySelector('.section-minute').classList.add('text-red-500');
				modal.querySelector('.section-minute').classList.add('placeholder:text-red-500');
				modal.querySelector('.section-minute').classList.remove('border-gray-150');
			} else {
				modal.querySelector('.section-minute').classList.remove('border-red-500');
				modal.querySelector('.section-minute').classList.remove('text-red-500');
				modal.querySelector('.section-minute').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-minute').classList.add('border-gray-150');
			}
			
			if (sectionSecond.length === 0) {
				modal.querySelector('.section-second').classList.add('border-red-500');
				modal.querySelector('.section-second').classList.add('text-red-500');
				modal.querySelector('.section-second').classList.add('placeholder:text-red-500');
				modal.querySelector('.section-second').classList.remove('border-gray-150');
			} else {
				modal.querySelector('.section-second').classList.remove('border-red-500');
				modal.querySelector('.section-second').classList.remove('text-red-500');
				modal.querySelector('.section-second').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-second').classList.add('border-gray-150');
			}

			if (sectionDuration.length === 0) {
				modal.querySelector('.section-duration').classList.add('border-red-500');
				modal.querySelector('.section-duration').classList.add('text-red-500');
				modal.querySelector('.section-duration').classList.add('placeholder:text-red-500');
				modal.querySelector('.section-duration').classList.remove('border-gray-150');
			} else {
				modal.querySelector('.section-duration').classList.remove('border-red-500');
				modal.querySelector('.section-duration').classList.remove('text-red-500');
				modal.querySelector('.section-duration').classList.remove('placeholder:text-red-500');
				modal.querySelector('.section-duration').classList.add('border-gray-150');
			}
		}
	}
	
	const addModalClickCloseDropDown = (e) => {
		const dropdown = document.querySelector('#create-episode-add-modal-dropdown');
		const tagInput = document.querySelector('#create-episode-add-modal-tag-input');
		
		let thisContains = e.target.contains(tagInput)
		if (thisContains && e.target !== dropdown) {
			dropdown.classList.remove('hidden');
		}

		if (!thisContains && e.target !== dropdown) {
			dropdown.classList.add('hidden');
		}
	}

	const closeAddModal = () => {
		const modal = document.querySelector('#create-episode-add-modal');
		modal.classList.add('hidden');
		let inputsValue = document.querySelectorAll('.value');
		inputsValue.forEach(inputValue => {
			inputValue.value = ""
		});
	}
	

	return (
	<>
		<div id="create-episode-add-modal" className="hidden modal fixed top-0 left-0 flex justify-center items-center w-full h-full bg-transparent-black-50 ms-0 z-30" onClick={documentClickCloseModal}>
			<div className="flex flex-col justify-center items-end section-modal bg-white px-5 py-3 m-5 max-w-8xl mt-[72px] max-h-[80vh] rounded-2xl" onClick={addModalClickCloseDropDown}>
				<button className="h-fit" type="button" onClick={closeAddModal}><IoCloseOutline className="hover:bg-hover-gray hover:text-gray-700 text-gray-400 p-1 box-content rounded-lg lg:text-2xl text-xl duration-100" /></button>
				<div className="max-h-[60vh] overflow-y-scroll no-scrollbar">
					<div className="flex justify-between items-center">
						<h1 className="text-lg font-bold nunito">Title</h1>
					</div>
					<input className="value section-title outline-none bg-[#f7f7f794] border-2 border-gray-150 rounded-lg text-sm py-2 px-4 lg:w-6/12 w-full vazir" type="text" placeholder="Section Title" />
					<div className="mt-6">
						<h1 className="text-lg mb-1 font-bold nunito">Time Start</h1>
						<div className="flex flex-col gap-4">
							<div className="flex items-end">
								<div className="flex flex-col justify-center lg:w-2/12 w-4/12 ">
									<p className="text-xs ms-1">Hours</p>
									<input className="value section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="hour" />
								</div> <span className="text-xl mx-2 pb-2">:</span>
								<div className="flex flex-col lg:w-2/12 w-4/12 ">
									<p className="text-xs ms-1">Minutes</p>
									<input className="value section-minute number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="minute" />
								</div> <span className="text-xl mx-2 pb-2">:</span>
								<div className="flex flex-col lg:w-2/12 w-4/12 ">
									<p className="text-xs ms-1">Seconds</p>
									<input className="value section-second number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="second" />
								</div>
							</div>
							<div className="flex flex-col">
								<p className="text-xs ms-1">Duration</p>
								<input className="value section-duration number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 lg:w-2/12 w-4/12 vazir" type="number" placeholder="duration" />
							</div>
							<div id="add-section-complete-error" className="hidden flex items-center space-x-1 text-red-500">
								<PiWarningCircle />
								<p className="text-red-500">Please fill in the required fields.</p>
							</div>
							<div id="add-section-negative-error" className="hidden flex items-center space-x-1 text-red-500">
								<PiWarningCircle />
								<p className="text-red-500">Entered numbers must not be negative.</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col w-full mt-5">
						<h1 className="text-xl font-bold nunito">Summary</h1>
						<div className="w-full">
							<textarea className="value section-summary min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
						</div>
					</div>
					<div className="flex flex-col w-full mt-5">
						<h1 className="text-xl font-bold nunito">Transcript</h1>
						<div className="w-full">
							<textarea className="value section-transcript min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
						</div>
					</div>
					<div className="flex flex-col w-full mt-5">
						<h1 className="text-xl font-bold nunito">Refrences</h1>
						<div className="w-full">
							<textarea className="value section-refrences min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
						</div>
					</div>

					<div>
						<div className={`${vazir.className} ${"mt-5"}`}>
							<h1 className="text-xl font-bold nunito">Tags</h1>
							<div className="relative w-[320px] sm:w-[388px] md:w-[633px] space-x-2">
								<div className="tag-container relative flex flex-wrap w-full bg-[#f7f7f794] p-3 border-2 border-gray-150 rounded-lg">

									<input onKeyDown={(addTag) => enterHandler(addTag)} onKeyUp={(deleteTagBackspace) => backspace(deleteTagBackspace)}  id="create-episode-add-modal-tag-input" placeholder="Enter Tags..." type="text"  className="outline-none text-sm items-center pt-1 w-0 grow ms-2 bg-[#f7f7f794] min-w-[80px] h-full mt-[5px]" />
								</div>
							</div>
							<div id="create-episode-add-modal-dropdown" className="hidden w-full bg-[#ddd] rounded-lg mb-5 gap-y-2 overflow-auto border-[1px] border-gray-150 max-h-44 no-scrollbar cursor-pointer">
								<div>
									<div className="hover:bg-slate-50 w-full mt-[1px] px-7 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150" onClick={addOffer}>#tags</div>
									<div className="hover:bg-slate-50 w-full mt-[1px] px-7 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150" onClick={addOffer}>#radio_rah</div>
									<div className="hover:bg-slate-50 w-full mt-[1px] px-7 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150" onClick={addOffer}>#رادیو_راه</div>
									<div className="hover:bg-slate-50 w-full mt-[1px] px-7 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150" onClick={addOffer}>#پادکست_پرسه </div>
									<div className="hover:bg-slate-50 w-full mt-[1px] px-7 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150" onClick={addOffer}>#castplus</div>
									<div className="hover:bg-slate-50 w-full mt-[1px] px-7 py-2 text-sm sm:text-md bg-white text-gray-500 duration-150" onClick={addOffer}>#podcast</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="flex w-full justify-end pt-3 gap-3">
					<button className="hover:text-gray-700 bg-gray-100 text-gray-500 border-[1px] border-gray-300 px-5 py-1 rounded-lg duration-100" type="button" onClick={closeAddModal}>Cancel</button>
					<button className="bg-Blue text-white px-6 py-1 rounded-lg" type="button" onClick={addSectionData}>Save</button>
				</div>
			</div>
		</div>
	</>
  )
}

export default CreatePodacastAddSectionModal
