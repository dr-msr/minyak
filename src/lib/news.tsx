import { useQuery } from '@tanstack/react-query';

export type News = {
  title: string;
  description: string;
  datePublished: Date;
  link: string;
};

export async function fetchNews() {
  const response = await fetch(
    'https://customsearch.googleapis.com/customsearch/v1?key=' +
      process.env.NEXT_PUBLIC_GOOGLE_API +
      '&cx=4482e0b9da68d4e66&q= news petrol&cr=countryMY&dateRestrict=w1&num=5'
  );
  const data = await response.json();
  const output = data.items;
  const newsToday: News[] = [];

  for (let i = 0; i < output.length; i++) {
    const news: News = {
      title: output[i].pagemap.metatags[0]['og:title'],
      description: output[i].pagemap.metatags[0]['og:description'],
      datePublished: new Date(output[i].pagemap.metatags[0]['datepublished']),
      link: output[i].pagemap.metatags[0]['og:url'],
    };
    newsToday.push(news);
  }

  return newsToday.reverse();
}
