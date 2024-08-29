import EditEpisode from "@/app/components/EditEpisode"
import { server } from "@/app/lib/server"

const fetchPodcasts = async () => {
	const res = await fetch(`${server}/api/podcasts`, {
		cache: "no-store",
	  })
	const data = await res.json();
	return data;
}
const editCurrentEpisode = async ({ params: { id } }) => {
	
	const data = await fetchPodcasts()
  return (
	<div>
		<EditEpisode id={id} data={data} />
	</div>
  )
}

export default editCurrentEpisode
