import { SearchQuery } from "algoliasearch/lite";

export async function search(requests: SearchQuery[]) {
    try {
        const response = await fetch(`http://localhost:3000/api/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requests }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} `);
        }

        const results = await response.json();

        if (!results || !Array.isArray(results.results)) {
            return { results: [] };
        }

        return results;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return { results: [] };
    }
}