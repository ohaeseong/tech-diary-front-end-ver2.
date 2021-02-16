import { ActionType, createReducer, createAction } from 'typesafe-actions';

type ModalState = {
	isOpen: boolean;
};

const initialState: ModalState = {
	isOpen: false,
};

export const OPEN_MODAL = 'modal/OPEN_MODAL';
export const CLOSE_MODAL = 'modal/CLOSE_MODAL';

export const openModal = createAction(OPEN_MODAL)<string>();
export const closeModal = createAction(CLOSE_MODAL)<string>();

const actions = {
	openModal,
	closeModal,
};

export type ModalAction = ActionType<typeof actions>;

export default createReducer<ModalState, ModalAction>(initialState, {
	[OPEN_MODAL]: (state) => ({
		...state,
		isOpen: true,
	}),

	[CLOSE_MODAL]: (state) => ({
		...state,
		isOpen: false,
	}),
});
