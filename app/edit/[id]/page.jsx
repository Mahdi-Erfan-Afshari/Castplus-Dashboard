import EditSection from "@/app/components/EditSection"
import { server } from "@/app/lib/server"

const editCurrentEpisode = async ({ params: { id } }) => {
	const fetchPodcasts = async () => {
		const res = await fetch(`${server}/api/podcasts`, {
			next: { revalidate: 1 },
		  })
		const data = await res.json();
		return data;
	}
	
	const data = await fetchPodcasts()
  return (
	<div>
		<EditSection id={id} data={data} />
	</div>
  )
}

export default editCurrentEpisode
