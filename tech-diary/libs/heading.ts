import { escapeForUrl } from 'libs/utils';
import { PostLink } from 'store/types/post.types';

export function formatHeadingTagForUrl(html: HTMLHeadingElement[], slug: string) {
	const idList: string[] = [];
	const headings: PostLink[] = [];

	const h1 = html.filter((element) => element.tagName === 'H1');
	const h2 = html.filter((element) => element.tagName === 'H2');

	const substractLevelForDefaultHTag = [];

	if (h1.length === 0) {
		substractLevelForDefaultHTag.push(1);
	}
	if (h2.length === 0) {
		substractLevelForDefaultHTag.push(1);
	}

	const setElementInfo = (element: HTMLHeadingElement) => {
		const id = escapeForUrl(element.innerHTML);

		const exists = idList.filter((existingId) => existingId.indexOf(id) !== -1);
		const uniqueId = `${id}${exists.length === 0 ? '' : `-${exists.length}`}`;
		const url = `${slug}/#${id}${exists.length === 0 ? '' : `-${exists.length}`}`;
		let level = 0;
		element.id = `${id}${exists.length === 0 ? '' : `-${exists.length}`}`;

		if (element.tagName === 'H1') level = 0;
		else if (element.tagName === 'H2') level = 1;
		else if (element.tagName === 'H3') level = 2;

		level -= substractLevelForDefaultHTag.length;

		idList.push(uniqueId);
		headings.push({
			id: uniqueId,
			title: element.innerText,
			url,
			level: level < 0 ? 0 : level,
		});
	};

	html.forEach((element) => setElementInfo(element));
	return { headings, hElements: html };
}

export function parseHeading(html: string, slug: string) {
	const div = document.createElement('div');
	div.innerHTML = html;

	const elements = Array.from(div.children);
	const headings = elements.filter((element) => {
		if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
			return element;
		}

		return null;
	});

	const headingList = formatHeadingTagForUrl(headings as HTMLHeadingElement[], slug);

	return { headings: headingList.headings, headingElements: headingList.hElements };
}
