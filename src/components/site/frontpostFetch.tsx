// pages/frontpost.tsx

import { getArticles } from '@/articles/util';
import FrontPost from '../components/FrontPost';

export async function getStaticProps() {
  const post = await getArticles();
  const draftList = post.props.posts.map((item) => ({
    id: item.filename,
    title: item.data.title,
    type: item.data.type,
    content: item.content,
    url: item.data.author.link,
    author: item.data.author.name,
  }));

  return {
    props: {
      posts: draftList,
    },
  };
}

export default function FrontPostPage({ posts }) {
  return <FrontPost posts={posts} />;
}