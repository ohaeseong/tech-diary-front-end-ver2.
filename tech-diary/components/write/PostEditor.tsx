import React from 'react';
import styled from '@emotion/styled';
import TitleEditor from 'components/write/TitleEditor';
import MarkdownEditorContainer from 'container/postWrite/MarkdownEditorContainer';

const EditorTemplate = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	background-color: ${(props) => props.theme.white_1};
`;

function PostEditor() {
	return (
		<EditorTemplate>
			<MarkdownEditorContainer />
		</EditorTemplate>
	);
}

export default PostEditor;
