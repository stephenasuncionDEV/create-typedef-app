import { Props } from '@/interfaces/index'
import { useState, useContext, createContext, FC, Dispatch, SetStateAction } from 'react'

export interface IUserContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserContextProps>({} as IUserContextProps);
export const useUser = () => useContext(UserContext);

export const UserProvider: FC<Props> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
		<UserContext.Provider
			value={{
                isLoggedIn,
                setIsLoggedIn
            }}
		>
			{ children }
		</UserContext.Provider>
	)
}