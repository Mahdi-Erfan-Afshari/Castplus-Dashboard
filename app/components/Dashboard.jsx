
import YourEpisodeSection from "./YourEpisodeSection"
import { server } from "../lib/server";

const fetchPodcasts = async () => {
	const res = await fetch(`${server}/api/podcasts`, {
		cache: "no-store",
	})
	const data = await res.json();
	return data
}

const DashboardPage = async () => {
	const data = await fetchPodcasts()
	return (
	<div className="mt-20">
		<YourEpisodeSection data={data} />
	</div>
  )
}

export default DashboardPage
