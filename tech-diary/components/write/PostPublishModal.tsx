import React, { ChangeEvent, useCallback } from 'react';
import styled from '@emotion/styled';
import { fadeinForModal, toBig } from 'styles/animation';
import { GoX } from 'react-icons/go';
import { color } from 'styles/color';
import PostItem from 'components/post/PostItem';
import { Post } from 'store/types/post.types';
import Button from 'components/common/Button';
import ButtonGroup from 'components/common/ButtonGroup';
import { MdImage } from 'react-icons/md';

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
	/* border: 1px solid black; */
`;

const PostPublishSetCardWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	height: 100%;
	/* border: 1px solid black; */
`;

const ThumbnailUploadLabel = styled.label`
	cursor: pointer;
`;

const ThumbnailUpload = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 10rem;
	border: 1px solid ${(props) => props.theme.gray_2};
	border-radius: 3px;

	& > * {
		color: ${(props) => props.theme.gray_5};
	}
`;

const PreviewText = styled.textarea`
	max-width: 100%;
	height: 100%;
	padding: 0.5rem;
	font-family: 'Spoqa Han Sans Thin';
	font-size: 1rem;
	margin-top: 1rem;
	border-radius: 3px;
	border: 1px solid ${(props) => props.theme.gray_2};
	resize: none;
`;

const ThumbnailUploadInput = styled.input`
	display: none;
`;

const PostPreviewBottom = styled.span`
	display: flex;
	align-items: center;
	width: 100%;
	height: 2rem;
	font-size: 0.7rem;
	color: ${(props) => props.theme.gray_4};
	margin-top: 1rem;
`;

const KindsSelect = styled.select`
	width: 100%;
	height: 2rem;
	outline: none;
	border: 1px solid ${color.gray_2};

	& > * {
		color: black;
	}
`;

const ContentLabel = styled.span`
	width: 100%;
	font-size: 1.3rem;
	margin-bottom: 0.5rem;
	font-family: 'Spoqa Han Sans Regular';
`;

const PublishSettingWrap = styled.div`
	width: 100%;
	height: 5rem;
	margin-bottom: 2rem;
	border: 1px solid black;
`;

const SlugUrlSettingInput = styled.input`
	height: 2rem;
	font-size: 1.2rem;
	margin-bottom: 2rem;
	font-family: 'Spoqa Han Sans Thin';
	padding-left: 0.5rem;
	border: 1px solid ${color.gray_2};
`;

type Props = {
	isOpen: boolean;
	modalToggle: () => void;
	onPublishPost: () => void;
	handleKindsValue: (event: ChangeEvent<HTMLSelectElement>) => void;
	handleUrl: (event: ChangeEvent<HTMLInputElement>) => void;
	slugUrl: string;
};

function PostPublishModal({ isOpen, modalToggle, onPublishPost, handleKindsValue, handleUrl, slugUrl }: Props) {
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
									<PostPublishSetCardWrap>
										<ThumbnailUploadLabel htmlFor="thumbnail_upload">
											<ThumbnailUpload>
												<MdImage size="2rem" />
											</ThumbnailUpload>
										</ThumbnailUploadLabel>
										<ThumbnailUploadInput
											id="thumbnail_upload"
											type="file"
											multiple={false}
											accept="image/gif, image/jpeg, image/jpg, image/png"
										/>
										<PreviewText placeholder="글에 대해 짧게 소개해보세요!" />
									</PostPublishSetCardWrap>
									<PostPreviewBottom>*미리보기</PostPreviewBottom>
								</PostPublishContentWrap>
								<PostPublishContentWrap>
									<PostPublishSetCardWrap>
										<ContentLabel>공개 설정</ContentLabel>
										<PublishSettingWrap />
										<ContentLabel>URL 설정</ContentLabel>
										<SlugUrlSettingInput value={slugUrl} onChange={handleUrl} />
										<ContentLabel>카테고리 선택</ContentLabel>
										<KindsSelect onChange={handleKindsValue}>
											<option value="front-end">front-end</option>
											<option value="back-end">back-end</option>
											<option value="database">database</option>
											<option value="other">other</option>
										</KindsSelect>
										<ButtonGroup sortDirection="row">
											<Button btnColor={color.neon_2} onClick={onPublishPost}>
												출간 하기
											</Button>
										</ButtonGroup>
									</PostPublishSetCardWrap>
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
