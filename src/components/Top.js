import React from 'react';
import {
  Text,
  Heading,
  Grid,
  Divider,
  useColorModeValue,
  Box,
  Flex,
  HStack,
  Spacer,
  Center,
} from '@chakra-ui/react';

import { motion } from 'framer-motion';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Nav from './Nav';

const line1 = 'I am';
const line2 = ' Thomas';
const line3 = ' Soriphen';

const sentence = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Top({ whatSection, setWhatSection }) {
  const nameChange = useColorModeValue(line2, line3);
  const MotionText = motion(Text);
  const MotionHeading = motion(Heading);

  if (whatSection === 'Top') {
    return (
      <Flex direction="column" h={700} position="relative">
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Nav
            // border="1px"
            whatSection={whatSection}
            setWhatSection={setWhatSection}
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
          <MotionHeading
            as="h1"
            // fontSize={200}
            fontSize={[70, 107, 175, 200]}
            variants={sentence}
            initial="hidden"
            animate="visible"
            // border="1px"
            textAlign={{ base: 'center', md: 'left' }}
            // borderColor="red"
            overflow="hidden"
            // display="relative"
            // flexBasis={500}
            w="full"
          >
            {/* <Box
            _before={{
              content: `""`,
              // display: 'absolute',
              bgColor: 'blue',
              opacity: '0.3',
              paddingX: 250,
            }}
            w={0}
            h={0}
          ></Box> */}
            {line1.split('').map((char, index) => {
              return (
                <MotionText
                  as="span"
                  key={char + '-' + index}
                  variants={letter}
                >
                  {char}
                </MotionText>
              );
            })}
            <Divider variant="solid" />
            {nameChange.split('').map((char, index) => {
              return (
                <MotionText
                  as="span"
                  key={char + '-' + index}
                  variants={letter}
                >
                  {char}
                </MotionText>
              );
            })}
          </MotionHeading>
        </Center>
      </Flex>
    );
  } else {
    return null;
  }
}
