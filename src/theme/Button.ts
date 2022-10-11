import type { ComponentStyleConfig, ComponentDefaultProps } from '@chakra-ui/theme'

const Button: ComponentStyleConfig = {
    baseStyle: (props: ComponentDefaultProps) => ({
        fontWeight: 'normal'
    }),
    variants: {
        primary: (props: ComponentDefaultProps) => ({
            bg: 'rgb(117, 63, 229)',
            _hover: {
                bg: 'rgb(142, 90, 250)',
                _disabled: {
                    bg: 'rgb(142, 90, 250)',
                }
            },
            color: 'white'
        }),
        danger: (props: ComponentDefaultProps) => ({
            bg: 'rgb(229,62,62)',
            _hover: {
                bg: 'red.400',
                _disabled: {
                    bg: 'red.400',
                }
            },
            color: 'white',
        })
    }
}

export default Button