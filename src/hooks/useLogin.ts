import { useState, Dispatch, SetStateAction } from 'react'
import { useToast } from '@chakra-ui/react'
import errorHandler from '@/helpers/errorHandler'

export interface ILoginProps {
    isLoggingIn: boolean;
    setIsLoggingIn: Dispatch<SetStateAction<boolean>>;
}

export const useLogin = (): ILoginProps => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true
    })
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    return {
        isLoggingIn,
        setIsLoggingIn
    }
}