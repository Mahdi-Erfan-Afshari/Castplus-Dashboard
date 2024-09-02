import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongo";

export async function GET(req, {params}) {
	const client = await clientPromise
	let db = client.db('castplus')
	const { id } = params;
	let doc = await db.collection('podcasts').find({ id: id, }).toArray()
	return NextResponse.json(doc)
}

export async function DELETE(request){
	const client = await clientPromise
	let db = client.db('castplus')
	const data = await request.json();
	const { id } = data;
	const { episodeId } = data;
	let episode = await db.collection("podcasts").updateOne(
		{
			id: id,
		},
		{ $pull: { "episodes" : { "id": episodeId } } }
	);
	return NextResponse.json(episode)       
}