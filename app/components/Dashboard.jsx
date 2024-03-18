import YourEpisodeSection from "./YourEpisodeSection"
import { server } from "@/app/lib/server"

const DashboardPage = async () => {
	const fetchPodcasts = async () => {
		const res = await fetch(`${server}/api/podcasts`, { cache: 'no-store' }, {
			next: {
			  revalidate: 60 
			}
		  })
		const data = await res.json();
		return data
	}
	
	const data = await fetchPodcasts()

  return (
	<>
		<YourEpisodeSection data={data} />
	</>
  )
}

export default DashboardPage
