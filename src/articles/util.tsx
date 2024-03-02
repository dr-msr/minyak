'use server'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


export async function getArticles() {
	const postsDirectory = path.join(process.cwd(),'/articles');
	const filenames = fs.readdirSync(postsDirectory);
  
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
  
 
