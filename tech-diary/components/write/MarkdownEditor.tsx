import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
// import { Controlled as CodeMirror } from 'react-codemirror2';

import { color } from 'styles/color';
// import PostEditorTool from 'components/write/PostEditorTool';
const PostEditorTool = dynamic(() => import('../write/PostEditorTool'), { ssr: false });

const CodeMirror = dynamic(() => import('../common/CodeMirrorComponent'), { ssr: false });

const MarkdownEditorWrap = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
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

const TagInput = styled.input`
	padding: 0.5rem 0.5rem;
	width: 100%;
	font-size: 1rem;
	margin-top: 0.5rem;
	border: 0px solid ${(props) => props.theme.gray_2};
	background-color: ${(props) => props.theme.white};
	color: ${(props) => props.theme.black};
	font-family: 'Spoqa Han Sans Thin';
	border-radius: 5px;
`;

type Props = {
	requestSave: () => void;
	setMarkdownText: (dispatch: string) => void;
	tagInputOnChage: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleTagInputKeypress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	handleImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
	tagName: string;
	markdownText: string;
	openModal: () => void;
};

function MarkdownEditor({
	setMarkdownText,
	openModal,
	requestSave,
	handleTagInputKeypress,
	tagInputOnChage,
	handleImage,
	tagName,
	markdownText,
}: Props) {
	const [codemirror, setCodemirror] = useState<any>();
	const editorElement = React.createRef<HTMLTextAreaElement>();

	const handleToolbarClick = (mode: string) => {
		if (!codemirror) return;

		const { doc } = codemirror;

		switch (mode) {
			case 'H1':
				doc.replaceSelection(` \n # Heading1`);
				break;
			case 'H2':
				doc.replaceSelection(` \n ## Heading2`);
				break;
			case 'H3':
				doc.replaceSelection(` \n ### Heading3`);
				break;
			case 'H4':
				doc.replaceSelection(` \n #### Heading4`);
				break;
			case 'BOLD':
				doc.replaceSelection(` \n **text**`);
				break;
			case 'ITALIC':
				doc.replaceSelection(` \n _text_`);
				break;
			case 'DEL':
				doc.replaceSelection(` \n ~text~`);
				break;
			case 'CODE':
				doc.replaceSelection(' \n ```\ncode\n``` ');
				break;
			default:
				break;
		}
	};

	return (
		<>
			{typeof window !== 'undefined' && (
				<>
					<PostEditorTool
						onClick={handleToolbarClick}
						openModal={openModal}
						requestSave={requestSave}
						handleImage={handleImage}
					/>
					<TagInput
						placeholder="Enter를 눌러 tag를 추가해 보세요!"
						onChange={tagInputOnChage}
						onKeyDown={handleTagInputKeypress}
						value={tagName}
					/>
					<MarkdownEditorWrap>
						<CodeMirror
							value={markdownText}
							options={{
								mode: 'markdown',
								lineNumbers: false,
								placeholder: '블로그 작성...',
								lineWrapping: true,
							}}
							onBeforeChange={(_editor, _data, value) => {
								setMarkdownText(value);
							}}
							editorDidMount={(editor) => {
								setCodemirror(editor);
							}}
							editorWillUnmount={() => {
								import('codemirror/mode/markdown/markdown');
								import('codemirror/addon/display/placeholder');
								import('codemirror/mode/javascript/javascript');
								import('codemirror/mode/jsx/jsx');
							}}
						/>
						<textarea ref={editorElement} style={{ display: 'none' }} />
					</MarkdownEditorWrap>
				</>
			)}
		</>
	);
}

export default MarkdownEditor;
