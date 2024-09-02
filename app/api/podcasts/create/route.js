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
	let episode = await db.collection("podcasts").insertOne(data);
	return NextResponse.json(episode)       
}
	