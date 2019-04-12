import React from 'react';
import decode from 'jwt-decode';

const UserContext = React.createContext();
const EventContext = React.createContext();
const CommentContext = React.createContext();
const ProfileContext = React.createContext();

const AuthContext = React.createContext();

const AuthContextValue = () => {
	try {
		const token = localStorage.getItem('token');
		decode(token);
	} catch (err) {
		return false;
	}
	return true;
};

export { AuthContext, AuthContextValue, UserContext, EventContext, CommentContext, ProfileContext };
