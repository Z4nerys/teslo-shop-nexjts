import { createContext } from 'react';
import { IUser } from '@/interfaces';

///el estado del provider luce parecido al contexto pero no son iguales
//el contexto es lo que yo quiero que los componentes hijos puedan ver fuera del provider

//el provider es lo que tengo en el estado
//y el contexto es lo que los componentes hijos van a poder observar

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    //methods
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
}

export const AuthContext = createContext({} as ContextProps)