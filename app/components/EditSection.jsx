'use client'
import { nunito, vazir } from "../utils/fonts"
import Link from "next/link";
import { server } from "@/app/lib/server"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Loading from '@/app/components/Loading'
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseOutline, IoAddOutline  } from "react-icons/io5";
import { PiWarningCircle } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";
import { GrStatusGood } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";

const EditSection = ({ id, data }) => {
	const { data:session } = useSession();
	const [loading, setLoading] = useState(false)
	const [ulMoreSectionIndex, setUlMoreSectionIndex] = useState(null)
	const [isulMoreSectionIndex, setIsUlMoreSectionIndex] = useState(false)
	const router = useRouter();
	const episodes = data[1].episodes;
	const episode = episodes.filter((episode) => episode.id === id )[0];
	const sections = episode.sections;

	const addSectionModal = () => {
		const modal = document.querySelector('#add-modal');
		modal.classList.remove('hidden');
	}
	
	const setNumberSections = async () => {
		const res = await fetch(`${server}/api/podcasts`, {
			cache: "no-store",
		})
		const data = await res.json();
		const episodesData = data[1].episodes;
		const episodeData = episodesData.filter((episode) => episode.id === id )[0];
		const sectionsData = episodeData.sections;

		for (var index = 0; index < sectionsData.length; index++) {
			sectionsData[index].number = index;
		}

		const sectionsList = sectionsData;

		setLoading(true);
		await fetch(`${server}/api/podcasts/episode/sections`,{
        	method:'PUT',
			headers: {
				"Content-type": "application/json"
			},
        	cache:'no-cache',
        	body:JSON.stringify({
				'id': data[1].id,
				'episodeId': episode.id,
				sectionsList
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

	const addSectionData = async () => {
		const modal = document.querySelector('#add-modal');
		let sectionId = Math.floor(Math.random() * (10 ** 15)).toString();
		let sectionTitle = modal.querySelector('#section-title').value;
		let sectionHour = modal.querySelector('#section-hour').value;
		let sectionMinute = modal.querySelector('#section-minute').value;
		let sectionSecond = modal.querySelector('#section-second').value;
		let sectionDuration = modal.querySelector('#section-duration').value;
		let sectionSummary = modal.querySelector('#section-summary').value;
		let sectionTranscript = modal.querySelector('#section-transcript').value;
		let sectionRefrences = modal.querySelector('#section-refrences').value;
		let sectionTimeStart = Number(sectionHour * 3600) + Number(sectionMinute * 60) + Number(sectionSecond);

		const sectionsList = {
			"id" : sectionId,
			"number" : sections.length,
			"timeStart" : sectionTimeStart,
			"duration" : sectionDuration,
			"title" : sectionTitle,
			"summary" : sectionSummary,
			"transcript" : sectionTranscript,
			"refrences" : sectionRefrences
		}

		setLoading(true)
		await fetch(`${server}/api/podcasts/${data[1].id}`,{
        	method:'POST',
			headers: {
				"Content-type": "application/json"
			},
        	cache:'no-cache',
        	body:JSON.stringify({
				'episodeId': episode.id,
				sectionsList
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

	const openDeleteModal = (e) => {
		const modal = document.querySelector('#delete-modal');
		modal.classList.remove('hidden');
		const sectionNumber = Number(e.target.parentElement.getAttribute('number'));
		const sectionNameSpan = modal.getElementsByTagName('span')[0];
		sectionNameSpan.innerText = sections[sectionNumber].title;
		modal.setAttribute('number', sectionNumber)
		closeAllUlMoreSectionMenu();
	}

	const setDataOfSection = (index) => {
		const modal = document.querySelector('#modal');
		let sectionTitle = modal.querySelector('#section-title');
		let sectionHour = modal.querySelector('#section-hour');
		let sectionMinute = modal.querySelector('#section-minute');
		let sectionSecond = modal.querySelector('#section-second');
		let sectionDuration = modal.querySelector('#section-duration');
		let sectionSummary = modal.querySelector('#section-summary');
		let sectionTranscript = modal.querySelector('#section-transcript');
		let sectionRefrences = modal.querySelector('#section-refrences');
		const sectionIndex = sections.findIndex((section) => {
			return section.number == index;
		})
		modal.setAttribute("section-id", sections[sectionIndex].id);
		sectionTitle.value = sections[sectionIndex].title;
		sectionHour.value = Math.floor(sections[sectionIndex].timeStart / 3600);
		sectionMinute.value = Math.floor(sections[sectionIndex].timeStart % 3600 / 60);
		sectionSecond.value = Math.floor(sections[sectionIndex].timeStart % 60);
		sectionDuration.value = sections[sectionIndex].duration;
		sectionSummary.value = sections[sectionIndex].summary;
		sectionTranscript.value = sections[sectionIndex].transcript;
		sectionRefrences.value = sections[sectionIndex].refrences;
	}

	const deleteSection = async (e) => {
		const modal = document.querySelector('#delete-modal');
		const sectionIndex = modal.getAttribute('number');
		const sectionsList = {
			"id": episode.sections[sectionIndex].id,
			"number": sectionIndex,
			"timeStart": episode.sections[sectionIndex].timeStart,
			"title": episode.sections[sectionIndex].title,
			"summary": episode.sections[sectionIndex].summary,
			"transcript": episode.sections[sectionIndex].transcript,
			"refrences": episode.sections[sectionIndex].refrences,
		}

		setLoading(true)
		await fetch(`${server}/api/podcasts/${data[1].id}`,{
        	method:'DELETE',
			headers: {
				"Content-type": "application/json"
			},
        	cache:'no-cache',
        	body:JSON.stringify({
				'episodeId': episode.id,
				sectionsList
			})
    	})
		.then((response) => response.json())
			.then((data) => {
				// setLoading(false)
			})
			.catch((error) => {
				console.error(error);
			});

		router.refresh();

		await setNumberSections();
		
		setTimeout(() => {
			toggleSectionDeletedModal(episode.sections[sectionIndex].title)
		}, 1000);
	}

	const editSection = async () => {
		const modal = document.querySelector('#modal');
		let sectionId = modal.getAttribute("section-id");
		let sectionTitle = modal.querySelector('#section-title').value;
		let sectionHour = modal.querySelector('#section-hour').value;
		let sectionMinute = modal.querySelector('#section-minute').value;
		let sectionSecond = modal.querySelector('#section-second').value;
		let sectionDuration = modal.querySelector('#section-duration').value;
		let sectionSummary = modal.querySelector('#section-summary').value;
		let sectionTranscript = modal.querySelector('#section-transcript').value;
		let sectionRefrences = modal.querySelector('#section-refrences').value;
		let sectionTimeStart = Number(sectionHour * 3600) + Number(sectionMinute * 60) + Number(sectionSecond);

		let sectionIndex = sections.findIndex(section => {
			return section.id === sectionId;
		});

		const sectionsList = {
			"id" : sectionId,
			"number" : sectionIndex,
			"timeStart" : sectionTimeStart,
			"duration" : sectionDuration,
			"title" : sectionTitle,
			"summary" : sectionSummary,
			"transcript" : sectionTranscript,
			"refrences" : sectionRefrences
		}

		setLoading(true)
		await fetch(`${server}/api/podcasts/${data[1].id}`,{
        	method:'PUT',
			headers: {
				"Content-type": "application/json"
			},
        	cache:'no-cache',
        	body:JSON.stringify({
				'episodeId': episode.id,
				sectionsList
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
		modal.removeAttribute('section-id');

		setTimeout(() => {
			toggleSectionEditedModal();
		}, 1000);
	}

	const saveSections = async () => {
		const sections = document.querySelectorAll('.section');
		let title = document.querySelector('.episode-title')
		let description = document.querySelector('.episode-description')
		const episodeData = {
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
			"sections" : episode.sections
		};
		setLoading(true)
		await fetch(`${server}/api/podcasts`,{
        	method:'PUT',
        	cache:'no-cache',
        	body:JSON.stringify({
				'id': data[1].id,
				episodeData
			})
    	})
		.then((response) => response.json())
			.then((data) => {
				setLoading(false)
				getSearchResults(data);
			})
			.catch((error) => {
				console.error(error);
		});
		router.refresh()
		router.push('/');
	}

	const editEpisodeTitle = async () => {
		const newTitle = document.querySelector('#edit-title-input').value;

		setLoading(true)
		await fetch(`${server}/api/podcasts/episode/title`,{
        	method:'PUT',
        	cache:'no-cache',
        	body:JSON.stringify({
				'id': data[1].id,
				'episodeId': episode.id,
				newTitle
			})
    	})
		.then((response) => response.json())
			.then((data) => {
				setLoading(false)
				getSearchResults(data);
			})
			.catch((error) => {
				console.error(error);
		});
		router.refresh()
	}

	const editEpisodeDescription = async () => {
		const newDescription = document.querySelector('#edit-description-input').value;

		setLoading(true)
		await fetch(`${server}/api/podcasts/episode/description`,{
        	method:'PUT',
        	cache:'no-cache',
        	body:JSON.stringify({
				'id': data[1].id,
				'episodeId': episode.id,
				newDescription
			})
    	})
		.then((response) => response.json())
			.then((data) => {
				setLoading(false)
				getSearchResults(data);
			})
			.catch((error) => {
				console.error(error);
		});
		router.refresh()
	}

	const closeAllUlMoreSectionMenu = (isThereMenu) => {
		const ulMoreSections = document.querySelectorAll('.section-more');
		if(!isThereMenu) {
			ulMoreSections.forEach(ulMoreSection => {
				ulMoreSection.classList.add('hidden');
			});
		}
	}
	
	const documentClick = (e) => {
		if (e.target.tagName == 'circle') {
			closeAllUlMoreSectionMenu(true);
		} else if (e.target.tagName == 'svg'){
			closeAllUlMoreSectionMenu(true);
		} else if (e.target.tagName == 'LI') {
			closeAllUlMoreSectionMenu(true);
		} else {
			if (e.target.matches('.section-more') || e.target.matches('.section-more-button')) {
				closeAllUlMoreSectionMenu(true);
			} else {
				closeAllUlMoreSectionMenu(false);
			}
		}
	}

	const sectionShowMore = (e) => {
		const ulMoreSections = document.querySelectorAll('.section-more');
		if (e.target.tagName == 'circle') {
			let parentDiv = e.target.parentElement.parentElement.parentElement;
			let ulMoreSection = parentDiv.getElementsByTagName('ul')[0];
			let index = [...ulMoreSections].findIndex((ulSection) => {
				return ulSection.getAttribute('number') === ulMoreSection.getAttribute('number');
			})

			for (var i = 0; i < ulMoreSections.length; i++) {
				if( i != index) {
					ulMoreSections[i].classList.add('hidden');
				}
			}

			ulMoreSection.classList.toggle('hidden');

			if (!isulMoreSectionIndex) {
				if (!ulMoreSectionIndex === index) {
					ulMoreSections[ulMoreSectionIndex].classList.add('hidden');
				}
				setUlMoreSectionIndex(index)
				setIsUlMoreSectionIndex(true)
			} 

			if(isulMoreSectionIndex) {
				if (!ulMoreSectionIndex === index) {
					ulMoreSections[ulMoreSectionIndex].classList.add('hidden');
					setIsUlMoreSectionIndex(false)
				}
			}
		} else if (e.target.tagName == 'svg'){
			let parentDiv = e.target.parentElement.parentElement;
			let ulMoreSection = parentDiv.getElementsByTagName('ul')[0];
			let index = [...ulMoreSections].findIndex((ulSection) => {
				return ulSection.getAttribute('number') === ulMoreSection.getAttribute('number');
			})

			for (var i = 0; i < ulMoreSections.length; i++) {
				if( i != index) {
					ulMoreSections[i].classList.add('hidden');
				}
			}

			ulMoreSection.classList.toggle('hidden');

			if (!isulMoreSectionIndex) {
				if (!ulMoreSectionIndex === index) {
					ulMoreSections[ulMoreSectionIndex].classList.add('hidden');
				}
				setUlMoreSectionIndex(index)
				setIsUlMoreSectionIndex(true)
			} 

			if(isulMoreSectionIndex) {
				if (!ulMoreSectionIndex === index) {
					ulMoreSections[ulMoreSectionIndex].classList.add('hidden');
					setIsUlMoreSectionIndex(false)
				}
			}
		} else {
			let parentDiv = e.target.parentElement;
			let ulMoreSection = parentDiv.getElementsByTagName('ul')[0];
			let index = [...ulMoreSections].findIndex((ulSection) => {
				return ulSection.getAttribute('number') === ulMoreSection.getAttribute('number');
			})

			for (var i = 0; i < ulMoreSections.length; i++) {
				if( i != index) {
					ulMoreSections[i].classList.add('hidden');
				}
			}

			ulMoreSection.classList.toggle('hidden');

			if (!isulMoreSectionIndex) {
				if (!ulMoreSectionIndex === index) {
					ulMoreSections[ulMoreSectionIndex].classList.add('hidden');
				}
				setUlMoreSectionIndex(index)
				setIsUlMoreSectionIndex(true)
			} 

			if(isulMoreSectionIndex) {
				if (!ulMoreSectionIndex === index) {
					ulMoreSections[ulMoreSectionIndex].classList.add('hidden');
					setIsUlMoreSectionIndex(false)
				}
			}
		}
	}

	const openModal = (e) => {
		const modal = document.querySelector('#modal');
		modal.classList.remove('hidden');
		const sectionNumber = e.target.parentElement.getAttribute('number')
		setDataOfSection(sectionNumber);
		closeAllUlMoreSectionMenu()
	}

	const closeModal = () => {
		const modal = document.querySelector('.modal');
		modal.classList.add('hidden');
	}

	const closeAddModal = () => {
		const modal = document.querySelector('#add-modal');
		modal.classList.add('hidden');
		let inputsValue = document.querySelectorAll('.value');
		inputsValue.forEach(inputValue => {
			inputValue.value = ""
		});
	}

	const closeDeleteModal = () => {
		const modal = document.querySelector('#delete-modal');
		modal.classList.add('hidden');
	}

	const toggleSectionDeletedModal = (title) => {
		const deletedModal = document.querySelector('#section-deleted-modal');
		deletedModal.classList.remove('hidden');
		const modalNameSpan = deletedModal.getElementsByTagName('span')[0];
		modalNameSpan.innerText = title;
		setTimeout(() => {
			deletedModal.classList.add('hidden');
		}, 3000);
	}

	const toggleSectionEditedModal = () => {
		const deletedModal = document.querySelector('#section-edited-modal');
		deletedModal.classList.remove('hidden');
		setTimeout(() => {
			deletedModal.classList.add('hidden');
		}, 3000);
	}
	
	const openTitleModal = (e) => {
		const modal = document.querySelector('#edit-title-modal');
		const titleInput = document.querySelector('#edit-title-input');
		modal.classList.remove('hidden');
		if (e.target.tagName == 'path') {
			titleInput.value = e.target.parentElement.parentElement.parentElement.innerText;
		} else if (e.target.tagName == 'svg') {
			titleInput.value = e.target.parentElement.parentElement.innerText;
		} else {
			titleInput.value = e.target.parentElement.innerText;
		}
	}

	const closeTitleModal = (e) => {
		const modal = document.querySelector('#edit-title-modal');
		modal.classList.add('hidden');
	}

	const openDescriptionModal = (e) => {
		const modal = document.querySelector('#edit-description-modal');
		const descriptionInput = document.querySelector('#edit-description-input');
		modal.classList.remove('hidden');
		if (e.target.tagName == 'path') {
			descriptionInput.value = e.target.parentElement.parentElement.parentElement.innerText;
		} else if (e.target.tagName == 'svg') {
			descriptionInput.value = e.target.parentElement.parentElement.innerText;
		} else {
			descriptionInput.value = e.target.parentElement.innerText;
		}
	}

	const closeDescriptionModal = (e) => {
		const modal = document.querySelector('#edit-description-modal');
		modal.classList.add('hidden');
	}

	const documentClickCloseModal = (e) => {
		const editSectionModal = document.querySelector('#modal');
		const addSectionModal = document.querySelector('#add-modal');
		const deleteSectionModal = document.querySelector('#delete-modal');
		const editDescriptionModal = document.querySelector('#edit-description-modal');
		const editTitleModal = document.querySelector('#edit-title-modal');
		const editSectionModalFirstChild = editSectionModal.firstElementChild;
		const addSectionModalFirstChild = addSectionModal.firstElementChild;
		const deleteSectionModalFirstChild = deleteSectionModal.firstElementChild;
		const editDescriptionModalFirstChild = editDescriptionModal.firstElementChild;
		const editTitleModalFirstChild = editTitleModal.firstElementChild;
		
		if (e.target.contains(editSectionModalFirstChild) && e.target !== editSectionModalFirstChild) {
			editSectionModal.classList.add('hidden');
		}

		if (e.target.contains(addSectionModalFirstChild) && e.target !== addSectionModalFirstChild) {
			addSectionModal.classList.add('hidden');
		}

		if (e.target.contains(deleteSectionModalFirstChild) && e.target !== deleteSectionModalFirstChild) {
			deleteSectionModal.classList.add('hidden');
		}

		if (e.target.contains(editDescriptionModalFirstChild) && e.target !== editDescriptionModalFirstChild) {
			editDescriptionModal.classList.add('hidden');
		}

		if (e.target.contains(editTitleModalFirstChild) && e.target !== editTitleModalFirstChild) {
			editTitleModal.classList.add('hidden');
		}
	}

	return (
		<>
		{loading ? <Loading /> : <> 
			{ session ? <div>
				{ (session.user.email === "mahdiafshar2413@gmail.com" || session.user.email === "mr.rahimi.live@gmail.com") ? <div>
					<div className={`${nunito.className} ${"container mx-auto flex justify-center w-full lg:mt-[100px] mt-[70px]"}`} onClick={documentClick}>
						<div id="right-section" className="h-full w-full">
							<form action={saveSections}>
								<div className="flex flex-col gap-y-4 lg:p-6">
									<div className="flex flex-col w-full bg-white border-[1px] border-border-gray lg:px-6 px-4 py-6 rounded-xl">
										<div className="">
											<h1 className="text-xl font-bold nunito">Title</h1>
											<div className="flex justify-between items-center border-b-2 border-border-gray px-3">
												<p className={`${vazir.className} ${"episode-title outline-none rounded-lg text-sm pb-2 pt-0 lg:w-6/12 w-full vazir truncate"}`} type="text">{episode.title}</p>
												<div className="hover:bg-hover-gray hover:text-gray-600 text-gray-400 p-1 rounded-md box-contect cursor-pointer mb-1" onClick={openTitleModal}><TbEdit className="text-xl"/></div>
											</div>
										</div>
										<div className="mt-8">
											<h1 className="text-xl font-bold nunito">Description</h1>
											<div className="flex justify-between items-center border-b-2 border-border-gray px-3">
												<p className={`${vazir.className} ${"episode-description w-full outline-none text-sm rounded-lg vazir pb-2 pt-0 truncate"}`}>{episode.description}</p>
												<div className="hover:bg-hover-gray hover:text-gray-600 text-gray-400 p-1 rounded-md box-contect cursor-pointer mb-1" onClick={openDescriptionModal}><TbEdit className="text-xl"/></div>
											</div>
										</div>
									</div>
									<div className="flex flex-col w-full bg-White rounded-xl border-[1px] border-border-gray-400">
										<div className="bg-White lg:px-6 px-4 lg:py-6 py-3 border-b-[1px] border-border-gray rounded-t-xl">
											<h1 className="text-xl font-bold nunito">Sections</h1>
										</div>
										<div id="section-details" className="flex flex-col w-full bg-white lg:px-6 py-3 rounded-b-xl">
											{
												sections.map((section) => (
													<div className="section grid grid-cols-12 lg:space-x-6 lg:gap-12 gap-1 border-b-[1px] border-border-gray lg:py-6 ps-4 pe-6 py-4">
														<div className={`${vazir.className} ${"lg:col-span-10 col-span-11"}`}>
															<div className="grid grid-cols-12 ">
																<div className="flex items-center justify-center col-span-1">
																	<h1 className="lg:col-span-1 lg:text-xl text-lg text-gray-600">{+section.number + 1}</h1>
																</div>
																<div className="col-span-11 lg:ms-0 ms-4">
																	<h1 className="text-sm sm:text-md font-semibold">{section.title}</h1>
																	<p className="text-gray-600 text-xs sm:text-sm pe-4 truncate">{section.summary}</p>
																	<p className="flex lg:hidden text-sm text-gray-600">duration: <span className="ms-1">{Math.round(section.duration / 3600)}</span> : <span> {Math.round(section.duration % 3600 / 60 )} </span>  : <span>{Math.round(section.duration % 60 )}</span></p>
																</div>
															</div>
														</div>
														<div className="hidden lg:flex justify-center items-center xl:col-span-1 lg:col-span-2 col-span-1">
															<p className="flex text-gray-600 text-md">duration: <span className="ms-1">{Math.round(section.duration / 3600)}</span> : <span> {Math.round(section.duration % 3600 / 60 )} </span>  : <span>{Math.round(section.duration % 60 )}</span></p>
														</div>
														<div className="section-more-body flex justify-center items-center col-span-1 relative">
															<div className="ul-more-section-button section-more-button hover:bg-hover-gray p-2 rounded-full duration-150 cursor-pointer z-1 border-[1px] border-border-gray" onClick={sectionShowMore}>
																<FiMoreHorizontal />
															</div>
															<ul className="section-more-menu section-more hidden absolute top-12 right-8 bg-white min-w-[200px] border-[1px] border-border-gray p-2 shadow-md rounded-xl z-10" number={section.number}>
																<li className="hover:bg-hover-gray py-2 px-3 rounded-lg duration-150 cursor-pointer" onClick={openModal}>Edit</li>
																<li className="hover:bg-SupLightRed text-red-600 py-2 px-3 rounded-lg duration-150 cursor-pointer" onClick={openDeleteModal}>Delete</li>
															</ul>
														</div>
													</div>
												))
											}
											<div id="modal" className="hidden modal fixed top-0 left-0 flex justify-center items-center w-full h-full bg-transparent-black-50 ms-0 z-30" onClick={documentClickCloseModal}>
												<div className="flex flex-col justify-center items-end section-modal bg-white px-5 py-3 m-5 max-w-8xl mt-[72px] max-h-[80vh] rounded-2xl">
													<button className="h-fit" type="button" onClick={closeModal}><IoCloseOutline className="hover:bg-hover-gray hover:text-gray-700 text-gray-400 p-1 box-content rounded-lg lg:text-2xl text-xl duration-100" /></button>
													<div className="max-h-[60vh] overflow-y-scroll no-scrollbar">
														<div className="flex justify-between items-center">
															<h1 className="text-lg font-bold nunito">Title</h1>
														</div>
														<input id="section-title" className="value section-title outline-none bg-[#f7f7f794] border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-full vazir" type="text" />
														<div className="mt-6">
															<h1 className="text-lg mb-1 font-bold nunito">Time Start</h1>
															<div className="flex flex-col gap-4">
																<div className="flex items-end">
																	<div className="flex flex-col justify-center lg:w-2/12 w-4/12 ">
																		<p className="text-xs ms-1">Hours</p>
																		<input id="section-hour" className="value section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="hour" />
																	</div> <span className="text-xl mx-2 pb-2">:</span>
																	<div className="flex flex-col lg:w-2/12 w-4/12 ">
																		<p className="text-xs ms-1">Minutes</p>
																		<input id="section-minute" className="value section-minute number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="minute" />
																	</div> <span className="text-xl mx-2 pb-2">:</span>
																	<div className="flex flex-col lg:w-2/12 w-4/12 ">
																		<p className="text-xs ms-1">Seconds</p>
																		<input id="section-second" className="value section-second section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="second" />
																	</div>
																</div>
																<div className="flex flex-col">
																	<p className="text-xs ms-1">Duration</p>
																	<input id="section-duration" className="value section-duration section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 lg:w-2/12 w-4/12 vazir" type="number" placeholder="duration" />
																</div>
															</div>
														</div>
														<div className="flex flex-col w-full mt-5">
															<h1 className="text-xl font-bold nunito">Summary</h1>
															<div className="w-full">
																<textarea id="section-summary" className="value section-summary min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
															</div>
														</div>
														<div className="flex flex-col w-full mt-5">
															<h1 className="text-xl font-bold nunito">Transcript</h1>
															<div className="w-full">
																<textarea id="section-transcript" className="value section-transcript min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
															</div>
														</div>
														<div className="flex flex-col w-full mt-5">
															<h1 className="text-xl font-bold nunito">Refrences</h1>
															<div className="w-full">
																<textarea id="section-refrences" className="value section-refrences min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
															</div>
														</div>
													</div>
													<div className="flex w-full justify-end pt-3 gap-3">
														<button className="hover:text-gray-700 bg-gray-100 text-gray-500 border-[1px] border-gray-300 px-5 py-1 rounded-lg duration-100" type="button" onClick={closeModal}>Cancel</button>
														<button className="bg-Blue text-white px-6 py-1 rounded-lg" type="button" onClick={editSection}>Save</button>
													</div>
												</div>
											</div>
											<div id="add-modal" className="hidden modal fixed top-0 left-0 flex justify-center items-center w-full h-full bg-transparent-black-50 ms-0 z-30" onClick={documentClickCloseModal}>
												<div className="flex flex-col justify-center items-end section-modal bg-white px-5 py-3 m-5 max-w-8xl mt-[72px] max-h-[80vh] rounded-2xl">
													<button className="h-fit" type="button" onClick={closeAddModal}><IoCloseOutline className="hover:bg-hover-gray hover:text-gray-700 text-gray-400 p-1 box-content rounded-lg lg:text-2xl text-xl duration-100" /></button>
													<div className="max-h-[60vh] overflow-y-scroll no-scrollbar">
														<div className="flex justify-between items-center">
															<h1 className="text-lg font-bold nunito">Title</h1>
														</div>
														<input id="section-title" className="value section-title outline-none bg-[#f7f7f794] border-2 border-gray-150 rounded-lg text-sm py-2 px-4 lg:w-6/12 w-full vazir" type="text" />
														<div className="mt-6">
															<h1 className="text-lg mb-1 font-bold nunito">Time Start</h1>
															<div className="flex flex-col gap-4">
																<div className="flex items-end">
																	<div className="flex flex-col justify-center lg:w-2/12 w-4/12 ">
																		<p className="text-xs ms-1">Hours</p>
																		<input id="section-hour" className="value section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="hour" />
																	</div> <span className="text-xl mx-2 pb-2">:</span>
																	<div className="flex flex-col lg:w-2/12 w-4/12 ">
																		<p className="text-xs ms-1">Minutes</p>
																		<input id="section-minute" className="value section-minute number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="minute" />
																	</div> <span className="text-xl mx-2 pb-2">:</span>
																	<div className="flex flex-col lg:w-2/12 w-4/12 ">
																		<p className="text-xs ms-1">Seconds</p>
																		<input id="section-second" className="value section-second section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 w-full vazir" type="number" placeholder="second" />
																	</div>
																</div>
																<div className="flex flex-col">
																	<p className="text-xs ms-1">Duration</p>
																	<input id="section-duration" className="value section-duration section-hour number-input bg-[#f7f7f794] outline-none border-2 border-gray-150 rounded-lg text-sm py-2 lg:px-4 px-3 lg:w-2/12 w-4/12 vazir" type="number" placeholder="duration" />
																</div>
															</div>
														</div>
														<div className="flex flex-col w-full mt-5">
															<h1 className="text-xl font-bold nunito">Summary</h1>
															<div className="w-full">
																<textarea id="section-summary" className="value section-summary min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
															</div>
														</div>
														<div className="flex flex-col w-full mt-5">
															<h1 className="text-xl font-bold nunito">Transcript</h1>
															<div className="w-full">
																<textarea id="section-transcript" className="value section-transcript min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
															</div>
														</div>
														<div className="flex flex-col w-full mt-5">
															<h1 className="text-xl font-bold nunito">Refrences</h1>
															<div className="w-full">
																<textarea id="section-refrences" className="value section-refrences min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
															</div>
														</div>
													</div>
													<div className="flex w-full justify-end pt-3 gap-3">
														<button className="hover:text-gray-700 bg-gray-100 text-gray-500 border-[1px] border-gray-300 px-5 py-1 rounded-lg duration-100" type="button" onClick={closeAddModal}>Cancel</button>
														<button className="bg-Blue text-white px-6 py-1 rounded-lg" type="button" onClick={addSectionData}>Save</button>
													</div>
												</div>
											</div>
											<div id="delete-modal" className="hidden modal fixed top-0 left-0 flex justify-center items-center w-full h-full bg-transparent-black-50 ms-0 z-30" onClick={documentClickCloseModal}>
												<div className="flex flex-col justify-center items-end section-modal bg-white px-5 py-3 m-5 max-w-8xl mt-[72px] max-h-[80vh] rounded-2xl">
													<button className="h-fit" type="button" onClick={closeDeleteModal}><IoCloseOutline className="hover:bg-hover-gray hover:text-gray-700 text-gray-400 p-1 box-content rounded-lg lg:text-2xl text-xl duration-100" /></button>
													<div className="max-h-[60vh] overflow-y-scroll no-scrollbar">
														<div>
															<p className="text-lg text-gray-600">Do you want to delete section "<span className={`${vazir.className} ${"text-black"}`}></span>"?</p>
															<p className=" text-gray-600">You will no longer be able to return it.</p>
														</div>
													</div>
													<div className="flex w-full pt-3 gap-3">
														<button className="hover:bg-gray-100 hover:text-gray-700  text-gray-500 px-5 py-2 w-1/2 rounded-md duration-100" type="button" onClick={closeDeleteModal}>Cancel</button>
														<button className="hover:bg-red-100 hover:text-red-600 text-red-500 px-5 py-2 w-1/2 rounded-md duration-100" type="button" onClick={deleteSection}>Delete</button>
													</div>
												</div>
											</div>
											<div id="section-deleted-modal" className="hidden section-deleted-modal modal fixed top-0 left-0 flex justify-center w-full">
												<div className="flex flex-col justify-center items-end section-modal bg-transparent-black-10 backdrop-blur-sm px-5 py-2 m-5 max-w-8xl mt-[72px] max-h-[80vh] shadow-md rounded-full">
													<div className="flex items-center space-x-2">
														<PiWarningCircle className="text-gray-600 text-lg" />
														<p className="text-lg text-gray-600">Section "<span className={`${vazir.className} ${"text-black"}`}></span>" was deleted.</p>
													</div>
												</div>
											</div>
											<div id="section-edited-modal" className="hidden section-deleted-modal modal fixed top-0 left-0 flex justify-center w-full">
												<div className="flex flex-col justify-center items-end section-modal bg-transparent-black-10 backdrop-blur-sm px-5 py-2 m-5 max-w-8xl mt-[72px] max-h-[80vh] shadow-md rounded-full">
													<div className="flex items-center space-x-2 text-gray-600">
														<GrStatusGood className="text-gray-600 text-lg" />
														<p className="text-lg text-gray-600">Changes applied.</p>
													</div>
												</div>
											</div>
											<div id="edit-title-modal" className="hidden modal fixed top-0 left-0 flex justify-center items-center w-full h-full bg-transparent-black-50 ms-0 z-30" onClick={documentClickCloseModal}>
												<div className="flex flex-col justify-center items-end section-modal bg-white px-5 py-3 m-5 max-w-8xl mt-[72px] max-h-[80vh] lg:w-5/12 w-full rounded-2xl">
													<button className="h-fit" type="button" onClick={closeTitleModal}><IoCloseOutline className="hover:bg-hover-gray hover:text-gray-700 text-gray-400 p-1 box-content rounded-lg lg:text-2xl text-xl duration-100" /></button>
													<div className="felx w-full max-h-[60vh] overflow-y-scroll no-scrollbar">
														<div className="flex justify-between items-center">
															<h1 className="text-lg font-bold nunito">Title</h1>
														</div>
														<input id="edit-title-input" className="outline-none bg-[#f7f7f794] border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-full vazir" type="text" />
													</div>
													<div className="flex w-full justify-end pt-3 gap-3">
														<button className="hover:text-gray-700 bg-gray-100 text-gray-500 border-[1px] border-gray-300 px-5 py-1 rounded-lg duration-100" type="button" onClick={closeTitleModal}>Cancel</button>
														<button className="bg-Blue text-white px-6 py-1 rounded-lg" type="button" onClick={editEpisodeTitle}>Save</button>
													</div>
												</div>
											</div>
											<div id="edit-description-modal" className="hidden modal fixed top-0 left-0 flex justify-center items-center w-full h-full bg-transparent-black-50 ms-0 z-30" onClick={documentClickCloseModal}>
												<div className="flex flex-col justify-center items-end section-modal bg-white px-5 py-3 m-5 max-w-8xl mt-[72px] max-h-[80vh] lg:w-5/12 w-full rounded-2xl">
													<button className="h-fit" type="button" onClick={closeDescriptionModal}><IoCloseOutline className="hover:bg-hover-gray hover:text-gray-700 text-gray-400 p-1 box-content rounded-lg lg:text-2xl text-xl duration-100" /></button>
													<div className="felx w-full max-h-[60vh] overflow-y-scroll no-scrollbar">
													<h1 className="text-xl font-bold nunito">Description</h1>
														<div className="w-full">
															<textarea id="edit-description-input" className="min-h-[150px] w-full bg-[#f7f7f794] resize-none outline-none text-sm border-2 border-gray-150 rounded-lg vazir p-3" rows="2" ></textarea>
														</div>
													</div>
													<div className="flex w-full justify-end pt-3 gap-3">
														<button className="hover:text-gray-700 bg-gray-100 text-gray-500 border-[1px] border-gray-300 px-5 py-1 rounded-lg duration-100" type="button" onClick={closeDescriptionModal}>Cancel</button>
														<button className="bg-Blue text-white px-6 py-1 rounded-lg" type="button" onClick={editEpisodeDescription}>Save</button>
													</div>
												</div>
											</div>
											<div className="relative flex flex-col justify-center items-center text-gray-300 w-full px-4 py-2 rounded-lg ">
												<div className="flex justify-center add-button ">
													<IoAddOutline className="hover:bg-gray-100 hover:text-gray-400 hover:border-gray-400 border-[2px] border-border-gray text-4xl rounded-full duration-100 cursor-pointer mt-3" onClick={addSectionModal} />
													<span className="tooltip absolute top-[-24px] rounded-md px-2 py-[5px] bg-gray-500 text-white z-2">click to add section</span>
													<span className="tooltip w-1 h-4 absolute top-[0px] rotate-45 rounded px-2 py-1 bg-gray-500 z-1"></span>
												</div>
											</div>
										</div>
									</div>
									<div className="flex w-full justify-end px-6 py-3 gap-3">
										<Link href='/'><button className="flex items-center justify-between hover:text-gray-700 bg-gray-100 text-gray-500 border-[1px] border-gray-300 px-6 py-2 rounded-lg duration-100"><IoIosArrowRoundBack className="text-2xl" /> Back</button></Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div> : <div className="flex justify-center items-center w-full h-[100vh]">You are not allowed to access this page.</div> }
			</div> : <div className="flex justify-center items-center w-full h-[100vh]">Please Sign In</div> }
		</> }
	</>
  )
}

export default EditSection