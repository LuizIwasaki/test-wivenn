import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services/axios";
import { IFCChildren } from "../types/i_fc_children";
import { ITokenAdmin } from "../../shared/interfaces/i_token_admin";
import { getJWTBody } from "../utils/jwt_utils";

interface IAuthContext {
    login(email: string, password: string): Promise<void>;
    user?: ITokenAdmin;
}

interface IAuthState {
    token: string;
    user: ITokenAdmin;
}

const tokenName: string = 'api-token';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IFCChildren> = ({ children }) => {

    const REFRESH_TOKEN_INTERVAL_MS = 1000 * 60;

    const [data, setData] = useState<IAuthState>(() => {
        const token = localStorage.getItem(tokenName);

        setTimeout(() => refreshToken(), REFRESH_TOKEN_INTERVAL_MS);

        if (token) {
            api.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
            return {
                token: token,
                user: getJWTBody(token)
            };
        }
        return {} as IAuthState;
    });

    const refreshToken = async () => {
        if (!data.token) return;

        try {
            const newTokenRequest = await api.get('/refresh');
            const newToken = newTokenRequest.data as string;
            const user = getJWTBody<ITokenAdmin>(newToken);

            localStorage.setItem(tokenName, newToken);
            api.defaults.headers.common = { 'Authorization': `Bearer ${newToken}` };

            setData({token: newToken, user: user});

            setTimeout(() => refreshToken(), REFRESH_TOKEN_INTERVAL_MS);
        } catch (e) {
            console.error(e);
        }

    };

    const login = useCallback(async (email: string, password: string) => {
        console.log('pre api');
        const response = await api.post('/login', { email, password });
        console.log('pos api');
        const { token } = response.data;
        const user = getJWTBody<ITokenAdmin>(token);

        localStorage.setItem(tokenName, token);
        api.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
        
        setData({token: token, user: user});
        setTimeout(() => refreshToken(), REFRESH_TOKEN_INTERVAL_MS);
    }, []);


    return (

        <AuthContext.Provider value={{ login, user: data.user }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    console.log('useAuth');

    return  useContext(AuthContext);
}

export {
    AuthProvider, useAuth
}
