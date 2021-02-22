import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

const TitleEditorTextarea = styled(TextareaAutosize)`
	width: 100%;
	font-size: 2rem;
	padding: 2.5rem 0;
	margin: 3rem 0 1.7rem 0;
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

type Props = {
	title: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TitleEditor({ title, onChange }: Props) {
	return <TitleEditorTextarea value={title} onChange={onChange} placeholder="제목" />;
}

export default TitleEditor;
