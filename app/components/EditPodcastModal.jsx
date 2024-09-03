import { IoCloseOutline  } from "react-icons/io5";
import { useRef } from "react";
import { server } from "../lib/server";
import { useRouter } from "next/navigation";

const EditPodcastModal = ({ sendPodcastModalRef, podcastId, setLoading, podcast }) => {
	const podcastNameRef = useRef()
	const podcastAboutRef = useRef()
	const editPodcastModalRef = useRef()
	const router = useRouter()

	sendPodcastModalRef(editPodcastModalRef, podcastNameRef, podcastAboutRef)

	const documentClickCloseModal = (e) => {
		const editTitleModal = document.querySelector('#edit-podcast-modal');
		const editTitleModalFirstChild = editTitleModal.firstElementChild;

		if (e.target.contains(editTitleModalFirstChild) && e.target !== editTitleModalFirstChild) {
			editTitleModal.classList.add('hidden');
		}
	}

	const closePodcastModal = () => {
		const editPodcastModal = editPodcastModalRef.current;
		editPodcastModal.classList.add('hidden');
	}

	const editPodcast = async () => {
		const podcastName = podcastNameRef.current.value;
		const podcastAbout = podcastAboutRef.current.value;
		setLoading(true)
		await fetch(`${server}/api/podcasts/update-podcast`,{
			method:'PUT',
			headers: {
				"Content-type": "application/json"
			},
			cache:'no-cache',
			body:JSON.stringify({
				'id': podcastId,
				podcastName,
				podcastAbout
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

	return (
		<>
			<div ref={editPodcastModalRef} id="edit-podcast-modal" className="hidden fixed top-0 left-0 flex justify-center items-center w-full h-full bg-transparent-black-50 ms-0 z-30 ltr" onMouseDown={documentClickCloseModal}>
				<div className="flex flex-col justify-center items-end bg-white px-5 py-3 m-5 max-w-8xl mt-[72px] max-h-[80vh] lg:w-5/12 w-full rounded-2xl">
					<button className="h-fit" type="button" onClick={closePodcastModal}><IoCloseOutline className="hover:bg-hover-gray hover:text-gray-700 text-gray-400 p-1 box-content rounded-lg lg:text-2xl text-xl duration-100" /></button>
					<div className="felx w-full max-h-[60vh] overflow-y-scroll no-scrollbar">
						<div className="flex justify-between items-center">
							<h1 className="text-lg font-bold nunito">Name</h1>
						</div>
						<input ref={podcastNameRef} id="edit-name-input" className="outline-none bg-[#f7f7f794] border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-full vazir" type="text" placeholder="Enter Name" />
					</div>
					<div className="felx w-full max-h-[60vh] overflow-y-scroll no-scrollbar mt-4">
						<div className="flex justify-between items-center">
							<h1 className="text-lg font-bold nunito">About Me</h1>
						</div>
						<textarea ref={podcastAboutRef} id="edit-about-input" className="outline-none resize-none bg-[#f7f7f794] border-2 border-gray-150 rounded-lg text-sm py-2 px-4 w-full vazir no-scrollbar" rows={4} placeholder="Enter About Me" />
					</div>
					<div className="flex w-full justify-end pt-3 gap-3">
						<button className="hover:text-gray-700 bg-gray-100 text-gray-500 border-[1px] border-gray-300 px-5 py-1 rounded-lg duration-100" type="button" onClick={closePodcastModal}>Cancel</button>
						<button className="bg-Blue text-white px-6 py-1 rounded-lg" type="button" onClick={editPodcast}>Save</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default EditPodcastModal
