import React from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';

import PostList from 'components/post/PostList';
import { mediaQuery } from 'components/layout/responsive';

const Template = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	margin: 3rem auto;
	width: 1728px;
	${mediaQuery(1919)} {
		width: 1376px;
	}

	${mediaQuery(1440)} {
		width: 1024px;
	}

	${mediaQuery(1056)} {
		width: calc(100% - 2rem);
	}

	${mediaQuery(767)} {
		margin-left: 1rem;
		margin: 8rem auto;
	}
`;

const Header = styled.div`
	height: 3rem;
	font-size: 2rem;
	line-height: 50px;

	color: ${(props) => props.theme.black};
	width: 1660px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 1rem;
	${mediaQuery(1919)} {
		width: 1336px;
	}

	${mediaQuery(1440)} {
		width: 1024px;
	}

	${mediaQuery(1056)} {
		width: calc(100% - 2rem);
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
