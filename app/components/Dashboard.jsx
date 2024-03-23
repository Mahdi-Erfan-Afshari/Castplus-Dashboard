import YourEpisodeSection from "./YourEpisodeSection"
import { server } from "@/app/lib/server"

const DashboardPage = async () => {
	// const fetchPodcasts = async () => {
	// 	const res = await fetch(`${server}/api/podcasts`, {
	// 		next: { revalidate: 1 },
	// 	  })
	// 	const data = await res.json();
	// 	return data
	// }
	
	// const data = await fetchPodcasts()
  return (
	<div className="mt-20">
		{/* <YourEpisodeSection data={data} /> */}
		<YourEpisodeSection />
	</div>
  )
}

export default DashboardPage
