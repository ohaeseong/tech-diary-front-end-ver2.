import React from 'react';
import styled from '@emotion/styled';
import { Member, Tag } from 'store/types/post.types';
import TagGroup from 'components/common/TagGroup';
import TagItem from 'components/common/TagItem';
import Link from 'next/link';

const PostInfoWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	width: 100%;
	margin-bottom: 1rem;

	/* border-bottom: 1px solid ${(props) => props.theme.gray_2}; */
`;

const PostInfoHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 4rem;

	justify-content: space-between;
`;

const UserInfoWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
`;

const InfoTxt = styled.a<{ isLink: boolean }>`
	color: ${(props) => props.theme.gray_3};

	${(props) =>
		props.isLink &&
		`
		&:hover {
			cursor: pointer;
		}
		color: ${props.theme.black};

		font-weight: 700;
	`}
`;

const ProfileImage = styled.img`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	margin-right: 1rem;

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	tagData: Tag[];
	member: Member;
	createTime: string;
};

function PostInfo({ tagData, member, createTime }: Props) {
	const { profileImage, memberId } = member;
	const date = new Date(createTime);
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	return (
		<PostInfoWrap>
			<PostInfoHeader>
				<UserInfoWrap>
					<Link href="http://localhost:3000/">
						<ProfileImage src={profileImage} />
					</Link>
					<Link href="http://localhost:3000/">
						<InfoTxt isLink>{memberId}</InfoTxt>
					</Link>
				</UserInfoWrap>
				<InfoTxt isLink={false}>{dateFormat}</InfoTxt>
			</PostInfoHeader>
			<TagGroup>
				{tagData.map((item) => {
					return <TagItem key={item.idx} tagName={item.tagName} />;
				})}
			</TagGroup>
		</PostInfoWrap>
	);
}

export default PostInfo;
