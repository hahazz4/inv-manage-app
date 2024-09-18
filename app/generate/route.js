import { NextResponse } from "next/server";

export async function GET(req){
    return NextResponse.json({ error: "Nice try buddy.." }, {status: 405});
}

export async function POST(req){
    
    return NextResponse.json({ error: "" } , {status: 200});
}
