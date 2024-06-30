import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongo";

export async function GET(req, {params}) {
	const client = await clientPromise
	let db = client.db('castplus')
	const { id } = params;
	let doc = await db.collection('podcasts').find({ id: id, }).toArray()
	return NextResponse.json(doc)
}

export async function PUT(request, { params }){
	const client = await clientPromise
	let db = client.db('castplus')
	const data = await request.json();
	const { id } = params;
	const { episodeId } = data;
	let episode = await db.collection("podcasts").findOneAndUpdate(
		{
			id: id,
		},
		{ $set: { "episodes.$[element].sections.$[elem]" : data.sectionsList } },
		{ arrayFilters: [
			 {"element.id": episodeId},
			 {"elem.id": data.sectionsList.id }
		  ] }
	);
	return NextResponse.json(episode)       
}

export async function POST(request, { params }){
	const client = await clientPromise
	let db = client.db('castplus')
	const data = await request.json();
	const { id } = params;
	const { episodeId } = data;
	let episode = await db.collection("podcasts").findOneAndUpdate(
		{
			id: id,
		},
		{ $push: { "episodes.$[element].sections" : data.sectionsList } },
		{ arrayFilters: [
			 {"element.id": episodeId}
		  ], upsert: true }
	);
	return NextResponse.json(episode)       
}

export async function DELETE(request, { params }){
	const client = await clientPromise
	let db = client.db('castplus')
	const data = await request.json();
	const { id } = params;
	const { episodeId } = data;
	let episode = await db.collection("podcasts").updateOne(
		{
			id: id,
		},
		{ $pull: { "episodes.$[element].sections" : { "id": data.sectionsList.id } } },
		{ arrayFilters: [
			 {"element.id": episodeId},
			//  {"elem.id": data.sectionsList.id }
		  ] , upsert: true}
	);
	return NextResponse.json(episode)       
}

// export async function UPDATETITLE(request, { params }){
// 	const client = await clientPromise
// 	let db = client.db('castplus')
// 	const data = await request.json();
// 	const { id } = params;
// 	const { episodeId } = data;
// 	let episode = await db.collection("podcasts").findOneAndUpdate(
// 		{
// 			id: id,
// 		},
// 		{ $set: { "episodes.$[element].id" : data.newTitle } },
// 		{ arrayFilters: [
// 			 {"element.id": episodeId},
// 		  ] }
// 	);
// 	return NextResponse.json(episode)       
// }