import React, { useState, KeyboardEvent, RefObject, createRef, useEffect, useCallback } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import styled from '@emotion/styled';
import MenuItem from 'components/common/MenuItem';
import MenuSlider from 'components/common/MenuSlider';
import useMenuSliderHeight from 'libs/hooks/useMenuSliderHeight';
import tagItems from 'resource/editorTagMenus';

const ContentEditableWrap = styled(ContentEditable)`
	color: ${(props) => props.theme.black};
	padding: 0.3rem;
	outline: none;
	border: 1px solid ${(props) => props.theme.gray_2};;

	font-family: 'Spoqa Han Sans Thin';
	&:empty:before {
		content: attr(placeholder);
		color: grey;
		display: inline-block;
	}
`;

const TagMenuWrap = styled.div`
	position: absolute;
	/* top: 100px; */
	/* border: 1px solid black; */
`;

type TagInfo = {
	id: string;
	name: string;
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
	const [htmlBackUp, setHtmlBackUp] = useState('');
	const [previousKey, setPreviousKey] = useState('');
	const [placeholderText, setPlaceholderText] = useState(`Type '/' for commands`);
	const [menuHeight, menuToggle, closeMenu] = useMenuSliderHeight(150);
	const contentEditable = createRef() as RefObject<HTMLElement>;

	const onChangeHandler = (event: ContentEditableEvent) => {
		setHtmlState(event.target.value);
	};

	const tagSelectHandler = useCallback(
		(tagInfo: TagInfo) => {
			setHtmlState(htmlBackUp);
			setTagState(tagInfo.id);
			setPlaceholderText(tagInfo.name);
		},
		[htmlBackUp]
	);

	const onKeyUpHandler = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === '/') {
			event.preventDefault();
			menuToggle();
		}
	};

	const onKeyDownHandler = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === '/') {
				setHtmlBackUp(htmlState);
			}

			if (event.key === 'Enter') {
				if (previousKey !== 'Shift') {
					console.log(contentEditable.current);
					
					event.preventDefault();
					addBLock({ id, ref: contentEditable.current });
				}
			}

			if (event.key === 'Backspace' && !htmlState) {
				event.preventDefault();
				deleteBlockHandler({ id, ref: contentEditable.current });
			}

			setPreviousKey(event.key);
		},
		[addBLock, contentEditable, deleteBlockHandler, htmlState, id, previousKey]
	);

	const menuItemKeyDownHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
		console.log(event.key);
	}, []);

	useEffect(() => {
		document.body.addEventListener('click', closeMenu);

		return () => document.body.removeEventListener('click', closeMenu);
	}, [closeMenu]);

	return (
		<>
			<TagMenuWrap>
				<MenuSlider height={menuHeight}>
					{tagItems.map((item) => {
						return (
							<MenuItem
								key={item.id}
								itemInfo={{ id: item.id, name: item.name }}
								onClick={tagSelectHandler}
								onKeyDown={menuItemKeyDownHandler}
							>
								{item.name}
							</MenuItem>
						);
					})}
				</MenuSlider>
			</TagMenuWrap>
			<ContentEditableWrap
				className="Block"
				placeholder={placeholderText}
				innerRef={contentEditable}
				html={htmlState}
				tagName={tagState}
				onKeyUp={onKeyUpHandler}
				onChange={onChangeHandler}
				onKeyDown={onKeyDownHandler}
			/>
		</>
	);
}

export default EditableBlock;
