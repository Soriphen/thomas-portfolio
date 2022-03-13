import {
  Heading,
  Flex,
  Text,
  Divider,
  VStack,
  Spacer,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import Nav from './Nav';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export default function Contact(props) {
  if (props.whatSection === 'Contact') {
    return (
      <Flex h={700} direction={'column'}>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Nav
            // w="full"
            // border="1px"
            whatSection={props.whatSection}
            setWhatSection={props.setWhatSection}
            // border="1px"
            // justifyContent="center"
          />
          <Spacer />
          <ColorModeSwitcher
            fontSize={{ base: 100, md: 24 }}
            mt={{ base: 10, md: 0 }}
            // border="1px"
          />
        </Flex>
        <Center w="full" h="full">
          <VStack mt={10}>
            <Text>Contact Me:</Text>
            <Divider />
            <Heading fontSize={{ base: 16, sm: '2xl', md: '4xl' }}>
              thomas.tesfaldet@mail.utoronto.ca
            </Heading>
          </VStack>
        </Center>
      </Flex>
    );
  } else {
    return null;
  }
}
