import React from 'react';

import AccountPageTemplate from 'components/account/AccountPageTemplate';
import LoginBox from 'components/account/login/LoginBox';

function LoginLayout() {
	return (
		<AccountPageTemplate>
			<LoginBox />
		</AccountPageTemplate>
	);
}

export default LoginLayout;
