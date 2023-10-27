
import { FC, useEffect, useReducer } from 'react';
import { ReactNode } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie'
import { tesloApi } from '@/api';
import { IUser } from '@/interfaces';
import axios from 'axios';

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

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        try {
            const { data } = await tesloApi.get('/user/validate-token')
            const { token, user } = data;
            Cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user })
        } catch (error) {
            Cookies.remove('token')

        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password })
            const { token, user } = data;
            Cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user })
            return true;
        } catch (error) {
            return false
        }
    }

    //interfaz o crear la definicion de retorno en linea para la funcion de registerUser

    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password })
            const { token, user } = data;
            Cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user })
            return {
                hasError: false
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente nuevamente'
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            //methods
            loginUser,
            registerUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}