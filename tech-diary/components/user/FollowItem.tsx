import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { FollowInfo, Member } from 'store/types/post.types';
import Button from 'components/common/Button';
import { color } from 'styles/color';
import { getStorage } from 'libs/storage';
import useRequest from 'libs/hooks/useRequest';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requestGetFollowInfo, requestIsFollow } from 'libs/repository';
import { UserInfo } from 'store/types/auth.types';

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
	align-items: center;
	min-width: 8rem;
	height: 100%;
	margin-left: 1rem;
`;

const ProfileImage = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin-right: 1.5rem;
	cursor: pointer;
`;

const NameWrap = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 1.5rem;

	& > * {
		font-size: 0.9rem;
		color: ${(props) => props.theme.black};
	}
`;

const MemberId = styled.div`
	&:hover {
		color: ${(props) => props.theme.neon_2};
	}
	cursor: pointer;
`;

const MemberName = styled.div`
	margin-left: 1rem;
	font-family: 'Spoqa Han Sans Thin';
	cursor: pointer;
	&:hover {
		color: ${(props) => props.theme.neon_2};
	}
`;

type Props = {
	item: FollowInfo;
	isFollowers: boolean;
	setFollowList: (parmas: any) => void;
};

function FollowItem({ item, isFollowers, setFollowList }: Props) {
	const [, , onRequestIsFollow, ,] = useRequest(requestIsFollow);
	const [, , onGetFollowInfo, ,] = useRequest(requestGetFollowInfo, true);
	const { memberId, memberName, profileImage } = item.member;

	const isFollowMember = useCallback(async () => {
		const token = getStorage('tech-token');
		if (!token) {
			toast.warning('로그인 후 이용해 주세요', {
				position: toast.POSITION.TOP_RIGHT,
			});

			return;
		}
		const requestMemberId = getStorage('user-info') as UserInfo;
		const followMemberId = memberId;

		if (requestMemberId.memberId === followMemberId) return;

		const req = {
			memberId: requestMemberId.memberId,
			followMemberId,
			token,
		};

		await onRequestIsFollow(req);

		const getFollowReq = {
			memberId: requestMemberId.memberId,
			type: isFollowers ? 'follower' : 'following',
		};

		const response = await onGetFollowInfo(getFollowReq);

		setFollowList(response.data.memberList);
	}, [isFollowers, memberId, onGetFollowInfo, onRequestIsFollow, setFollowList]);

	return (
		<FollowItemWrap>
			<ProfileWrap>
				<ProfileImage src={profileImage || '/static/user.png'} />
				<InfoWrap>
					<NameWrap>
						<MemberId>{memberId}</MemberId>
						<MemberName>{memberName}</MemberName>
					</NameWrap>
				</InfoWrap>
			</ProfileWrap>
			<Button height="2rem" btnColor={color.neon_2} margin="0 1rem 0 0" onClick={isFollowMember}>
				{isFollowers ? 'Follow' : 'UnFollow'}
			</Button>
		</FollowItemWrap>
	);
}

export default FollowItem;
