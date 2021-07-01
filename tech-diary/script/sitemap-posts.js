/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const fetch = require('node-fetch');
const prettier = require('prettier');

const getDate = new Date().toISOString();

const fetchUrl = 'https://work-it.co.kr:8080/api/post/?category=blog&limit=20&kinds=';
const YOUR_AWESOME_DOMAIN = 'https://work-it.co.kr';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
	const fetchPosts = await fetch(fetchUrl)
		.then((res) => res.json())
		.catch((err) => console.log(err));

	const postList = [];
	fetchPosts.data.posts.forEach((post) => postList.push({ url: post.url }));

	const postListSitemap = `
    ${postList
			.map((item) => {
				return `
          <url>
            <loc>${`${YOUR_AWESOME_DOMAIN}${item.url}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`;
			})
			.join('')}
  `;

	const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${postListSitemap}
    </urlset>
  `;

	const formattedSitemap = [formatted(generatedSitemap)];

	fs.writeFileSync('./public/sitemap/sitemap-posts.xml', formattedSitemap[0], 'utf8');
})();
