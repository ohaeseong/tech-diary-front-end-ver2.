import React from 'react';
import styled from '@emotion/styled';

const TitleEditorInput = styled.input`
	width: calc(100% - 2rem);
	font-size: 2.5rem;
	padding: 3rem 1rem;
	margin-bottom: 5rem;

	border: none;
	border-bottom: 1px solid ${(props) => props.theme.gray_0};
`;

function TitleEditor() {
	return <TitleEditorInput placeholder="제목" />;
}

export default TitleEditor;
