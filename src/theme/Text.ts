import type { ComponentStyleConfig, ComponentDefaultProps } from '@chakra-ui/theme'

const Text: ComponentStyleConfig = {
    variants: {
        subtle: (props: ComponentDefaultProps) => ({
            color: 'gray.500',
            fontSize: '9pt'
        })
    }
}

export default Text