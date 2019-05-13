import decode from 'jwt-decode';
import { createContext } from 'react';

const UserContext = createContext();
const EventContext = createContext();
const CommentContext = createContext();
const ProfileContext = createContext();
const AuthContext = createContext();
const AuthContextValue = () => {
	try {
		const accessToken = localStorage.getItem('access-token');
		const refreshToken = localStorage.getItem('refresh-token');
		if (!accessToken && !refreshToken) return false;
		if (accessToken) {
			decode(accessToken);
		}
		if (!accessToken && refreshToken) {
			decode(refreshToken);
		}
	} catch (err) {
		return false;
	}
	return true;
};

export { AuthContext, AuthContextValue, UserContext, EventContext, CommentContext, ProfileContext };
