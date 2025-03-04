import client from "@/app/config";
import { NextRequest, NextResponse } from "next/server";
import { SearchQuery } from "algoliasearch/lite";

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();

        if (!body) {
            return NextResponse.json(
                { results: [] },
                { status: 400 }
            );
        }

        const { requests }: { requests: SearchQuery[] } = JSON.parse(body);
        const { results } = await client.search(requests)

        return NextResponse.json(
            { results },
            { status: 200 }
        );
    } catch (error) {
        console.error("Unexpected error on search:", error)
        return NextResponse.json(
            { results: [] },
            { status: 500 }
        );
    }
}