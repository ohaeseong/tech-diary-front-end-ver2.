import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PostEditorTool from 'components/write/PostEditorTool';
import MarkdownEditor from 'components/write/MarkdownEditor';
import LinkEditor from 'components/write/LinkEditor';

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

const LinkEditorWrap = styled.div<{
	addLinkPos: { left: string; top: string; right: string; bottom: string };
	addLinkIsDisplay: string;
}>`
	display: none;

	position: absolute;
	z-index: 1000;
	width: 15rem;

	${(props) =>
		props.addLinkIsDisplay &&
		`
			display: ${props.addLinkIsDisplay};
	`};

	${(props) =>
		props.addLinkPos.top &&
		`
			top: ${props.addLinkPos.top}px;
	`};

	${(props) =>
		props.addLinkPos.left &&
		`
			left: ${props.addLinkPos.left}px;
	`};

	${(props) =>
		props.addLinkPos.bottom &&
		`
			bottom: ${props.addLinkPos.bottom}px;
	`};

	${(props) =>
		props.addLinkPos.right &&
		`
			right: ${props.addLinkPos.right}px;
	`};
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
	const [linkUrl, setLinkUrl] = useState('');
	const [linkText, setLinkText] = useState('');

	const [addLinkPos, setAddLinkPos] = useState({
		top: '0rem',
		left: '0rem',
		bottom: '0rem',
		right: '0rem',
	});

	const [addLinkIsDisplay, setAddLinkIsDisplay] = useState('none');
	// const editorElement = React.createRef<HTMLTextAreaElement>();

	const handdleLinkUrl = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setLinkUrl(event.target.value);
	}, []);

	const handleLinkText = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setLinkText(event.target.value);
	}, []);

	const addLink = useCallback(() => {
		if (!codemirror) return;

		const { doc } = codemirror;
		const cursor = doc.getCursor();
		const cursorLine = cursor.line;

		let link;

		if (!linkText) {
			link = `[${linkUrl}](${linkUrl})`;
		} else {
			link = `[${linkText}](${linkUrl})`;
		}

		doc.replaceSelection(` ${link}`);

		setLinkText('');
		setLinkUrl('');
		setAddLinkIsDisplay('none');
	}, [codemirror, linkText, linkUrl]);

	const handleLinkKeyEvent = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				addLink();
			}
		},
		[addLink]
	);

	const closeAddLink = useCallback(() => {
		setLinkText('');
		setLinkUrl('');
		setAddLinkIsDisplay('none');
	}, []);

	const handleToolbarClick = (mode: string) => {
		if (!codemirror) return;

		const { doc } = codemirror;
		const cursor = doc.getCursor();
		const cursorLine = cursor.line;
		const cursorPos = codemirror.cursorCoords(cursor);
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
			case 'LINK':
				setAddLinkPos({
					left: cursorPos.left,
					right: cursorPos.right,
					top: cursorPos.top + 30,
					bottom: cursorPos.bottom,
				});

				setAddLinkIsDisplay('block');
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

	// useEffect(() => {
	// 	document.body.addEventListener('click', closeAddLink);

	// 	return () => document.body.removeEventListener('click', closeAddLink);
	// }, [closeAddLink]);

	return (
		<>
			{typeof window !== 'undefined' && (
				<>
					<LinkEditorWrap addLinkPos={addLinkPos} addLinkIsDisplay={addLinkIsDisplay}>
						<LinkEditor
							linkText={linkText}
							linkUrl={linkUrl}
							handleLinkText={handleLinkText}
							handleLinkUrl={handdleLinkUrl}
							handleLinkKeyEvent={handleLinkKeyEvent}
							addLink={addLink}
							onClose={closeAddLink}
						/>
					</LinkEditorWrap>
					<PostEditorTool
						onClick={handleToolbarClick}
						openModal={openModal}
						requestSave={requestSave}
						handleImage={handleImage}
					/>
					<TagInput
						placeholder="Enter를 눌러 tag를 추가해 보세요!"
						onChange={tagInputOnChage}
						onKeyPress={handleTagInputKeypress}
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

export default React.memo(MarkdownEditorWrite);
