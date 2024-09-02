import CreateEpisode from "../components/CreateEpisode"
import { server } from "@/app/lib/server"

const fetchPodcasts = async () => {
	const res = await fetch(`${server}/api/podcasts`, {
		cache: "no-store",
	  })
	const data = await res.json();
	return data;
}

const CreateEpisodePage = async () => {
	const data = await fetchPodcasts()
	return (
	<>
	  <CreateEpisode data={data} />
	</>
  )
}

export default CreateEpisodePage
