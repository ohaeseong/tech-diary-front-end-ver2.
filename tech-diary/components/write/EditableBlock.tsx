import React, { useState, KeyboardEvent, RefObject, createRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import styled from '@emotion/styled';

const ContentEditableWrap = styled(ContentEditable)`
	color: ${(props) => props.theme.black};
	padding: 0.3rem;
	outline: none;
`;

type InitialBlockType = {
	id: string;
	html: string;
	tag: string;
};

type CurrentBlockType = {
	id: string;
	ref: RefObject<HTMLElement>;
};

type Props = {
	updatePage: (updatedBlock: InitialBlockType) => void;
	addBLock: (currentBlock: CurrentBlockType) => void;
	deleteBlockHandler: (currentBlock: CurrentBlockType) => void;

	html: string;
	tag: string;
	id: string;
};

function EditableBlock({ html, tag, id, updatePage, addBLock, deleteBlockHandler }: Props) {
	const [tagState, setTagState] = useState(tag);
	const [htmlState, setHtmlState] = useState(html);
	const [previousKey, setPreviousKey] = useState('');
	const contentEditable = createRef() as RefObject<HTMLElement>;

	const onChangeHandler = (event: ContentEditableEvent) => {
		setHtmlState(event.target.value);
	};

	const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			if (previousKey !== 'Shift') {
				event.preventDefault();
				addBLock({ id, ref: contentEditable.current });
			}
		}

		if (event.key === 'Backspace' && !htmlState) {
			event.preventDefault();
			deleteBlockHandler({ id, ref: contentEditable.current });
		}

		setPreviousKey(event.key);
	};

	return (
		<ContentEditableWrap
			className="Block"
			aria-valuetext="test"
			innerRef={contentEditable}
			html={htmlState}
			tagName={tagState}
			onChange={onChangeHandler}
			onKeyDown={onKeyDownHandler}
		/>
	);
}

export default EditableBlock;
