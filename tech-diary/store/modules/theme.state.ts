import { ActionType, createReducer, createAction } from 'typesafe-actions';

type ThemeState = {
	isDark?: boolean;
};

const initialState: ThemeState = {
	isDark: false,
};

export const DARK_THEME_ON = 'theme/DARK_THEME_ON';
export const DARK_THEME_OFF = 'theme/DARK_THEME_OFF';

export const darkModeOn = createAction(DARK_THEME_ON)<string>();
export const darkModeOff = createAction(DARK_THEME_OFF)<string>();

const actions = {
	darkModeOn,
	darkModeOff,
};

export type ThemeAction = ActionType<typeof actions>;

export default createReducer<ThemeState, ThemeAction>(initialState, {
	[DARK_THEME_ON]: (state) => ({
		...state,
		isDark: true,
	}),

	[DARK_THEME_OFF]: (state) => ({
		...state,
		isDark: false,
	}),
});
