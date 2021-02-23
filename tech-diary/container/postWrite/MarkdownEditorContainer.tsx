import React, { ChangeEvent, useCallback, KeyboardEvent, useState, useEffect } from 'react';
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
import { requestCreatePost, requestGetDetail, requestUpdatePostForTemp } from 'libs/repository';
import { getStorage } from 'libs/storage';
import { setWritePostId } from 'store/modules/write';
import { RootState } from 'store/modules';
import { useRouter } from 'next/router';
import { CreatePost, PostDetail, PostUpdate } from 'store/types/post.types';
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

	const [isOpenModal, modalToggle] = useToggle(false);
	const [, , onCreatePost, ,] = useRequest(requestCreatePost, true);
	const [, , onUpdatePost, ,] = useRequest(requestUpdatePostForTemp, true);
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
		if (!postId && !qsId) {
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
		}

		if (qsId) {
			const token = getStorage('tech-token');
			const req = {
				id: qsId,
				title,
				contents: markdownText,
				token,
			} as PostUpdate;
			const response = await onUpdatePost(req);
		}
	}, [dispatch, markdownText, onCreatePost, onUpdatePost, postId, qsId, router, title]);

	const onSavePost = useCallback(() => {}, []);

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
			<Toast />
			<PostPublishModal isOpen={isOpenModal} modalToggle={modalToggle} onSavePost={onSavePost} />
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
