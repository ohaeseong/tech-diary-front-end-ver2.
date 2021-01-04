import React from 'react';
import { render } from '@testing-library/react';
import { createSerializer, matchers } from '@emotion/jest';

import PostItem from 'components/post/PostItem';
import { Post } from 'store/types/post.types';

expect.extend(matchers);
expect.addSnapshotSerializer(createSerializer());

describe('<PostItem/>', () => {
	it('matches snapshot', () => {
		const item = {
			id: 'test id',
			title: 'Test Title',
			category: 'test',
			contents: 'test contents',
			createTime: '2020-12-01',
			thumbnailAddress: '',
		} as Post;
		const utils = render(<PostItem item={item} />);
		expect(utils.container).toMatchSnapshot();
	});
});
