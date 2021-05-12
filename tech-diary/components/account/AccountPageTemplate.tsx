import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

const AccountTemplateBackground = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	align-items: center;
	justify-content: center;
	${(props) => props.theme.gradation};
`;

type Props = {
	children: ReactNode;
};

function AccountPageTemplate({ children }: Props) {
	return <AccountTemplateBackground>{children}</AccountTemplateBackground>;
}

export default AccountPageTemplate;
