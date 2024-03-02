'use server'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/components/site/frontpost';



export async function getFile(file: string) {
    const response = await fetch(file);
    const text = await response.text();
    return text;
}

export async function getArticles() {
    const postsDirectory = process.env.NEXT_PUBLIC_HOST + '/articles/';
    const filenames = [ "001.md", "002.md", "003.md" ]

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
  