import React, { useState } from 'react';
import styled from '@emotion/styled';
import PostEditorTool from 'components/write/PostEditorTool';
import MarkdownEditor from 'components/write/MarkdownEditor';

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

function MarkdownEditorWrite({
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
	// const editorElement = React.createRef<HTMLTextAreaElement>();

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

					// setTimeout(() => {
					// 	codemirror.focus();
					// 	codemirror.setCursor({
					// 		line: cursor.line,
					// 		ch: cursor.ch + 1,
					// 	});
					// }, 0);
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
					<MarkdownEditor
						markdownText={markdownText}
						option={{
							mode: 'markdown',
							lineNumbers: false,
							placeholder: '블로그 작성...',
							lineWrapping: true,
							tabSize: 8,
							autofocus: true,
						}}
						onChangeMarkdownText={setMarkdownText}
						setCodemirror={setCodemirror}
					/>
				</>
			)}
		</>
	);
}

export default MarkdownEditorWrite;
