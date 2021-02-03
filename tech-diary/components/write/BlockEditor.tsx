import React, { RefObject, useCallback, useState } from 'react';
import EditableBlock from 'components/write/EditableBlock';

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

function BlockEditor() {
	const [blocks, setBlocks] = useState([initialBlock]);

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
		<div>
			{blocks.map((block) => {
				return (
					<EditableBlock
						key={block.id}
						id={block.id}
						html={block.html}
						tag={block.tag}
						addBLock={addBlockHandler}
						updatePage={updatePageHandler}
						deleteBlockHandler={deleteBlockHandler}
					/>
				);
			})}
		</div>
	);
}

export default BlockEditor;
