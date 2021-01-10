import React from 'react';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const markdown = `### adsfadsfadf`;

function MarkdwonRenderer() {
	return <ReactMarkdown>## Hello, *world*!</ReactMarkdown>;
}

export default MarkdwonRenderer;
