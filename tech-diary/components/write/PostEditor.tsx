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

const EditorWrapForMarkdown = styled.div`
	display: flex;
	padding: 0 5rem;
	min-height: 100vh;
	flex-direction: column;
	margin-left: 3rem;
	background-color: ${(props) => props.theme.white_1};
	box-shadow: 0 2px 6px 0 ${(props) => props.theme.shadow};

	& > * {
		font-family: 'Spoqa Han Sans Thin';
	}
`;

function PostEditor() {
	return (
		<EditorTemplate>
			<MarkdownEditorContainer />
		</EditorTemplate>
	);
}

export default PostEditor;
