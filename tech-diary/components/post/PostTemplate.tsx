import React from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';

import PostList from 'components/post/PostList';
import { mediaQuery } from 'components/layout/responsive';

const Template = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 90%;
	height: 100%;
	margin: 3rem auto;
`;

const Header = styled.div`
	height: 3rem;
	font-size: 2rem;
	line-height: 50px;
	/* margin: 1rem 1.5rem; */

	color: ${(props) => props.theme.black};
	width: 1660px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 1rem;
	${mediaQuery(1919)} {
		width: 1308px;
	}
	${mediaQuery(1440)} {
		width: 1124px;
	}
	${mediaQuery(1340)} {
		width: 924px;
	}
	${mediaQuery(1056)} {
		width: calc(100% - 9rem);
	}
`;

type Props = {
	postList: Array<Post>;
	headName: string;
};

function PostTemplate({ postList, headName }: Props) {
	return (
		<Template>
			{postList.length > 0 ? <Header>{headName}</Header> : <></>}
			<PostList postList={postList} />
		</Template>
	);
}

export default PostTemplate;
