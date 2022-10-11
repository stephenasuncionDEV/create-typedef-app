import type { NextPage } from 'next'
import NextImage from 'next/image'
import { Flex, Text, Center, Heading, Spinner } from '@chakra-ui/react'
import Meta from '@/components/Meta'

const Error: NextPage = () => {
    return (
        <Flex as='main' flexDir='column'>
            <Meta title='404' />
            
        </Flex>
    )
}

export default Error