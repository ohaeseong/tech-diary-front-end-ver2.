import { v4 as uuid4 } from 'uuid';
import { escapeForUrl } from 'libs/utils';
import { PostLink } from 'store/types/post.types';

export function formatHeadingTagForUrl(html: Element[]) {
	// console.log(html);

	const h1 = html.filter((element) => element.tagName === 'H1');
	const h2 = html.filter((element) => element.tagName === 'H2');
	const h3 = html.filter((element) => element.tagName === 'H3');

	const idList: string[] = [];
	const headings: PostLink[] = [];

	const setElementInfo = (element: Element) => {
		const id = escapeForUrl(element.innerHTML);
		const exists = idList.filter((existingId) => existingId.indexOf(id) !== -1);
		const uniqueId = `${id}${exists.length === 0 ? '' : `-${exists.length}`}`;
		element.id = uniqueId;
		idList.push(uniqueId);
		headings.push({
			id,
			title: element.innerHTML,
		});
	};

	[h1, h2, h3].forEach((elements) => elements.forEach(setElementInfo));

	return headings;
}

export function parseHeading(html: string) {
	const div = document.createElement('div');
	div.innerHTML = html;

	const elements = Array.from(div.children);
	const headings = elements.filter((element): any => {
		if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
			return element;
		}
	});

	const headingList = formatHeadingTagForUrl(headings);

	return headingList;
}
