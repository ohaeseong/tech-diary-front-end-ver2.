import React from 'react';
import styled from '@emotion/styled';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { color } from 'styles/color';

const MarkdownEditorWrap = styled.div`
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	& > p {
		font-size: 1.125rem;
		font-family: 'Spoqa Han Sans Thin';
	}

	& > * {
		min-height: 100%;
	}

	& > .wrapper {
		min-height: 0;
		padding-bottom: 4rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.CodeMirror-lines {
		padding: 4px 0;
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
		word-break: break-all;
		white-space: pre-line;
		color: ${(props) => props.theme.black};
		& > * span {
			font-family: 'Spoqa Han Sans Thin';
			word-break: break-all;
			white-space: pre-line;
		}

		& > * .cm-header,
		.cm-header-1,
		.cm-header-2,
		.cm-header-3,
		.cm-header-4,
		.cm-header-5,
		.cm-header-6 {
			font-family: 'Spoqa Han Sans Regular';
		}

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
			/* position: absolute;
			width: 100%; */
			/* margin: 2rem 0; */
			/* border-top: 0.1px solid ${(props) => props.theme.gray_2}; */
			/* color: #fff; */
			/* text-align: center; */

			/* & > * {
				display: none;
			} */
		}

		.cm-del {
			border: 1px solid black;
		}
		.CodeMirror-placeholder {
			color: ${color.black};
			font-style: italic;
		}
		.CodeMirror-scroll {
			overflow: hidden !important;
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
				autoScroll
				onBeforeChange={(editor, data, value) => {
					setMarkdownText(value);
				}}
				editorDidMount={() => {
					import('codemirror/mode/markdown/markdown');
				}}
			/>
		</MarkdownEditorWrap>
	);
}

export default MarkdownEditor;
