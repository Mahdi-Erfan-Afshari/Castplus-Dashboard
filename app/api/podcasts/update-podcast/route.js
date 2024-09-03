import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongo";

export async function GET(req) {
	const client = await clientPromise
	let db = client.db('castplus')
	let doc = await db.collection('podcasts').find().toArray()
	return NextResponse.json(doc)
}

export async function PUT(request){
	const client = await clientPromise;
	let db = client.db('castplus');
	const data = await request.json();
	const { id } = data;
	const { podcastName } = data;
	const { podcastAbout } = data;
	let podcast = await db.collection("podcasts").updateMany(
		{
			id: id,
		},
		{
		  $set: {
			"name": podcastName,
			"about": podcastAbout,
		  },
		}
	);

	return NextResponse.json(podcast)       
}
