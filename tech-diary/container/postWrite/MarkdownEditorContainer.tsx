/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// import htmlPlugin from 'remark-html';
import remark from 'remark';
import strip from 'strip-markdown';
import styled from '@emotion/styled';
import TitleEditor from 'components/write/TitleEditor';
import MarkdownRenderer from 'components/common/MarkdownRenderer';
import PostPublishModal from 'components/write/PostPublishModal';
import useToggle from 'libs/hooks/useToggle';
import { shallowEqual, useDispatch } from 'react-redux';
import useRequest from 'libs/hooks/useRequest';
import {
	requestCreatePost,
	requestGetDetail,
	requestPublishPost,
	requestUpdatePostForTemp,
	uploadImage,
} from 'libs/repository';
import { getStorage } from 'libs/storage';
import { setWritePostId } from 'store/modules/write';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreatePost, PostUpdate } from 'store/types/post.types';
import TagGroup from 'components/common/TagGroup';
import TagItem from 'components/common/TagItem';
import { escapeForUrl } from 'libs/utils';
import { UserInfo } from 'store/types/auth.types';
import { mediaQuery } from 'components/layout/responsive';

const MarkdownEditorWrite = dynamic(() => import('components/write/MarkdownEditorWrite'), { ssr: false });

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

	${mediaQuery(768)} {
		display: none;
	}
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

// type tagValueType = {
// 	props: {
// 		tagName: string;
// 	};
// };

type tagData = {
	idx: number;
	postId: string;
	tagName: string;
};

function MarkdownEditorContainer() {
	// const { postId, isTemp, initialBody } = useSelector((root: RootState) => root.write);
	const [markdownText, setMarkdownText] = useState('');
	const [title, setTitle] = useState('');
	const [tagItemList, setTagItemList] = useState([]);
	const [tagName, setTagName] = useState('');
	const [kinds, setKinds] = useState('front-end');
	const [slugUrl, setSlugUrl] = useState(title);
	const [thumbnailImage, setThumbnailAddress] = useState('');
	const [postIntro, setPostIntro] = useState('');
	const [isEdit, setIsEdit] = useState(false);

	const [isOpenModal, modalToggle] = useToggle(false);
	const [isPublic, isPublicToggle] = useToggle(true);
	const [, , onCreatePost, ,] = useRequest(requestCreatePost, true);
	const [, , onUpdatePost, ,] = useRequest(requestUpdatePostForTemp, true);
	const [, , onPublishPost, ,] = useRequest(requestPublishPost);

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
			if (!thumbnailImage) setThumbnailAddress(imageAddress);
		},
		[markdownText, uploadImageUtil]
	);

	const handleThumbnailImage = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			const imageFile = event.target.files;
			const imageAddress = await uploadImageUtil(imageFile);

			setThumbnailAddress(imageAddress);
		},
		[uploadImageUtil]
	);

	const deleteTag = (tag?: string) => {
		const newTags = tagItemList.filter((t) => t !== tag);

		setTagItemList(newTags);
	};

	const addTag = useCallback(async () => {
		if (tagName.length === 0) return;

		let checkIsSame = false;

		tagItemList.forEach((tagValue: string) => {
			if (tagName === tagValue) {
				checkIsSame = true;
			}
		});
		if (checkIsSame) {
			setTagName('');
			return;
		}

		const tagList: any = [...tagItemList];

		tagList.push(tagName);
		setTagItemList(tagList);

		setTagName('');
	}, [tagItemList, tagName]);

	const tagInputOnChage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setTagName(event.target.value);
	}, []);

	const handleUrl = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length === 0) {
			setSlugUrl('/');

			return;
		}
		setSlugUrl(event.target.value);
	}, []);

	const handleTagInputKeypress = useCallback(
		async (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				await addTag();
			}
		},
		[addTag]
	);

	const settingDefaultIntro = useCallback(() => {
		let sliced;
		remark()
			.use(strip)
			.process(markdownText.replace(/#(.*?)\n/g, ''), (err: any, file: any) => {
				if (err) return;
				const text = String(file);
				sliced = text.replace(/\n/g, '').slice(0, 150);
			});

		return sliced;
	}, [markdownText]);

	const onTemporaryStorage = useCallback(async () => {
		let toastMassege = '';
		const qsId = router.query.id;

		const tags: Array<string> = [];
		tagItemList.forEach((tag: string) => {
			tags.push(tag);
		});

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
				tags,
				token,
			} as CreatePost;
			const response = await onCreatePost(req);
			const { id } = response.data;
			dispatch(setWritePostId(id));
			router.replace(`/write?id=${id}`);

			toastMassege = '임시저장 완료';

			toast.success(toastMassege, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});

			return;
		}

		if (qsId) {
			if (title.length === 0 || markdownText.length === 0) {
				toastMassege = '제목 혹은 내용이 비어있습니다.';
				toast.error(toastMassege, {
					position: toast.POSITION.BOTTOM_RIGHT,
				});

				return;
			}

			const token = getStorage('tech-token');
			const req = {
				id: qsId,
				title,
				contents: markdownText,
				tags,
				thumbnailAddress: thumbnailImage,
				token,
			} as PostUpdate;
			await onUpdatePost(req);
			toastMassege = '임시저장 완료';

			toast.success(toastMassege, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	}, [dispatch, markdownText, onCreatePost, onUpdatePost, router, tagItemList, title, thumbnailImage]);

	const onSavePost = useCallback(async () => {
		let { id } = router.query;

		const token = getStorage('tech-token');
		const userInfo = getStorage('user-info') as UserInfo;
		let reqSlugUrl;

		if (slugUrl === '/') {
			reqSlugUrl = `/${userInfo.memberId}/${escapeForUrl(title)}`;
		} else {
			reqSlugUrl = `/${userInfo.memberId}/${escapeForUrl(slugUrl)}`;
		}

		const tags: Array<string> = [];
		tagItemList.forEach((tag: string) => {
			tags.push(tag);
		});

		if (!id) {
			const saveReq = {
				title,
				contents: markdownText,
				token,
				tags,
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

		if (isEdit) {
			const req = {
				id,
				title,
				contents: markdownText,
				tags,
				thumbnailAddress: thumbnailImage,
				token,
			} as PostUpdate;
			await onUpdatePost(req);
		}

		let publishReq;

		if (!postIntro) {
			const intro = await settingDefaultIntro();

			publishReq = {
				id,
				kinds,
				slugUrl: reqSlugUrl,
				category: 'blog',
				thumbnailAddress: thumbnailImage,
				intro,
				tags,
				token,
				publishType,
			};
		} else {
			publishReq = {
				id,
				kinds,
				slugUrl: reqSlugUrl,
				category: 'blog',
				thumbnailAddress: thumbnailImage,
				intro: postIntro,
				tags,
				token,
				publishType,
			};
		}

		await onPublishPost(publishReq);
		dispatch(setWritePostId(''));

		if (isEdit) router.back();
		else router.push('/');
	}, [
		dispatch,
		isPublic,
		kinds,
		markdownText,
		onCreatePost,
		onPublishPost,
		setPostIntro,
		postIntro,
		router,
		slugUrl,
		tagItemList,
		thumbnailImage,
		title,
	]);

	const handleTitleLength = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length <= 50) {
			setTitle(event.target.value);
			setSlugUrl(`/${event.target.value}`);
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

	const handlePublicState = (publicState: boolean) => {
		if ((isPublic && publicState) || (!isPublic && !publicState)) {
			return;
		}
		isPublicToggle();
	};

	useEffect(() => {
		const qsId = router.query.id;
		if (qsId) {
			const req = {
				id: qsId,
			};

			getLastPost(req);
		}
	}, [getLastPost, router.query.id]);

	useEffect(() => {
		const isUpdate = router.query.update;
		if (isUpdate) {
			setIsEdit(true);
		}
	}, [router]);

	useEffect(() => {
		if (lastPostData) {
			const initTagList: any = lastPostData.data.post.tagList.tagData;
			const tags: any = [];

			initTagList.forEach((tagValue: tagData) => {
				tags.push(tagValue.tagName);
			});
			const initUrl = lastPostData.data.post.url ? `/${lastPostData.data.post.url.split('/')[2]}` : ``;

			setThumbnailAddress(lastPostData.data.post.thumbnailAddress);
			setTagItemList(tags);
			setTitle(lastPostData.data.post.title);
			setSlugUrl(initUrl);
			setMarkdownText(lastPostData.data.post.contents);
		}
	}, [lastPostData]);

	useEffect(() => {
		if (!slugUrl) {
			setSlugUrl(`/${title}`);
		}
	}, [title, slugUrl]);

	useEffect(() => {
		const changed = !shallowEqual(title, markdownText);

		if (changed) {
			const timeId = setTimeout(() => {
				if (title.length === 0 || markdownText.length === 0) return;
				onTemporaryStorage();
			}, 10000);

			return () => {
				clearTimeout(timeId);
			};
		}
	}, [markdownText, onTemporaryStorage, title]);

	useEffect(() => {
		const token = getStorage('tech-token');

		if (!token) {
			router.push('/');
		}
	}, [router]);

	return (
		<>
			<Head>
				<title>{title ? `(작성중) ${title}` : '게시글 작성'}</title>
			</Head>
			<PostPublishModal
				isOpen={isOpenModal}
				slugUrl={slugUrl}
				modalToggle={modalToggle}
				onPublishPost={onSavePost}
				isEdit={isEdit}
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
					<TagGroup>
						{tagItemList.map((tag: string) => {
							return <TagItem deleteTag={deleteTag} key={tag} tagName={tag} isLink={false} />;
						})}
					</TagGroup>
					<MarkdownEditorWrite
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
					<MarkdownRenderer markdown={markdownText} mode="write" />
				</RendererWrap>
			</MarkdownEditorTemplate>
		</>
	);
}

export default MarkdownEditorContainer;
