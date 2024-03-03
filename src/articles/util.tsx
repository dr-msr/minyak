'use server'

import path from 'path';
import matter from 'gray-matter';
import { getClient } from '@umami/api-client';

const filenames = [ "001.md", "002.md", "003.md" ]


export async function getFile(file: string) {
    const response = await fetch(file);
    const text = await response.text();
    return text;
}

export async function getArticles() {
    const postsDirectory = process.env.NEXT_PUBLIC_HOST + '/articles/';

    const posts = await Promise.all(filenames.map(async filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await getFile(filePath);

        const { data, content } = matter(fileContents);

        return {
            filename,
            data,
            content,
        };
    }));

    return {
        props: {
            posts,
        },
    };
}
  

export async function updateActive() {
	const client = getClient();

	if (!process.env.UMAMI_WEBSITE_ID) {
		throw new Error('UMAMI_WEBSITE_ID is not set');
	
	}
	
	const { data } = await client.getWebsiteActive(process.env.UMAMI_WEBSITE_ID);
	return data
}

export async function updateStats() {
	const client = getClient();

	if (!process.env.UMAMI_WEBSITE_ID) {
		throw new Error('UMAMI_WEBSITE_ID is not set');
	
	}

	const now = new Date().getTime();
	const yesterday = now - 86400000;


	const { data } = await client.getWebsiteStats(process.env.UMAMI_WEBSITE_ID, {
		startAt: yesterday,
		endAt: now,
		url: "/",
	});
	return data
}