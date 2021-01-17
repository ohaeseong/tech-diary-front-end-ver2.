import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';
import Button from 'components/common/Button';
import { color } from 'styles/color';
import { requestWriteComment, useRequest } from 'libs/hooks/useRequest';

const PostCommentEditorTemplate = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 12rem;

	& > * {
		font-family: 'Spoqa Han Sans Medium';
	}
`;

const TextareaWrap = styled.div`
	padding: 1rem;

	border: 1px solid ${(props) => props.theme.gray_3};
`;

const EditorTextarea = styled(TextareaAutosize)`
	width: 100%;
	min-height: 6rem;
	box-sizing: inherit;

	font-family: 'Spoqa Han Sans Thin';
	font-size: 1rem;
	line-height: 1.7rem;
	overflow: hidden;
	border: none;
	resize: none;

	color: ${(props) => props.theme.gray_5};
	background-color: ${(props) => props.theme.white_1};

	&::placeholder {
		color: ${(props) => props.theme.gray_4};
	}
`;

const TextCount = styled.div`
	width: auto;
	height: 1rem;
	/* border: 1px solid black; */

	font-size: 0.8rem;
	padding-right: 0.5rem;
	padding-top: 0.8rem;

	color: ${(props) => props.theme.gray_3};
`;

const Bottom = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 3rem;

	white-space: pre-wrap;
`;

type Props = {
	handleCommentTextState: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	applyComment: () => void;

	commentText: string;
};

function PostCommentEditor({ commentText, handleCommentTextState, applyComment }: Props) {
	return (
		<PostCommentEditorTemplate>
			<TextareaWrap>
				<EditorTextarea value={commentText} onChange={handleCommentTextState} placeholder="댓글을 작성 해보세요!" />
			</TextareaWrap>
			<Bottom>
				<Button height="2.5rem" color={color.neon_2} margin="1rem 0.5rem" onClick={applyComment}>
					댓글 작성
				</Button>
				<TextCount>{commentText.length} / 1000</TextCount>
			</Bottom>
		</PostCommentEditorTemplate>
	);
}

export default React.memo(PostCommentEditor);
