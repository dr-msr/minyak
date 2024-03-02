'use server'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/components/site/frontpost';


export async function getArticles() {
	const postsDirectory = path.join(process.cwd(),'/articles/');
	// const filenames = fs.readdirSync(postsDirectory);
	// console.log(filenames)

	const filenames = [ "001.md", "002.md", "003.md" ]
  
	const posts = filenames.map(filename => {
	  const filePath = path.join(postsDirectory, filename);
	  const fileContents = fs.readFileSync(filePath, 'utf8');
	  const { data, content } = matter(fileContents);
  
	  return {
		filename,
		data,
		content,
	  };
	});
  
	return {
	  props: {
		posts,
	  },
	};
  }
  