import React from 'react';
import styled from '@emotion/styled';
import InventoryPostList from 'components/post/InventoryPostList';
import InventoryPostItem from 'components/post/InventoryPostItem';
import { Post } from 'store/types/post.types';
import { mediaQuery } from 'components/layout/responsive';

const SearchPageTemplate = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	margin-top: 5rem;
	background-color: ${(props) => props.theme.white};

	& > * {
		margin-top: 3rem;
	}
`;

const PostCount = styled.div`
	width: 56%;
	font-family: 'Spoqa Han Sans Thin';
	margin-top: 3rem;
	color: ${(props) => props.theme.gray_4};

	${mediaQuery(768)} {
		width: 90%;
		font-size: 0.8rem;
	}
`;

const Head = styled.div`
	display: flex;
	flex-direction: row;
	width: 56%;

	${mediaQuery(768)} {
		width: 90%;
	}
`;

const TagName = styled.div`
	font-size: 2.5rem;
	font-family: 'Spoqa Han Sans Medium';
	margin-top: 3rem;
	color: ${(props) => props.theme.black};

	${mediaQuery(768)} {
		font-size: 2rem;
	}
`;

const InventoryPostListWrap = styled.div`
	width: 56%;

	${mediaQuery(768)} {
		width: 90%;
	}
`;

interface TagPost extends Post {
	tagName: string;
}

type Props = {
	posts: Array<TagPost>;
};

function PostTagSearch({ posts }: Props) {
	return (
		<SearchPageTemplate>
			<Head>
				<TagName># {posts[0].tagName}</TagName>
			</Head>
			{posts.length !== 0 ? <PostCount>총 {posts.length}개의 포스트</PostCount> : <></>}
			<InventoryPostListWrap>
				<InventoryPostList>
					{posts.map((item: any) => {
						const postItem = {
							tagList: item.tagList,
							...item.post,
						};
						return <InventoryPostItem key={item.postId} item={postItem} />;
					})}
				</InventoryPostList>
			</InventoryPostListWrap>
		</SearchPageTemplate>
	);
}

export default PostTagSearch;
