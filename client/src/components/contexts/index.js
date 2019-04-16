import decode from 'jwt-decode';
import { createContext } from 'react';

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

export { AuthContext, AuthContextValue, UserContext, EventContext, CommentContext, ProfileContext };
