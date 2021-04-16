import React from 'react';
import styled from '@emotion/styled';
import MarkdwonRenderer from 'components/common/MarkdownRenderer';
import { color } from 'styles/color';
import { FiEdit } from 'react-icons/fi';

const UserIntroduceWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 48rem;
	min-height: 30rem;
	/* margin-top: 3rem; */
	border-radius: 7px;
	border: 1px solid ${color.gray_1};
	margin-top: 0.5rem;
	padding-left: 2rem;
`;

const Head = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 2rem;
	padding-right: 0.5rem;
	margin-top: 3rem;

	/* border: 1px solid ${color.gray_5}; */

	& > * {
		margin-right: 0.5rem;
		cursor: pointer;
	}
`;

type Props = {
	intro: string;
};

function UserIntroduce({ intro }: Props) {
	return (
		<>
			<Head>
				<FiEdit size="1.5rem" color={color.gray_4} />
			</Head>
			<UserIntroduceWrap>
				<MarkdwonRenderer markdown={intro} type="introduce" />
			</UserIntroduceWrap>
		</>
	);
}

export default UserIntroduce;
