import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongo";

export async function GET(req) {
	const client = await clientPromise
	let db = client.db('castplus')
	let doc = await db.collection('podcasts').find().toArray()
	return NextResponse.json(doc)
}

export async function POST(request){
	const client = await clientPromise
	let db = client.db('castplus')
	const data = await request.json();
	const { id } = data;
	let episode = await db.collection("podcasts").updateOne(
		{
			id: id,
		},
		{
		  $set: {
			episodes: [data.sectionsList],
		  },
		}
	);

	return NextResponse.json(episode)       
}


