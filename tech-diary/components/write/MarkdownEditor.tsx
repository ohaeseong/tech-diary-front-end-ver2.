import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import PostEditorTool from 'components/write/PostEditorTool';

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
		const cursor = doc.getCursor();
		const cursorLine = cursor.line;
		const line = doc.getLine(cursorLine);

		// heading text 처리 함수
		const handleReplaceText = (replaceLength: number, heading: number) => {
			const lineText = line.trim();
			const headingList = ['#', '##', '###', '####'];
			let replaceText = lineText.substring(replaceLength, lineText.length);
			if (replaceText[1] === ' ') {
				replaceText = lineText.substring(replaceLength + 1, lineText.length);
			}

			doc.replaceRange(
				`${headingList[heading - 1]} ${replaceText}\n`,
				{ line: cursorLine, ch: 0 },
				{ line: cursorLine + 1, ch: 0 }
			);
		};

		switch (mode) {
			case 'H1':
				// 드래그 한 text가 없을 경우
				if (!doc.getSelection()) {
					const lineText = line.trim();
					if (lineText.split(' ')[0]) {
						if (line.split(' ')[0] === '#') {
							return;
						}
						if (lineText.split(' ')[0] === '##') {
							handleReplaceText(2, 1);
						} else if (lineText.split(' ')[0] === '###') {
							handleReplaceText(3, 1);
						} else if (lineText.split(' ')[0] === '####') {
							handleReplaceText(4, 1);
						} else {
							doc.replaceRange(`# `, { line: cursorLine, ch: 0 }, { line: cursorLine, ch: 0 });
						}
					}

					if (!lineText) {
						doc.replaceRange(`# `, { line: cursorLine, ch: 0 }, { line: cursorLine, ch: 0 });
					}
				} else {
					// 드래그한 text가 있을 경우
					let selected = doc.getSelection();
					selected = selected.trim();

					if (selected.split(' ')[0]) {
						if (selected.split(' ')[0] === '#') {
							return;
						}
						if (selected.split(' ')[0] === '##') {
							handleReplaceText(2, 1);
						} else if (selected.split(' ')[0] === '###') {
							handleReplaceText(3, 1);
						} else if (selected.split(' ')[0] === '####') {
							handleReplaceText(4, 1);
						} else {
							doc.replaceSelection(`# ${doc.getSelection()}`);
						}
					}
				}
				break;
			case 'H2':
				if (!doc.getSelection()) {
					const lineText = line.trim();
					if (lineText.split(' ')[0]) {
						if (line.split(' ')[0] === '##') {
							return;
						}
						if (lineText.split(' ')[0] === '#') {
							handleReplaceText(2, 2);
						} else if (lineText.split(' ')[0] === '###') {
							handleReplaceText(3, 2);
						} else if (lineText.split(' ')[0] === '####') {
							handleReplaceText(4, 2);
						} else {
							doc.replaceRange(`## `, { line: cursorLine, ch: 0 }, { line: cursorLine, ch: 0 });
						}
					}

					if (!lineText) {
						doc.replaceRange(`## `, { line: cursorLine, ch: 0 }, { line: cursorLine, ch: 0 });
					}
				} else {
					let selected = doc.getSelection();
					selected = selected.trim();

					if (selected.split(' ')[0]) {
						if (selected.split(' ')[0] === '##') {
							return;
						}
						if (selected.split(' ')[0] === '#') {
							handleReplaceText(2, 2);
						} else if (selected.split(' ')[0] === '###') {
							handleReplaceText(3, 2);
						} else if (selected.split(' ')[0] === '####') {
							handleReplaceText(4, 2);
						} else {
							doc.replaceSelection(`## ${doc.getSelection()}\n`);
						}
					}
				}
				break;
			case 'H3':
				if (!doc.getSelection()) {
					const lineText = line.trim();
					if (lineText.split(' ')[0]) {
						if (line.split(' ')[0] === '###') {
							return;
						}
						if (lineText.split(' ')[0] === '#') {
							handleReplaceText(2, 3);
						} else if (lineText.split(' ')[0] === '##') {
							handleReplaceText(3, 3);
						} else if (lineText.split(' ')[0] === '####') {
							handleReplaceText(4, 3);
						} else {
							doc.replaceRange(`### `, { line: cursorLine, ch: 0 }, { line: cursorLine, ch: 0 });
						}
					}

					if (!lineText) {
						doc.replaceRange(`### `, { line: cursorLine, ch: 0 }, { line: cursorLine, ch: 0 });
					}
				} else {
					let selected = doc.getSelection();
					selected = selected.trim();

					if (selected.split(' ')[0]) {
						if (selected.split(' ')[0] === '###') {
							return;
						}
						if (selected.split(' ')[0] === '#') {
							handleReplaceText(2, 3);
						} else if (selected.split(' ')[0] === '##') {
							handleReplaceText(3, 3);
						} else if (selected.split(' ')[0] === '####') {
							handleReplaceText(4, 3);
						} else {
							doc.replaceSelection(`### ${doc.getSelection()}`);
						}
					}
				}
				break;
			case 'H4':
				if (!doc.getSelection()) {
					const lineText = line.trim();
					if (lineText.split(' ')[0]) {
						if (line.split(' ')[0] === '####') {
							return;
						}
						if (lineText.split(' ')[0] === '#') {
							handleReplaceText(2, 4);
						} else if (lineText.split(' ')[0] === '##') {
							handleReplaceText(3, 4);
						} else if (lineText.split(' ')[0] === '###') {
							handleReplaceText(4, 4);
						} else {
							doc.replaceRange(`#### `, { line: cursorLine, ch: 0 }, { line: cursorLine, ch: 0 });
						}
					}

					if (!lineText) {
						doc.replaceRange(`#### `, { line: cursorLine, ch: 0 }, { line: cursorLine, ch: 0 });
					}
				} else {
					let selected = doc.getSelection();
					selected = selected.trim();

					if (selected.split(' ')[0]) {
						if (selected.split(' ')[0] === '####') {
							return;
						}
						if (selected.split(' ')[0] === '#') {
							handleReplaceText(2, 4);
						} else if (selected.split(' ')[0] === '##') {
							handleReplaceText(3, 4);
						} else if (selected.split(' ')[0] === '###') {
							handleReplaceText(4, 4);
						} else {
							doc.replaceSelection(`#### ${doc.getSelection()}`);
						}
					}
				}
				break;
			case 'BOLD':
				if (!doc.getSelection()) {
					doc.replaceSelection(`**text**`);
				} else {
					doc.replaceSelection(`**${doc.getSelection()}**`);
				}
				break;
			case 'ITALIC':
				if (!doc.getSelection()) {
					const cursorEnd = doc.getCursor('end');
					doc.replaceSelection(`_text_`);
					doc.setSelection({ line: cursorEnd.line, ch: cursorEnd + 1 }, { line: cursorEnd.line, ch: cursorEnd + 4 });
				} else {
					doc.replaceSelection(`_${doc.getSelection()}_`);
				}
				break;
			case 'DEL':
				if (!doc.getSelection()) {
					doc.replaceSelection(`~text~`);
				} else {
					doc.replaceSelection(`~${doc.getSelection()}~`);
				}
				break;
			case 'CODE':
				if (!doc.getSelection()) {
					doc.replaceSelection(' \n ```\ncode\n``` ');
				} else {
					doc.replaceSelection(`\`\`\`\n${doc.getSelection()}\n\`\`\``);
				}
				break;
			case 'QUOTE':
				if (!doc.getSelection()) {
					const lineText = line.trim();
					if (lineText === '>') {
						doc.replaceRange(``, { line: cursorLine, ch: 0 }, { line: cursorLine + 1, ch: 0 });
					} else {
						doc.replaceSelection('> ');
					}
				} else {
					// const text = doc.getSelection().split('\n');
					doc.replaceSelection(`> ${doc.getSelection()}`);
				}
				break;
			default:
				break;
		}

		setTimeout(() => {
			codemirror.focus();
			codemirror.setCursor({
				line: cursor.line,
			});
		}, 0);
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
								tabSize: 8,
								autofocus: true,
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
