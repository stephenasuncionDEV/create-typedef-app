import type { NextPage } from 'next'
import NextImage from 'next/image'
import { Flex, Text, Button, Wrap, Box, HStack, Heading, Input } from '@chakra-ui/react'
import Meta from '@/components/Meta'

const Home: NextPage = () => {
    return (
        <Flex as='main' flexDir='column'>
            <Meta title='Minting Website' />
            
        </Flex>
    )
}

export default Home