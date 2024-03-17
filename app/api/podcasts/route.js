// import { NextResponse } from "next/server"
// import podcasts from "./server.json"

// const dev = process.env.NODE_ENV !== 'production'

// export const server = dev ? 'http://localhost:3000' : 'https://podcastnextjs.netlify.app'

// export async function GET(request) {
//     return NextResponse.json(podcasts)
// }

// export async function PUT(request){
//         const req = await request.json();
//             if (req.name) {
//                     const data = await request.json()
//                     let currentPodcast = podcasts.map((podcast) => {
//                         const currentEpisode = podcast.episodes.filter((episode) => {
//                             return episode.id === data.sectionsList.id
//                         })
//                         return currentEpisode;
//                     })
//                     console.log(data);
//                     console.log('successfull');
//                 }
//             //     else{
//             //         throw new Error("Task field is required")
//             //     }
//             // } catch (error) {
//                 // return NextResponse.json({message:(error as message).message})
//             // }
//     return NextResponse.json({data},{status:201})
        
// }


import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongo";

export async function GET(req) {
	const client = await clientPromise
	var db = client.db('castplus')
	var doc = await db.collection('podcasts').find().toArray()
	return NextResponse.json(doc)
}