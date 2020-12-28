import React from 'react';
import { render } from '@testing-library/react';

import PostItem from 'components/post/PostItem';
// import { Post } from 'store/types/post.types';

describe('<PostItem/>', () => {
    it('matches snapchot', () => {
        // const item = {
        //     id: 'test id',
        //     title: 'Test Title',
        //     category: 'test', 
        //     contents: 'test contents', 
        //     create_time: '2020-12-01',
        //     thumbnail_address: '',
        // } as Post;
        const utils = render(<PostItem/>);
        expect(utils.container).toMatchSnapshot();
    });
});