import type { ComponentDefaultProps } from '@chakra-ui/theme'
import { mode } from '@chakra-ui/theme-tools'

const Modal = {
    baseStyle: (props: ComponentDefaultProps) => ({
        dialog: {
            bgColor: mode('white', 'rgb(46,40,76)')(props),
        },
        header: {
            fontWeight: 'normal'
        }
    })
}

export default Modal