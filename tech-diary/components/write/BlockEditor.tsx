import React from 'react';
// import EditableBlock from 'components/write/EditableBlock';

// type BlockType = {
// 	id: string;
// 	html: string;
// 	tag: string;
// };

// type InitialBlockType = {
// 	id: string;
// 	html: string;
// 	tag: string;
// };

// type CurrentBlockType = {
// 	id: string;
// 	ref: RefObject<HTMLElement>;
// };

// type Props = {
// 	blocks: Array<BlockType>;
// 	// updatePageHandler: (updatedBlock: InitialBlockType) => void;
// 	addBlockHandler: (currentBlock: CurrentBlockType) => void;
// 	deleteBlockHandler: (currnetBlock: CurrentBlockType) => void;
// };

function BlockEditor() {
	return (
		<div>
			{/* {blocks.map((block) => {
				return (
					<EditableBlock
						key={block.id}
						id={block.id}
						html={block.html}
						tag={block.tag}
						addBLock={addBlockHandler}
						// updatePage={updatePageHandler}
						deleteBlockHandler={deleteBlockHandler}
					/>
				);
			})} */}
		</div>
	);
}

export default BlockEditor;
