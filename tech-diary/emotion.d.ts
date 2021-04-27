import '@emotion/react';
import { LibTheme } from 'some-lib';

declare module '@emotion/react' {
	export interface Theme {
		color: {
			white: string;
			white_1: string;
			black: string;
			gray_0: string;
			gray_1: string;
			gray_2: string;
			gray_3: string;
			gray_4: string;
			gray_5: string;
			success: string;
			neon_0: string;
			neon_1: string;
			neon_2: string;
			warning: string;
			info: string;
			shadow: string;
			light_purple: string;
			emphasis: string;
			star: string;
			purple: string;
			facebook: string;
			gradation: string;
		};
	}
}

declare module '@emotion/react' {
	export interface Theme extends LibTheme {
		white: string;
		white_1: string;
		black: string;
		gray_0: string;
		gray_1: string;
		gray_2: string;
		gray_3: string;
		gray_4: string;
		gray_5: string;
		gray_6: string;
		success: string;
		neon_0: string;
		neon_1: string;
		neon_2: string;
		warning: string;
		info: string;
		shadow: string;
		light_purple: string;
		emphasis: string;
		star: string;
		purple: string;
		facebook: string;
		gradation: string;
	}
}
