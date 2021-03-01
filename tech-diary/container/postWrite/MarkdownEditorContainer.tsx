import React, { ChangeEvent, useCallback, useState, useEffect } from 'react';
import MarkdownEditor from 'components/write/MarkdownEditor';
import styled from '@emotion/styled';
import TitleEditor from 'components/write/TitleEditor';
import MarkdownRenderer from 'components/common/MarkdownRenderer';
import PostPublishModal from 'components/write/PostPublishModal';
import useToggle from 'libs/hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { DROP_TOAST, SHOW_TOAST } from 'store/modules/toast';
import useRequest from 'libs/hooks/useRequest';
import { requestCreatePost, requestGetDetail, requestPublishPost, requestUpdatePostForTemp } from 'libs/repository';
import { getStorage } from 'libs/storage';
import { setWritePostId } from 'store/modules/write';
import { RootState } from 'store/modules';
import { useRouter } from 'next/router';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreatePost, PostUpdate } from 'store/types/post.types';
import TagGroup from 'components/common/TagGroup';
import TagItem from 'components/common/TagItem';

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

const TagInput = styled.input`
	padding: 0.5rem 0.5rem;
	width: 100%;
	font-size: 1rem;
	margin-top: 0.5rem;
	border: 0px solid ${(props) => props.theme.gray_2};
	font-family: 'Spoqa Han Sans Thin';
	border-radius: 5px;
`;

type tagValueType = {
	props: {
		tagName: string;
	};
};

function MarkdownEditorContainer() {
	const { postId } = useSelector((root: RootState) => root.write);
	const [markdownText, setMarkdownText] = useState('');
	const [title, setTitle] = useState('');
	const [isTemp, setIsTemp] = useState(false);
	const [tagItemList, setTagItemList] = useState([]);
	const [tagName, setTagName] = useState('');
	const [kinds, setKinds] = useState('front-end');

	const [isOpenModal, modalToggle] = useToggle(false);
	const [, , onCreatePost, ,] = useRequest(requestCreatePost, true);
	const [, , onUpdatePost, ,] = useRequest(requestUpdatePostForTemp, true);
	const [, , onPublishPost, ,] = useRequest(requestPublishPost);
	const [lastPostData, , getLastPost, ,] = useRequest(requestGetDetail, true);
	const router = useRouter();
	const dispatch = useDispatch();
	const qsId = router.query.id;

	const addTag = useCallback(() => {
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
		setTagName('');
	}, [tagItemList, tagName]);

	const tagInputOnChage = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
		setTagName(event.target.value);
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
		console.log(postId, qsId);

		if (!postId || !qsId) {
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
				token,
			} as PostUpdate;
			const response = await onUpdatePost(req);
			toastMassege = '임시저장 완료';
		}

		toast.success(toastMassege, {
			position: toast.POSITION.BOTTOM_RIGHT,
		});
	}, [dispatch, markdownText, onCreatePost, onUpdatePost, postId, qsId, router, title]);

	const onSavePost = useCallback(async () => {
		console.log(postId);
		let id = '';

		const token = getStorage('tech-token');

		if (!postId || !qsId) {
			const saveReq = {
				title,
				contents: markdownText,
				token,
			} as CreatePost;
			const response = await onCreatePost(saveReq);
			id = response.data.id;
		}

		const publishReq = {
			id: postId || id,
			kinds,
			category: 'blog',
			token,
		};
		await onPublishPost(publishReq);

		router.push('/');
	}, [kinds, markdownText, onCreatePost, onPublishPost, postId, qsId, router, title]);

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

	useEffect(() => {
		if (qsId) {
			const req = {
				id: qsId,
			};

			getLastPost(req);
		}
	}, [getLastPost, qsId]);

	useEffect(() => {
		if (lastPostData) {
			setTitle(lastPostData.data.post.title);
			setMarkdownText(lastPostData.data.post.contents)
		}
	}, [lastPostData]);

	return (
		<>
			<PostPublishModal
				isOpen={isOpenModal}
				modalToggle={modalToggle}
				onSavePost={onSavePost}
				handleKindsValue={handleKindsValue}
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
