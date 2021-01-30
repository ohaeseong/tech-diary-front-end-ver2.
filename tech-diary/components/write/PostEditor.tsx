import React from 'react';
import styled from '@emotion/styled';
import TitleEditor from 'components/write/TitleEditor';
import MarkdownEditorContainer from 'container/postWrite/MarkdownEditor';

const EditorTemplate = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	background-color: ${(props) => props.theme.white_1};
`;

const EditorWrap = styled.div`
	display: flex;
	width: 45rem;
	padding: 0 5rem;
	min-height: 100vh;
	flex-direction: column;
	margin-left: 3rem;
	background-color: ${(props) => props.theme.white_1};
	box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.12);

	& > * {
		font-family: 'Spoqa Han Sans Thin';
	}
`;

function PostEditor() {
	return (
		<EditorTemplate>
			<EditorWrap>
				<TitleEditor />
				<MarkdownEditorContainer />
			</EditorWrap>
		</EditorTemplate>
	);
}

export default PostEditor;
