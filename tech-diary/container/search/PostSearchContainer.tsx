import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { AiOutlineSearch } from 'react-icons/ai';
import InventoryPostList from 'components/post/InventoryPostList';
import InventoryPostItem from 'components/post/InventoryPostItem';
import useRequest from 'libs/hooks/useRequest';

import { requestSearchPosts } from 'libs/repository';
import { Post } from 'store/types/post.types';
import Input from 'components/common/Input';
import { color } from 'styles/color';
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

const SearchInputWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	${mediaQuery(768)} {
		width: 80%;
	}
`;

const IconWrap = styled.div`
	margin-right: 1rem;
	${mediaQuery(768)} {
		width: 2rem;
		& > * {
			width: 2rem;
			margin-right: 1rem;
		}
	}
`;

const PostCount = styled.div`
	width: 55%;

	${mediaQuery(768)} {
		width: 90%;
		padding-left: 1rem;
		font-size: 0.8rem;
	}
	& > * {
		font-family: 'Spoqa Han Sans Thin';
		color: ${(props) => props.theme.gray_4};
	}
`;

const InventoryPostListWrap = styled.div`
	width: 55%;

	${mediaQuery(768)} {
		width: 90%;
	}
`;

function PostSearchContainer() {
	const [searchPosts, setSearchPosts] = useState([]);
	const [searchWord, setSearchWord] = useState('');

	const [searchPostsData, , onSearchPosts, ,] = useRequest(requestSearchPosts, true);

	const handleSearchWord = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			setSearchWord(event.target.value);

			if (event.target.value) {
				const req = {
					searchWord: event.target.value,
				};
				await onSearchPosts(req);
			}

			if (!event.target.value) {
				setSearchPosts([]);
			}
		},
		[onSearchPosts]
	);

	useEffect(() => {
		if (searchPostsData && searchWord) {
			setSearchPosts(searchPostsData.data.posts);
		}
	}, [searchPosts, searchPostsData, searchWord]);

	return (
		<SearchPageTemplate>
			<SearchInputWrap>
				<IconWrap>
					<AiOutlineSearch size="2.5rem" color={color.gray_3} />
				</IconWrap>
				<Input
					fontSize="regular"
					placeholder="게시글 검색..."
					width="35rem"
					onChange={handleSearchWord}
					value={searchWord}
				/>
			</SearchInputWrap>
			{searchPosts.length !== 0 ? (
				<PostCount>
					<div> 총 {searchPosts.length}개의 포스트</div>
				</PostCount>
			) : (
				<></>
			)}
			<InventoryPostListWrap>
			<InventoryPostList>
				{searchPosts.map((item: Post) => {
					return <InventoryPostItem key={item.id} item={item} />;
				})}
			</InventoryPostList>
			</InventoryPostListWrap>
		</SearchPageTemplate>
	);
}

export default PostSearchContainer;
