
import { FC, useReducer } from 'react';
import { ReactNode } from 'react';
import { AuthContext, authReducer } from './';
import Cookie from 'js-cookie'
import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';

///el estado del provider luce parecido al contexto pero no son iguales
//el contexto es lo que yo quiero que los componentes hijos puedan ver fuera del provider

//el provider es lo que tengo en el estado
//y el contexto es lo que los componentes hijos van a poder observar
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props {
    children: ReactNode
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password })
            const { token, user } = data;
            Cookie.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user})
            return true;
        } catch (error) {
            return false
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            //methods
            loginUser,
        }}>
           {children}
        </AuthContext.Provider>
    )
}