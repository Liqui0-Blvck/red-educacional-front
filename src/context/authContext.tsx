import { createContext, FC, ReactNode, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authPages } from '../config/pages.config';
import { useAppDispatch, useAppSelector } from '../store';
import { RootState } from '../store/rootReducer';
import { setColorApp, setUser, UserState } from '../store/slices/auth/userSlice';
import { persistanceTokens, SessionState, signInSuccess } from '../store/slices/auth/sessionSlice';
import useCookiesStorage, { ISetValue } from '../hooks/useCookieStorage';

export interface IAuthContextProps {
	tokens:  string | ISetValue | null
	onLogout: () => void;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
	const [tokens, setTokens] = useCookiesStorage('user', null)
	const [userData, setUserData ] = useCookiesStorage('userData', null)
	const dispatch = useAppDispatch()
	const session = useAppSelector((state: RootState) => state.auth.session)
	const user = useAppSelector((state: RootState) => state.auth.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (session && user) {
			const jsonSession = JSON.stringify(session)
			const jsonUserData = JSON.stringify(user)
			if (typeof setTokens === 'function') setTokens(jsonSession)
			if (typeof setUserData === 'function') setUserData(jsonUserData)
		}
	}, [session, user])

	useEffect(() => {
		if(typeof userData === 'string') {
			const jsonUserData: UserState = JSON.parse(userData)
			dispatch(setUser(jsonUserData))
		}
	}, [userData])



	useEffect(() => {
		if (typeof tokens === 'string'){
			const jsonTokens: SessionState = JSON.parse(tokens)
			dispatch(persistanceTokens(jsonTokens))
		} 
	}, [user])

	// call this function to sign out logged-in user
	const onLogout = async () => {
		if (typeof setTokens === 'function') await setTokens(JSON.stringify(session));
		if (typeof setUserData === 'function') await setUserData(JSON.stringify(user))
		navigate(`../${authPages.loginPage.to}`, { replace: true });
	};

	const value: IAuthContextProps = useMemo(
		() => ({
			tokens,
			onLogout,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};