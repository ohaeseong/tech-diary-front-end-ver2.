import React from 'react';
import styled from '@emotion/styled';
import MarkdwonRenderer from 'components/common/MarkdownRenderer';
import { color } from 'styles/color';

const UserIntroduceWrap = styled.div`
	display: flex;
	flex-direction: column;
	width: 48rem;
	min-height: 30rem;
	margin-top: 3rem;
	border-radius: 7px;
	border: 1px solid ${color.gray_1};
	padding-left: 2rem;
`;

const Head = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 1rem;
	height: 3rem;

	border-bottom: 1px solid ${color.gray_5};

	& > * {
		margin-right: 0.5rem;
	}
`;

const CircleForDesign = styled.div<{ color: string }>`
	width: 1.2rem;
	height: 1.2rem;

	border-radius: 50%;

	background-color: ${(props) => props.color};
`;

type Props = {
	intro: string;
};

function UserIntroduce({ intro }: Props) {
	return (
		<UserIntroduceWrap>
			{/* <Head>
				<CircleForDesign color="#FF605C" /> <CircleForDesign color="#FFBD44" /> <CircleForDesign color="#00CA4E" />
			</Head> */}
			<MarkdwonRenderer markdown={intro} type="introduce" />
		</UserIntroduceWrap>
	);
}

export default UserIntroduce;
