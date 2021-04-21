import React from 'react';
import styled from '@emotion/styled';
import { Post } from 'store/types/post.types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const UserProfilePostItemWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	/* height: 10rem; */
	padding: 2.5rem 0rem;
	/* margin-bottom: 1rem; */

	border-bottom: 1px solid ${(props) => props.theme.gray_1};
	cursor: pointer;
	/* border: 1px solid black; */
`;

const Head = styled.div`
	height: 3rem;
	/* padding-left: 2rem; */
	line-height: 3rem;

	font-family: 'Spoqa Han Sans Medium';
	font-size: 1.5rem;

	color: ${(props) => props.theme.neon_2};
	/* border: 1px solid black; */
`;

const Body = styled.div`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	white-space: normal;
	word-break: break-all;
	overflow: hidden;
	height: 5rem;
	/* padding-left: 2rem; */
	line-height: 1.8rem;
	font-family: 'Spoqa Han Sans Thin';
	font-size: 0.8rem;
	color: ${(props) => props.theme.gray_3};
	margin-top: 0.5rem;
	/* border: 1px solid black; */
`;

const Bottom = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 2rem;
	/* border: 1px solid black; */
`;

const BottomInfo = styled.span`
	line-height: 2rem;
	color: ${(props) => props.theme.gray_4};
	font-family: 'Spoqa Han Sans Thin';
	margin-top: 1.5rem;
	font-size: 0.8rem;
	/* margin-left: 1rem; */
	/* border: 1px solid black; */
`;

type Props = {
	item: Post;
};

function UserProfilePostItem({ item }: Props) {
	const { id, title, contents, intro, memberId, createTime, url } = item;
	const router = useRouter();
	const date = new Date(createTime);
	let reqUrl;
	const onlySlug = url ? url.split('/') : '';
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	if (router.pathname === '/[userId]/save') {
		reqUrl = `/write?id=${id}`;
	} else {
		reqUrl = `/${memberId}/${onlySlug[2]}`;
	}

	return (
		<Link href={reqUrl}>
			<UserProfilePostItemWrap>
				<Head>{title}</Head>
				<Body>{intro || contents}</Body>
				<Bottom>
					<BottomInfo>{memberId}</BottomInfo>
					<BottomInfo>{dateFormat}</BottomInfo>
				</Bottom>
			</UserProfilePostItemWrap>
		</Link>
	);
}

export default UserProfilePostItem;
