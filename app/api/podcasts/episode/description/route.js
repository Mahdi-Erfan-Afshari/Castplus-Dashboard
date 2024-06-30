import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongo";

export async function PUT(request, { params }){
	const client = await clientPromise
	let db = client.db('castplus')
	const data = await request.json();
	const { id } = data;
	const { episodeId } = data;
	let episode = await db.collection("podcasts").findOneAndUpdate(
		{
			id: id,
		},
		{ $set: { "episodes.$[element].description" : data.newDescription } },
		{ arrayFilters: [
			 {"element.id": episodeId},
		  ] }
	);
	return NextResponse.json(episode)       
}