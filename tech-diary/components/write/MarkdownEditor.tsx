import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { color } from 'styles/color';

// require('codemirror/mode/markdown/markdown');

const MarkdownEditorTextarea = styled.textarea`
	width: 100%;
	height: 100%;
	resize: none;
	border: none;
	font-family: 'Spoqa Han Sans Thin';
	font-size: 1rem;
`;

const MarkdownEditorWrap = styled.div`
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	& > * {
		min-height: 100%;
	}

	&::-webkit-scrollbar {
		border-radius: 3px;
		width: 6px;
		&:hover {
			width: 16px;
		}
		background: ${color.gray_1};
	}

	&::-webkit-scrollbar-thumb {
		z-index: 100;
		background: ${color.gray_5};
		/* -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75); */
	}

	/* & > .wrapper {
		min-height: 0;
		padding-bottom: 4rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	} */

	.CodeMirror-lines {
		padding: 4px 0; /* Vertical padding around content */
		padding-bottom: 3rem;
	}

	.CodeMirror pre.CodeMirror-line,
	.CodeMirror pre.CodeMirror-line-like {
		/* padding: 0 3rem; Horizontal padding of content */
	}

	.CodeMirror {
		min-height: 100%;
		flex: 1;
		font-size: 1.125rem;
		line-height: 1.5;
		color: ${(props) => props.theme.black};
		font-family: 'Spoqa Han Sans Thin';

		.cm-header {
			line-height: 1.5;
			color: ${color.black};
		}
		.cm-header-1 {
			font-size: 2.5rem;
		}
		.cm-header-2 {
			font-size: 2rem;
		}
		.cm-header-3 {
			font-size: 1.5rem;
		}
		.cm-header-4,
		.cm-header-5,
		.cm-header-6 {
			font-size: 1.3125rem;
		}
		.cm-strong {
			font-family: 'Spoqa Han Sans Medium';
			font-weight: 400;
		}
		.cm-em {
			background: ${(props) => props.theme.emphasis};
			padding: 2px 4px;
			font-size: 1rem;
			border-radius: 2px;
			font-style: normal;
		}
		.cm-code {
			background-color: black;
		}
		.cm-hr {
			position: absolute;
			width: 100%;
			/* margin: 2rem 0; */
			border-top: 0.1px solid ${(props) => props.theme.gray_2};
			color: #fff;
			/* text-align: center; */

			& > * {
				display: none;
			}
		}
		.CodeMirror-placeholder {
			color: ${color.black};
			font-style: italic;
		}

		/* ${media.custom(767)} {
			font-size: 0.875rem;
			.cm-header-1 {
				font-size: 2rem;
			}
			.cm-header-2 {
				font-size: 1.5rem;
			}
			.cm-header-3 {
				font-size: 1.15rem;
			}
			.cm-header-4,
			.cm-header-5,
			.cm-header-6 {
				font-size: 1rem;
			}
		} */
	}
`;

type Props = {
	setMarkdownText: (dispatch: string) => void;
	markdownText: string;
};

function MarkdownEditor({ setMarkdownText, markdownText }: Props) {
	return (
		<MarkdownEditorWrap>
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
				editorDidMount={(editor) => {
					if (editor) {
						import('codemirror/mode/markdown/markdown');
					}
				}}
			/>
		</MarkdownEditorWrap>
	);
}

export default MarkdownEditor;
