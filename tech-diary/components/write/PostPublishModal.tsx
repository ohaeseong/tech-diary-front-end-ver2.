import React, { ChangeEvent, useCallback } from 'react';
import styled from '@emotion/styled';
import { fadeinForModal, toBig } from 'styles/animation';
import { GoX } from 'react-icons/go';
import { color } from 'styles/color';
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
	height: 35rem;
	background-color: ${(props) => props.theme.white_1};
	animation: ${toBig} 0.5s;
	border-radius: 5px;
	padding: 0 2rem;
`;

const Head = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	width: 100%;
	margin-top: 1.5rem;
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
	height: 100%;
`;

const PostPublishSetCardWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	height: 100%;
`;

const ThumbnailUploadLabel = styled.label`
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

const ThumbnailUpdateLabelWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	& > * {
		margin-left: 0.5rem;
	}
`;

const ThumbnailUpdateLabel = styled.label`
	font-size: 1rem;
	cursor: pointer;
	font-family: 'Spoqa Han Sans Regular';
	color: ${color.gray_3};
	border-bottom: 1px solid ${color.gray_2};
`;

const ThumbnailUpload = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 10rem;
	border: 1px solid ${(props) => props.theme.gray_2};
	border-radius: 3px;
	width: 100%;
	height: 100%;

	& > * {
		color: ${(props) => props.theme.gray_5};
	}
`;

const ThumbnailImageWrap = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	margin-top: 0.8rem;
`;

const ThumbnailImage = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 3px;
`;

const PreviewText = styled.textarea`
	max-width: 100%;
	height: 100%;
	padding: 1rem;
	font-family: 'Spoqa Han Sans Thin';
	font-size: 1rem;
	margin-top: 1rem;
	background-color: ${(props) => props.theme.white_1};
	border-radius: 3px;
	color: ${(props) => props.theme.black};
	border: 1px solid ${(props) => props.theme.gray_2};
	resize: none;
`;

const ThumbnailUploadInput = styled.input`
	display: none;
`;

// const PostPreviewBottom = styled.span`
// 	display: flex;
// 	align-items: center;
// 	width: 100%;
// 	height: 2rem;
// 	font-size: 0.7rem;
// 	color: ${(props) => props.theme.gray_4};
// 	margin-top: 1rem;
// `;

const KindsSelect = styled.select`
	width: 100%;
	height: 4rem;
	outline: none;
	padding-left: 0.5rem;
	border: 1px solid ${color.gray_2};
	background-color: ${(props) => props.theme.white_1};
	color: ${(props) => props.theme.black};
`;

const ContentLabel = styled.span`
	width: 100%;
	font-size: 1rem;
	margin: 0.5rem 0;
	color: ${(props) => props.theme.black};
	font-family: 'Spoqa Han Sans Regular';
`;

const PublishSettingWrap = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 10rem;
	align-items: center;
	justify-content: space-between;
`;

const PublishSettingItem = styled.div<{ isActive: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 3rem;
	color: ${(props) => props.theme.gray_3};
	background-color: ${(props) => props.theme.white_1};
	cursor: pointer;
	transition: ease-in-out 0.2s;

	${(props) =>
		props.isActive &&
		`
			background-color: ${props.theme.neon_2};
			border-radius: 5px;
			color:${color.white};
	`}
`;

const SlugUrlSettingInput = styled.input`
	height: 2rem;
	font-size: 1.2rem;
	margin-bottom: 1rem;
	font-family: 'Spoqa Han Sans Thin';
	padding: 0.4rem 0.5rem;
	border: 1px solid ${color.gray_2};
	background-color: ${(props) => props.theme.white_1};
	color: ${(props) => props.theme.black};
`;

type Props = {
	isOpen: boolean;
	postIntro: string;
	modalToggle: () => void;
	onPublishPost: () => void;
	handleKindsValue: (event: ChangeEvent<HTMLSelectElement>) => void;
	handleUrl: (event: ChangeEvent<HTMLInputElement>) => void;
	handleThumbnailImage: (event: ChangeEvent<HTMLInputElement>) => void;
	handlePostIntro: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	resetThumbnail: () => void;
	handlePublicState: (publicState: boolean) => void;
	isEdit: boolean;
	isPublic: boolean;
	thumbnailImage: string;
	slugUrl: string;
};

function PostPublishModal({
	isOpen,
	modalToggle,
	onPublishPost,
	handleKindsValue,
	handleUrl,
	handleThumbnailImage,
	handlePostIntro,
	resetThumbnail,
	handlePublicState,
	isEdit,
	isPublic,
	thumbnailImage,
	slugUrl,
	postIntro,
}: Props) {
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
										{thumbnailImage ? (
											<>
												<ThumbnailUpdateLabelWrap>
													<ThumbnailUpdateLabel htmlFor="thumbnail_update">재업로드</ThumbnailUpdateLabel>
													<ThumbnailUploadInput
														id="thumbnail_update"
														type="file"
														multiple={false}
														onChange={handleThumbnailImage}
														accept="image/gif, image/jpeg, image/jpg, image/png"
													/>
													<ThumbnailUpdateLabel onClick={resetThumbnail}>제거</ThumbnailUpdateLabel>
												</ThumbnailUpdateLabelWrap>
												<ThumbnailImageWrap>
													<ThumbnailImage src={thumbnailImage} />
												</ThumbnailImageWrap>
											</>
										) : (
											<>
												<ThumbnailUploadLabel htmlFor="thumbnail_upload">
													<ThumbnailUpload>
														<MdImage size="2rem" />
													</ThumbnailUpload>
												</ThumbnailUploadLabel>
												<ThumbnailUploadInput
													id="thumbnail_upload"
													type="file"
													multiple={false}
													onChange={handleThumbnailImage}
													accept="image/gif, image/jpeg, image/jpg, image/png"
												/>
											</>
										)}
										<PreviewText
											placeholder="글에 대해 짧게 소개해보세요!"
											value={postIntro}
											onChange={handlePostIntro}
										/>
									</PostPublishSetCardWrap>
								</PostPublishContentWrap>
								<PostPublishContentWrap>
									<PostPublishSetCardWrap>
										<ContentLabel>공개 설정</ContentLabel>
										<PublishSettingWrap>
											<PublishSettingItem isActive={isPublic} onClick={() => handlePublicState(true)}>
												공개
											</PublishSettingItem>
											<PublishSettingItem isActive={!isPublic} onClick={() => handlePublicState(false)}>
												비공개
											</PublishSettingItem>
										</PublishSettingWrap>
										<ContentLabel>URL 설정</ContentLabel>
										<SlugUrlSettingInput value={slugUrl} onChange={handleUrl} />
										<ContentLabel>카테고리 선택</ContentLabel>
										<KindsSelect onChange={handleKindsValue}>
											<option value="front-end">front-end</option>
											<option value="back-end">back-end</option>
											<option value="mobile">mobile</option>
											<option value="other">other</option>
										</KindsSelect>
										<ButtonGroup sortDirection="row" margin="7rem 0 0 0">
											<Button btnColor={color.neon_2} onClick={onPublishPost} width="100%">
												{!isEdit ? '출간 하기' : '수정 하기'}
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
