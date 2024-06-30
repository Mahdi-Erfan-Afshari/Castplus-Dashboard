import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongo";

export async function GET(req) {
	const client = await clientPromise
	let db = client.db('castplus')
	let doc = await db.collection('podcasts').find().toArray()
	return NextResponse.json(doc)
}

export async function PUT(request){
	const client = await clientPromise
	let db = client.db('castplus')
	const data = await request.json();
	const { id } = data;
	let episode = await db.collection("podcasts").updateOne(
		{
			id: id,
			"episodes.id": data.episodeData.id
		},
		{
		  $set: {
			"episodes.$": data.episodeData,
		  },
		}
	);

	return NextResponse.json(episode)       
}



// export async function POST(request){
// 	const client = await clientPromise
// 	let db = client.db('castplus')
// 	const data = await request.json();
// 	const { id } = data;
// 	const { episodeId } = data;
// 	let episode = await db.collection("podcasts").findOneAndUpdate(
// 		{
// 			id: id,
// 		},
// 		{ $set: { "episodes.$[element].sections.$[elem]" : data.sectionsList } },
// 		{ arrayFilters: [
// 			 {"element.id": episodeId},
// 			 {"elem.id": data.sectionsList.id } 
// 		  ] }
// 	);
// 	return NextResponse.json(episode)       
// }

// export async function PUT(request){
// 	const client = await clientPromise
// 	let db = client.db('castplus')
// 	const data = await request.json();
// 	const { id } = data;
// 	const { episodeId } = data;
// 	let episode = await db.collection("podcasts").findOneAndUpdate(
// 		{
// 			id: id,
// 		},
// 		{ $set: { "episodes.$[element].sections.$[elem]" : data.sectionsList } },
// 		{ arrayFilters: [
// 			 {"element.id": episodeId},
// 			 {"elem.id": data.sectionsList.id } 
// 		  ] }
// 	);
// 	return NextResponse.json(episode)       
// }