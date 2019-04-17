import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const InitialState = {
	stateEvent: {
		name: '',
		abstract: '',
		banner_URL: null,
		description: '',
		isPublic: true,
		type: '',
		price: 0,
		city: '',
		address: '',
		start: new Date(),
		end: new Date(),
		tags: ['']
	},
	userSearchPref: {
		sort: 'ascending',
		type: '',
		price: 10000
	}
};

export const Reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_EVENT':
			return {
				...state,
				stateEvent: action.newEvent
			};

		case 'RESET_EVENT':
			return {
				...state,
				stateEvent: InitialState.stateEvent
			};

		case 'SET_SORT':
			return {
				...state,
				userSearchPref: action.newSort
			};

		case 'SET_TYPE':
			return {
				...state,
				userSearchPref: action.newType
			};

		case 'SET_PRICE':
			return {
				...state,
				userSearchPref: action.newPrice
			};

		default:
			return state;
	}
};
