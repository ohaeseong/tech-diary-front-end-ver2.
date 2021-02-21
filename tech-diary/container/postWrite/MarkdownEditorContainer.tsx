import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import MarkdownEditor from 'components/write/MarkdownEditor';
import styled from '@emotion/styled';
import TitleEditor from 'components/write/TitleEditor';
import MarkdownRenderer from 'components/common/MarkdownRenderer';
import PostPublishModal from 'components/write/PostPublishModal';
import useToggle from 'libs/hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { DROP_TOAST, SHOW_TOAST } from 'store/modules/toast';
import Toast from 'components/common/Toast';
import useRequest from 'libs/hooks/useRequest';
import { requestCreatePost } from 'libs/repository';
import { getStorage } from 'libs/storage';
import { setWritePostId } from 'store/modules/write';
import { RootState } from 'store/modules';
import { useRouter } from 'next/router';
import { CreatePost, PostDetail } from 'store/types/post.types';

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

function MarkdownEditorContainer() {
	const { postId } = useSelector((root: RootState) => root.write);
	const [markdownText, setMarkdownText] = useState('');
	const [title, setTitle] = useState('');

	const [isOpenModal, modalToggle] = useToggle(false);
	const [createPostReturnData, , onCreatePost, ,] = useRequest(requestCreatePost, true);
	const router = useRouter();
	const dispatch = useDispatch();

	const onTemporaryStorage = useCallback(async () => {
		if (!postId) {
			const token = getStorage('tech-token');
			const req = {
				title,
				contents: markdownText,
				token,
			} as CreatePost;
			const response = await onCreatePost(req);
			const { id } = response.data;
			dispatch(setWritePostId(id));
			router.push(`/blog/write?id=${id}`);
		}

		// console.log(postId);
	}, [dispatch, markdownText, onCreatePost, postId, router, title]);

	const handleTitleLength = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length <= 50) {
			setTitle(event.target.value);
		}
	}, []);

	const openModal = useCallback(() => {
		if (title.length === 0 || markdownText.length === 0) {
			dispatch({
				type: SHOW_TOAST,
				payload: {
					text: '제목 또는 내용을 채워주세요.',
				},
			});
			setTimeout(() => {
				dispatch({
					type: DROP_TOAST,
				});
			}, 2000);

			return;
		}
		if (!isOpenModal) {
			modalToggle();
		}
	}, [dispatch, isOpenModal, markdownText.length, modalToggle, title.length]);

	return (
		<>
			<Toast />
			<PostPublishModal isOpen={isOpenModal} modalToggle={modalToggle} />
			<MarkdownEditorTemplate>
				<EditorWrap>
					<TitleEditor title={title} onChange={handleTitleLength} />
					<MarkdownEditor
						markdownText={markdownText}
						setMarkdownText={setMarkdownText}
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
