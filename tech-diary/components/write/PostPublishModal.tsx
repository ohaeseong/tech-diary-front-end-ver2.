import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { fadeinForModal, toBig } from 'styles/animation';
import { GoX } from 'react-icons/go';
import { color } from 'styles/color';
import PostItem from 'components/post/PostItem';
import { Post } from 'store/types/post.types';
import TagGroup from 'components/common/TagGroup';
import TagItem from 'components/common/TagItem';
// import {  }

const ModalTemplate = styled.div`
	position: absolute;
	z-index: 99;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

const ModalOver = styled.div`
	position: absolute;
	z-index: 98;
	opacity: 0.3;
	width: 100%;
	height: 100%;
	animation: ${fadeinForModal} 1s;
	background-color: black;
`;

const ModalBox = styled.div`
	width: 50rem;
	height: 30rem;
	background-color: white;
	animation: ${toBig} 0.7s;
	border-radius: 5px;
`;

const Head = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	width: 100%;
	height: 2.5rem;

	& > * {
		margin-right: 1.5rem;
		cursor: pointer;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 27.5rem;
`;

const PostPublishContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	width: 100%;
	max-height: 100%;
	border: 1px solid black;
`;

const PostPreviewBottom = styled.span`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	font-size: 0.7rem;
	color: ${(props) => props.theme.gray_4};
`;

const InputTag = styled.input`
	width: 100%;
`;

const itemDumyData = {
	id: '1',
	title: 'React.js',
	contents: 'adsf',
	thumbnailAddress: '',
	series: '',
	category: '',
	createTime: '2020-12-04T05:42:51.000Z',
	commentCount: 0,
	comments: [],
	memberId: 'some one',
	member: {
		memberId: '',
		memberName: '',
		profileImage: '',
	},
	like: 0,
} as Post;

type Props = {
	isOpen: boolean;
	modalToggle: () => void;
	onSavePost: () => void;
};

function PostPublishModal({ isOpen, modalToggle, onSavePost }: Props) {
	const closeModal = useCallback(() => {
		modalToggle();
	}, [modalToggle]);

	return (
		<>
			{isOpen ? (
				<>
					<ModalOver />
					<ModalTemplate>
						<ModalBox>
							<Head>
								<GoX size="1.5rem" color={color.gray_5} onClick={closeModal} />
							</Head>
							<Body>
								<PostPublishContentWrap>
									<PostItem item={itemDumyData} isReadOnly />
									<PostPreviewBottom>*미리보기</PostPreviewBottom>
								</PostPublishContentWrap>
								<PostPublishContentWrap>
								</PostPublishContentWrap>
							</Body>
						</ModalBox>
					</ModalTemplate>
				</>
			) : (
				<></>
			)}
		</>
	);
}

export default PostPublishModal;
