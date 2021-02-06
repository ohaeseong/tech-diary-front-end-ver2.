import React, { ChangeEvent, RefObject, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import BlockEditor from 'components/write/BlockEditor';
import TitleEditor from 'components/write/TitleEditor';

const EditorWrap = styled.div`
	display: flex;
	width: 50rem;
	padding: 0 5rem;
	min-height: 100vh;
	flex-direction: column;
	margin-left: 3rem;
	background-color: ${(props) => props.theme.white_1};
	box-shadow: 0 2px 6px 0 ${(props) => props.theme.shadow};

	& > * {
		font-family: 'Spoqa Han Sans';
	}
`;

const uid = () => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initialBlock = {
	id: uid(),
	html: '',
	tag: 'p',
};

type InitialBlockType = {
	id: string;
	html: string;
	tag: string;
};

type CurrentBlockType = {
	id: string;
	ref: RefObject<HTMLElement>;
};

function BlockEditorContainer() {
	const [title, setTitle] = useState('');
	const [blocks, setBlocks] = useState([initialBlock]);

	const handleTitleLength = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length <= 50) {
			setTitle(event.target.value);
		}
	}, []);

	const updatePageHandler = useCallback(
		(updatedBlock: InitialBlockType) => {
			const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
			const updatedBlocks = [...blocks];
			updatedBlocks[index] = {
				...updatedBlocks[index],
				tag: updatedBlock.tag,
				html: updatedBlock.html,
			};

			setBlocks(updatedBlocks);
		},
		[blocks]
	);

	const addBlockHandler = useCallback(
		async (currentBlock: CurrentBlockType) => {
			const newBlock = { id: uid(), html: '', tag: 'p' };
			const index = blocks.map((b) => b.id).indexOf(currentBlock.id);

			const updatedBlocks = [...blocks];
			updatedBlocks.splice(index + 1, 0, newBlock);
			await setBlocks(updatedBlocks);

			currentBlock.ref.nextElementSibling.focus();
		},
		[blocks]
	);

	const deleteBlockHandler = useCallback(
		async (currentBlock: CurrentBlockType) => {
			const previousBlock = currentBlock.ref.previousElementSibling;
			if (previousBlock) {
				const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
				const updatedBlocks = [...blocks];
				updatedBlocks.splice(index, 1);
				await setBlocks(updatedBlocks);
				previousBlock.focus();
			}
		},
		[blocks]
	);

	return (
		<EditorWrap>
			<TitleEditor title={title} onChange={handleTitleLength} />
			<BlockEditor
				blocks={blocks}
				addBlockHandler={addBlockHandler}
				updatePageHandler={updatePageHandler}
				deleteBlockHandler={deleteBlockHandler}
			/>
		</EditorWrap>
	);
}

export default BlockEditorContainer;
