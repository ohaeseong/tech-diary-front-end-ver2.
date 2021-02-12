import React from 'react';
import styled from '@emotion/styled';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { color } from 'styles/color';

const EditorToolWrap = styled.div`
	position: fixed;
	width: 100%;
	height: 3rem;
	border: 1px solid black;
`;

function MarkdownEditorTool() {
	return <EditorToolWrap></EditorToolWrap>;
}

const MarkdownEditorWrap = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	& > * {
		height: 100%;
	}

	.CodeMirror-lines {
		padding: 4px 0;
		padding-bottom: 3rem;
	}

	.CodeMirror {
		background-color: ${(props) => props.theme.white_1};
		min-height: 100%;
		font-size: 1.125rem;
		line-height: 1.5;
		word-break: break-all;
		white-space: pre-line;
		color: ${(props) => props.theme.black};

		& > * span {
			font-family: 'Spoqa Han Sans Thin';
			word-break: break-all;
			white-space: pre-line;
			color: ${(props) => props.theme.black};
			font-size: 1.125rem;
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
			color: ${(props) => props.theme.black};
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
		.cm-pre {
			background: ${(props) => props.theme.emphasis};
			padding: 2px 4px;
			font-size: 1rem;
			border-radius: 2px;
			font-style: normal;
			color: ${(props) => props.theme.black};
		}

		.cm-del {
			border: 1px solid ${(props) => props.theme.black};
		}

		.cm-url,
		.cm-link {
			color: ${(props) => props.theme.neon_2};
		}

		.cm-comment {
			white-space: pre-line;
		}

		.CodeMirror-placeholder {
			color: ${color.black};
			font-style: italic;
		}

		.cm-strong,
		.cm-em {
			color: ${(props) => props.theme.neon_2};
		}

		.CodeMirror-placeholder {
			font-family: 'Spoqa Han Sans Thin';
			color: ${(props) => props.theme.gray_3};
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
		<>
			<MarkdownEditorTool />
			<MarkdownEditorWrap>
				<CodeMirror
					value={markdownText}
					options={{
						mode: 'markdown',
						lineNumbers: false,
						placeholder: '블로그 작성...',
						lineWrapping: true,
					}}
					autoScroll
					onBeforeChange={(editor, data, value) => {
						setMarkdownText(value);
					}}
					editorDidMount={() => {
						import('codemirror/mode/markdown/markdown');
						import('codemirror/addon/display/placeholder');
						import('codemirror/mode/javascript/javascript');
						import('codemirror/mode/jsx/jsx');
					}}
				/>
			</MarkdownEditorWrap>
		</>
	);
}

export default MarkdownEditor;
