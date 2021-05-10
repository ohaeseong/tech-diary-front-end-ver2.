import React from 'react';
import styled from '@emotion/styled';
import { Member } from 'store/types/post.types';
import Button from 'components/common/Button';
import { color } from 'styles/color';

const FollowItemWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 6rem;
	border-bottom: 1px solid ${(props) => props.theme.gray_1};
`;

const ProfileWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
	margin-left: 1rem;
`;

const InfoWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 8rem;
	height: 100%;
	/* border: 1px solid black; */
`;

const ProfileImage = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin-right: 1rem;
`;

type Props = {
	item: Member;
	isFollowers: boolean;
};

function FollowItem({ item, isFollowers }: Props) {
	console.log(item);

	return (
		<FollowItemWrap>
			<ProfileWrap>
				<ProfileImage src={item.profileImage || '/static/user.png'} />
				<InfoWrap />
			</ProfileWrap>
			<Button height="2rem" btnColor={color.neon_2} margin="0 1rem 0 0">
				{isFollowers ? 'UnFollow' : 'Follow'}
			</Button>
		</FollowItemWrap>
	);
}

export default FollowItem;
