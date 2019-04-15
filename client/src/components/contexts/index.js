import decode from 'jwt-decode';
import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();
const EventContext = createContext();
const CommentContext = createContext();
const ProfileContext = createContext();
const AuthContext = createContext();
const AuthContextValue = () => {
	try {
		const token = localStorage.getItem('token');
		decode(token);
	} catch (err) {
		return false;
	}
	return true;
};

const StateContext = createContext();
const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

const useStateValue = () => useContext(StateContext);

export {
	AuthContext,
	AuthContextValue,
	UserContext,
	EventContext,
	CommentContext,
	ProfileContext,
	StateContext,
	StateProvider,
	useStateValue
};
