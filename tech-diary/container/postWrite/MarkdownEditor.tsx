import React, { useState } from 'react';
import MarkdownEditor from 'components/write/MarkdownEditor';
import useForm from 'libs/hooks/useForm';

function MarkdownEditorContainer() {
	const [markdownText, setMarkdownText] = useState('');

	return <MarkdownEditor markdownText={markdownText} setMarkdownText={setMarkdownText} />;
}

export default MarkdownEditorContainer;
