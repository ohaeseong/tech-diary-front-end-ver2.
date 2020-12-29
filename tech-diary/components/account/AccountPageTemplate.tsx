import { css } from '@emotion/react';
import styled from '@emotion/styled';
import randomGradation from 'libs/randomGradation';
import React, { ReactNode } from 'react';

const AccountTemplateBackground = styled.div<{ gradation: any }>`
	display: flex;
	width: 100%;
	height: 100vh;
	align-items: center;
	justify-content: center;

	${(props) => {
		return css`
			${props.gradation}
		`;
	}}
`;

type Props = {
	children: ReactNode;
};

function AccountPageTemplate({ children }: Props) {
	const gradationEffect = randomGradation();

	return <AccountTemplateBackground gradation={gradationEffect}>{children}</AccountTemplateBackground>;
}

export default AccountPageTemplate;
