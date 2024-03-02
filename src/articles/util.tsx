'use server'

import path from 'path';
import matter from 'gray-matter';

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
  