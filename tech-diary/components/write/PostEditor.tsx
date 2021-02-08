import React from 'react';
import styled from '@emotion/styled';
import MarkdownEditorContainer from 'container/postWrite/MarkdownEditorContainer';
import BlockEditorContainer from 'container/postWrite/BlockEditorContainer';

const EditorTemplate = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	background-color: ${(props) => props.theme.white_1};
`;

function PostEditor() {
	const toggleEditor = false;
	return <EditorTemplate>{toggleEditor ? <MarkdownEditorContainer /> : <BlockEditorContainer />}</EditorTemplate>;
}

export default PostEditor;
