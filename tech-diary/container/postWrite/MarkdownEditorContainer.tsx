import React, { ChangeEvent, useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import MarkdownEditor from 'components/write/MarkdownEditor';
import styled from '@emotion/styled';
import TitleEditor from 'components/write/TitleEditor';
import MarkdownRenderer from 'components/common/MarkdownRenderer';
import PostPublishModal from 'components/write/PostPublishModal';
import useToggle from 'libs/hooks/useToggle';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useRequest from 'libs/hooks/useRequest';
import {
	requestCreatePost,
	requestGetDetail,
	requestPublishPost,
	requestUpdatePostForTemp,
	uploadImage,
	requestAddTag,
} from 'libs/repository';
import { getStorage } from 'libs/storage';
import { setWritePostId } from 'store/modules/write';
import { RootState } from 'store/modules';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreatePost, PostUpdate } from 'store/types/post.types';
import TagGroup from 'components/common/TagGroup';
import TagItem from 'components/common/TagItem';
import { escapeForUrl } from 'libs/utils';
import { UserInfo } from 'store/types/auth.types';

const MarkdownEditorTemplate = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100vh;
`;

const EditorWrap = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem 3rem;
	width: 100%;
`;

const RendererWrap = styled.div`
	padding: 0rem 3rem 0rem 3rem;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	width: 100%;
	height: 100%;
	border-left: 1px solid ${(props) => props.theme.gray_1};
`;

const TitlePreview = styled.span`
	width: 100%;
	min-height: 3.5rem;
	word-break: break-all;
	font-size: 2rem;
	padding: 2.5rem 0;
	margin-top: 4.5rem;
	color: ${(props) => props.theme.black};
	font-family: 'Spoqa Han Sans Regular';
`;

type tagValueType = {
	props: {
		tagName: string;
	};
};

function MarkdownEditorContainer() {
	const { postId, isTemp, initialBody } = useSelector((root: RootState) => root.write);
	const [markdownText, setMarkdownText] = useState(initialBody);
	const [title, setTitle] = useState('');
	const [tagItemList, setTagItemList] = useState([]);
	const [tagName, setTagName] = useState('');
	const [kinds, setKinds] = useState('front-end');
	const [slugUrl, setSlugUrl] = useState(title);
	const [thumbnailImage, setThumbnailAddress] = useState('');
	const [postIntro, setPostIntro] = useState('');

	const [isOpenModal, modalToggle] = useToggle(false);
	const [isPublic, isPublicToggle] = useToggle(true);
	const [, , onCreatePost, ,] = useRequest(requestCreatePost, true);
	const [, , onUpdatePost, ,] = useRequest(requestUpdatePostForTemp, true);
	const [, , onPublishPost, ,] = useRequest(requestPublishPost);
	const [, , onAddTag, ,] = useRequest(requestAddTag);
	const [lastPostData, , getLastPost, ,] = useRequest(requestGetDetail, true);
	const [, , onUploadImage, ,] = useRequest(uploadImage, true);
	const router = useRouter();
	const dispatch = useDispatch();

	const handlePostIntro = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		setPostIntro(event.target.value);
	}, []);

	const resetThumbnail = useCallback(() => {
		setThumbnailAddress('');
	}, []);

	const uploadImageUtil = useCallback(
		async (imageFile: any) => {
			const token = getStorage('tech-token');
			const formData = new FormData();

			if (imageFile) {
				formData.append('image', imageFile[0]);
			}

			const req = {
				formData,
				token,
			};

			const response = await onUploadImage(req);

			return response.data.imgs[0].fileAddress;
		},
		[onUploadImage]
	);

	const handleImage = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			const imageFile = event.target.files;
			const imageAddress = await uploadImageUtil(imageFile);

			let body = markdownText;

			body = `${body} \n ![](${imageAddress})`;

			setMarkdownText(body);
		},
		[markdownText, uploadImageUtil]
	);

	const handleThumbnailImage = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
		const imageFile = event.target.files;
		const imageAddress = await uploadImageUtil(imageFile);

		setThumbnailAddress(imageAddress);
	}, []);

	const addTag = useCallback(async() => {
		if (tagName.length === 0) return;
		let checkIsSame = false;
		tagItemList.forEach((tagValue: tagValueType) => {
			if (tagName === tagValue.props.tagName) {
				checkIsSame = true;
			}
		});
		if (checkIsSame) {
			setTagName('');
			return;
		}

		const tagList: any = [...tagItemList];

		tagList.push(<TagItem tagName={tagName} isLink={false} />);
		setTagItemList(tagList);


		await 

		setTagName('');
	}, [tagItemList, tagName]);

	const tagInputOnChage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setTagName(event.target.value);
	}, []);

	const handleUrl = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSlugUrl(event.target.value);
	}, []);

	const handleTagInputKeypress = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				addTag();
			}
		},
		[addTag]
	);

	const onTemporaryStorage = useCallback(async () => {
		let toastMassege = '';
		const qsId = router.query.id;

		if (!qsId) {
			if (title.length === 0 || markdownText.length === 0) {
				toastMassege = '제목 혹은 내용이 비어있습니다.';
				toast.error(toastMassege, {
					position: toast.POSITION.BOTTOM_RIGHT,
				});

				return;
			}

			const token = getStorage('tech-token');

			const req = {
				title,
				contents: markdownText,
				token,
			} as CreatePost;
			const response = await onCreatePost(req);
			const { id } = response.data;
			dispatch(setWritePostId(id));
			router.replace(`/blog/write?id=${id}`);

			toastMassege = '임시저장 완료';

			toast.success(toastMassege, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});

			return;
		}

		if (isTemp || qsId) {
			if (title.length === 0 || markdownText.length === 0) {
				toastMassege = '제목 혹은 내용이 비어있습니다.';
				toast.error(toastMassege, {
					position: toast.POSITION.BOTTOM_RIGHT,
				});

				return;
			}
			const token = getStorage('tech-token');
			const req = {
				id: postId || qsId,
				title,
				contents: markdownText,
				token,
			} as PostUpdate;
			await onUpdatePost(req);
			toastMassege = '임시저장 완료';

			toast.success(toastMassege, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	}, [dispatch, isTemp, markdownText, onCreatePost, onUpdatePost, postId, router, title]);

	const onSavePost = useCallback(async () => {
		let { id } = router.query;

		const token = getStorage('tech-token');
		const userInfo = getStorage('user-info') as UserInfo;

		const reqSlugUrl = `/@${userInfo.memberName}/${escapeForUrl(slugUrl)}`;

		if (!postId && !id) {
			const saveReq = {
				title,
				contents: markdownText,
				token,
			} as CreatePost;
			const response = await onCreatePost(saveReq);
			id = response.data.id;
		}

		let publishType;

		if (isPublic) {
			publishType = 1;
		} else {
			publishType = 2;
		}

		const publishReq = {
			id: postId || id,
			kinds,
			slugUrl: reqSlugUrl,
			category: 'blog',
			thumbnailAddress: thumbnailImage,
			intro: postIntro,
			token,
			publishType,
		};

		await onPublishPost(publishReq);
		dispatch(setWritePostId(''));

		router.push('/');
	}, [
		dispatch,
		isPublic,
		kinds,
		markdownText,
		onCreatePost,
		onPublishPost,
		postId,
		postIntro,
		router,
		slugUrl,
		thumbnailImage,
		title,
	]);

	const handleTitleLength = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length <= 50) {
			setTitle(event.target.value);
		}
	}, []);

	const handleKindsValue = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		setKinds(event.target.value);
	}, []);

	const openModal = useCallback(() => {
		if (title.length === 0 || markdownText.length === 0) {
			toast.error('제목 혹은 내용이 비어있습니다.', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});

			return;
		}
		if (!isOpenModal) {
			modalToggle();
		}
	}, [isOpenModal, markdownText.length, modalToggle, title.length]);

	const handlePublicState = useCallback(() => {
		isPublicToggle();
	}, [isPublicToggle]);

	useEffect(() => {
		const qsId = router.query.id;
		if (qsId) {
			const req = {
				id: qsId,
			};

			getLastPost(req);
		}
	}, [getLastPost, postId, router.query.id]);

	useEffect(() => {
		if (lastPostData) {
			setTitle(lastPostData.data.post.title);
			setMarkdownText(lastPostData.data.post.contents);
		}
	}, [lastPostData]);

	useEffect(() => {
		const changed = !shallowEqual(title, markdownText);

		if (changed) {
			const timeId = setTimeout(() => {
				if (!postId || title.length === 0 || markdownText.length === 0) return;
				onTemporaryStorage();
			}, 5000);

			return () => {
				clearTimeout(timeId);
			};
		}
	}, [markdownText, onTemporaryStorage, postId, title]);

	useEffect(() => {
		const slugUrlDefault = `/${title}`;
		setSlugUrl(slugUrlDefault);
	}, [title]);
	return (
		<>
			<Head>
				<title>{title ? `(작성중) ${title}` : 'Blog write'}</title>
			</Head>
			<PostPublishModal
				isOpen={isOpenModal}
				slugUrl={slugUrl}
				modalToggle={modalToggle}
				onPublishPost={onSavePost}
				handleKindsValue={handleKindsValue}
				thumbnailImage={thumbnailImage}
				handleUrl={handleUrl}
				handleThumbnailImage={handleThumbnailImage}
				handlePostIntro={handlePostIntro}
				resetThumbnail={resetThumbnail}
				handlePublicState={handlePublicState}
				isPublic={isPublic}
				postIntro={postIntro}
			/>
			<MarkdownEditorTemplate>
				<EditorWrap>
					<TitleEditor title={title} onChange={handleTitleLength} />
					<TagGroup>{tagItemList}</TagGroup>
					<MarkdownEditor
						markdownText={markdownText}
						setMarkdownText={setMarkdownText}
						handleTagInputKeypress={handleTagInputKeypress}
						tagName={tagName}
						tagInputOnChage={tagInputOnChage}
						openModal={openModal}
						requestSave={onTemporaryStorage}
						handleImage={handleImage}
					/>
				</EditorWrap>
				<RendererWrap>
					<TitlePreview>{title}</TitlePreview>
					<MarkdownRenderer markdown={markdownText} />
				</RendererWrap>
			</MarkdownEditorTemplate>
		</>
	);
}

export default MarkdownEditorContainer;
