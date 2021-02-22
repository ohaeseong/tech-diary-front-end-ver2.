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

const UserIdTxt = styled.a`
	color: ${(props) => props.theme.gray_5};

	&:hover {
		cursor: pointer;
	}
	color: ${(props) => props.theme.black};

	font-weight: 700;
`;

const InfoTxt = styled.span`
	color: ${(props) => props.theme.gray_5};
	padding-left: 1rem;
	font-size: 0.8rem;
`;

const ProfileImage = styled.img`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	margin-right: 1rem;
	object-fit: cover;

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
	const { profileImage, memberName } = member;
	const date = new Date(createTime);
	const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const profileImageSource = profileImage || '/image/user.png';

	return (
		<PostInfoWrap>
			<PostInfoHeader>
				<UserInfoWrap>
					<Link href="http://localhost:3000/">
						<ProfileImage src={profileImageSource} alt="profile_image" />
					</Link>
					<Link href="http://localhost:3000/">
						<UserIdTxt>{memberName}</UserIdTxt>
					</Link>
					<InfoTxt>1.2k followers</InfoTxt>
				</UserInfoWrap>
				<InfoTxt>{dateFormat}</InfoTxt>
			</PostInfoHeader>
			{tagData.length !== 0 ? (
				<TagGroup>
					{tagData.map((item) => {
						return <TagItem key={item.idx} tagName={item.tagName} isLink />;
					})}{' '}
				</TagGroup>
			) : (
				<></>
			)}
		</PostInfoWrap>
	);
}

export default React.memo(PostInfo);
