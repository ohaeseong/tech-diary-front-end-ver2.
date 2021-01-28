import React from 'react';
import styled from '@emotion/styled';
import CodeMirror, { EditorFromTextArea } from 'codemirror';

const ContentsEditorTextarea = styled.textarea`
	width: 100%;
	height: 100%;
	resize: none;
	border: none;
    font-family: 'Spoqa Han Sans Thin';
    font-size: 1rem;
`;

function ContentsEditor() {
	return <ContentsEditorTextarea></ContentsEditorTextarea>;
}

export default ContentsEditor;
