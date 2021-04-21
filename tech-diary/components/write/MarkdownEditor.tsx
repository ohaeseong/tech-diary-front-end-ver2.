import React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

const CodeMirror = dynamic(() => import('../common/CodeMirrorComponent'), { ssr: false });
const MarkdownEditorWrap = styled.div<{ minHeight?: string }>`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	position: relative;

	& > * {
		height: 100%;
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
			/* white-space: pre-line; */
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

		.cm-strong {
			color: ${(props) => props.theme.neon_2};
		}

		.CodeMirror-placeholder {
			font-family: 'Spoqa Han Sans Thin';
			color: ${(props) => props.theme.gray_3};
			font-style: italic;
		}
	}
`;

type Props = {
	onChangeMarkdownText: (value: string) => void;
	setCodemirror?: (cm: any) => void;
	minHeight?: string;
	option: any;
	markdownText: string;
};

function MarkdownEditor({ markdownText, option, minHeight, onChangeMarkdownText, setCodemirror }: Props) {
	return (
		<>
			<MarkdownEditorWrap minHeight={minHeight}>
				<CodeMirror
					value={markdownText}
					options={option}
					onBeforeChange={(_editor, _data, value) => {
						onChangeMarkdownText(value);
					}}
					editorDidMount={(editor) => {
						if (!setCodemirror) return;
						setCodemirror(editor);
					}}
					editorWillUnmount={() => {
						import('codemirror/mode/markdown/markdown');
						import('codemirror/addon/display/placeholder');
						import('codemirror/mode/javascript/javascript');
						import('codemirror/mode/jsx/jsx');
					}}
				/>
				<textarea style={{ display: 'none' }} />
			</MarkdownEditorWrap>
		</>
	);
}

export default MarkdownEditor;
