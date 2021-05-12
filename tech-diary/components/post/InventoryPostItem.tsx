import React from 'react';
import styled from '@emotion/styled';
import { Post, Tag } from 'store/types/post.types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TagGroup from 'components/common/TagGroup';
import TagItem from 'components/common/TagItem';

const InventoryPostItemWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 2rem 0rem;

	border-bottom: 1px solid ${(props) => props.theme.gray_1};
	cursor: pointer;
`;

const ThumbnailWrap = styled.img`
	width: 15rem;
	height: 10rem;
	margin-left: 1rem;
	object-fit: contain;
`;

const Head = styled.div`
	height: 3rem;
	line-height: 3rem;

	font-family: 'Spoqa Han Sans Medium';
	font-size: 1.5rem;

	color: ${(props) => props.theme.neon_2};
`;

const BodyWrap = styled.div`
	display: flex;
	flex-direction: row;
`;

const Body = styled.div`
	width: 100%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	white-space: normal;
	word-break: break-all;
	overflow: hidden;
	height: 5rem;
	line-height: 1.8rem;
	font-family: 'Spoqa Han Sans Thin';
	font-size: 0.8rem;
	color: ${(props) => props.theme.gray_3};
	margin-top: 2.5rem;
	margin-bottom: 2rem;
`;

const Bottom = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const BottomInfo = styled.span`
	color: ${(props) => props.theme.gray_4};
	font-family: 'Spoqa Han Sans Thin';
	font-size: 0.7rem;
`;

type Props = {
	item: Post;
};

function InventoryPostItem({ item }: Props) {
	const { id, title, contents, intro, memberId, createTime, url, tagList, thumbnailAddress } = item;

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
			<InventoryPostItemWrap>
				<Head>{title}</Head>
				<BodyWrap>
					<Body>{intro || contents}</Body>
					<ThumbnailWrap src={thumbnailAddress || '/static/loginTemplateImage.png'} alt="post_thumbnail_image" />
				</BodyWrap>
				{tagList?.tagData.length !== 0 ? (
					<TagGroup margin="0.5rem 0rem 1.2rem 0rem">
						{tagList?.tagData.map((tagItem: Tag) => {
							return <TagItem key={tagItem.idx} tagName={tagItem.tagName} isLink />;
						})}
					</TagGroup>
				) : (
					<></>
				)}
				<Bottom>
					<BottomInfo>{memberId}</BottomInfo>
					<BottomInfo>{dateFormat}</BottomInfo>
				</Bottom>
			</InventoryPostItemWrap>
		</Link>
	);
}

export default React.memo(InventoryPostItem);
