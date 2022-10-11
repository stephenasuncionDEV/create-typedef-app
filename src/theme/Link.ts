import type { ComponentStyleConfig, ComponentDefaultProps } from '@chakra-ui/theme'

const Text: ComponentStyleConfig = {
    variants: {
        link: (props: ComponentDefaultProps) => ({
            color: 'blue.500',
            _hover: {
                color: 'blue.600'
            }
        })
    }
}

export default Text