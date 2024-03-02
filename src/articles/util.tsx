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

    let posts = [];
    let i = 1;
    while (true) {
        let filename = String(i).padStart(3, '0') + '.md';
        const filePath = path.join(postsDirectory, filename);
        try {
            const fileContents = await getFile(filePath);
            const { data, content } = matter(fileContents);
            posts.push({
                filename,
                data,
                content,
            });
            i++;
        } catch (error) {
            break;
        }
    }

    return {
        props: {
            posts,
        },
    };
}
  