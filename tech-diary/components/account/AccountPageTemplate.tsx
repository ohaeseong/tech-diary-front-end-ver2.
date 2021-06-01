import styled from '@emotion/styled';
import { mediaQuery } from 'components/layout/responsive';
import React, { ReactNode } from 'react';

const AccountTemplateBackground = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	align-items: center;
	justify-content: center;
	${(props) => props.theme.gradation};

	${mediaQuery(768)} {
		background-color: white;
		background: white;
	}
`;

type Props = {
	children: ReactNode;
};

function AccountPageTemplate({ children }: Props) {
	return <AccountTemplateBackground>{children}</AccountTemplateBackground>;
}

export default AccountPageTemplate;
