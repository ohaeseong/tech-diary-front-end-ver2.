import React, { ReactNode } from 'react';

import { NavBar } from 'components/base/NavBar';
import randomGradation from 'libs/randomGradation';
import * as T from './MainTemplate.styled';

type Props = {
	children: ReactNode;
};

function MainTemplate({ children }: Props) {
	const gradationEffect = randomGradation();

	return (
		<T.Template>
			<T.Container>
				<NavBar gradationEffect={gradationEffect} />
				<T.MainContents>{children}</T.MainContents>
			</T.Container>
		</T.Template>
	);
}

export default MainTemplate;
