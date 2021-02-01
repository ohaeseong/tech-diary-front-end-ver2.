import React, { useState } from 'react';
import MarkdownEditor from 'components/write/MarkdownEditor';
import styled from '@emotion/styled';
import TitleEditor from 'components/write/TitleEditor';
import MarkdownRenderer from 'components/common/MarkdownRenderer';

const MarkdownEditorTemplate = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100vh;
`;

const EditorWrap = styled.div`
	position: sticky;
	display: flex;
	flex-direction: column;
	padding: 3rem;
	width: 100%;
	height: 100%;
	top: 10px;
`;

const RendererWrap = styled.div`
	padding: 14rem 2rem 0rem 0rem;
	width: 100%;
	height: 100%;
`;

function MarkdownEditorContainer() {
	const [markdownText, setMarkdownText] = useState('');

	return (
		<MarkdownEditorTemplate>
			<EditorWrap>
				<TitleEditor />
				<MarkdownEditor markdownText={markdownText} setMarkdownText={setMarkdownText} />
			</EditorWrap>
			<RendererWrap>
				<MarkdownRenderer markdown={markdownText} />
			</RendererWrap>
		</MarkdownEditorTemplate>
	);
}

export default MarkdownEditorContainer;
