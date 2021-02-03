import React, { ChangeEvent, useCallback, useState } from 'react';
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
		font-family: 'Spoqa Han Sans Thin';
	}
`;

function BlockEditorContainer() {
	const [title, setTitle] = useState('');

	const handleTitleLength = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
		if (event.target.value.length <= 50) {
			setTitle(event.target.value);
		}
	}, []);

	return (
		<EditorWrap>
			<TitleEditor title={title} onChange={handleTitleLength} />
			<BlockEditor />
		</EditorWrap>
	);
}

export default BlockEditorContainer;
