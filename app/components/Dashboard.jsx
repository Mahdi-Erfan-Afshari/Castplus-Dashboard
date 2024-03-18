import YourEpisodeSection from "./YourEpisodeSection"
import { server } from "@/app/lib/server"

const DashboardPage = async () => {
	const fetchPodcasts = async () => {
		const res = await fetch(`${server}/api/podcasts`)
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
