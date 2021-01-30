import React from 'react';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

const TitleEditorTextarea = styled(TextareaAutosize)`
	width: 100%;
	font-size: 2rem;
	padding: 2.5rem 1rem;
	margin: 3rem 0;
	font-family: 'Spoqa Han Sans Regular';
	overflow: hidden;
	border: none;
	resize: none;

	color: ${(props) => props.theme.black};
	background-color: ${(props) => props.theme.white_1};
	border-bottom: 1px solid ${(props) => props.theme.gray_2};

	&::placeholder {
		color: ${(props) => props.theme.gray_3};
	}
`;
function TitleEditor() {
	return <TitleEditorTextarea placeholder="제목" />;
}

export default TitleEditor;
