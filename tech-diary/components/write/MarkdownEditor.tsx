import React from 'react';
import styled from '@emotion/styled';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const MarkdownEditorTextarea = styled.textarea`
	width: 100%;
	height: 100%;
	resize: none;
	border: none;
	font-family: 'Spoqa Han Sans Thin';
	font-size: 1rem;
`;

const MarkdownEditorWrap = styled.section`
	width: 100%;
	/* height: 100%; */

	border: 1px solid black;

	/* & > * {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
	} */
`;

type Props = {
	setMarkdownText: (dispatch: string) => void;
	markdownText: string;
};

function MarkdownEditor({ setMarkdownText, markdownText }: Props) {
	return (
		<>
			<CodeMirror
				value={markdownText}
				options={{
					mode: 'markdown',
					theme: 'none',
					lineNumbers: false,
				}}
				onBeforeChange={(editor, data, value) => {
					setMarkdownText(value);
				}}
				onChange={(editor, data, value) => {
					console.log('controlled', { value });
				}}
				editorDidMount={() => {
					import('codemirror/mode/markdown/markdown');
				}}
			/>
		</>
	);
}

export default MarkdownEditor;
